import React, { useRef } from 'react';
import { ProjectListRail, RailItem } from './ProjectListRail';

export interface ProjectBrowserProps {
  /** 收起为左侧窄栏(详情已打开)。由调用方从 currentView 推导 */
  collapsed: boolean;
  /** 顶部工具栏整块由调用方给,外壳不关心里面是什么赛事 */
  topBar?: React.ReactNode;
  /** 收起后左栏列出的项目(只要 id + 名称) */
  railItems: RailItem[];
  /** 窄栏里高亮哪一个;留空则都不高亮 */
  selectedProjectId?: string;
  /**
   * 展开态的整页内容。是个**渲染函数**而不是节点:外壳要把「点开详情」包一层
   * (先做滚动对齐再切视图),所以得把包装后的回调交给它。
   */
  listView: (openDetail: (projectId: string) => void) => React.ReactNode;
  /** 右侧详情。只在 collapsed 时挂载,挂载瞬间的幻灯片动画即展开动效 */
  detailView?: React.ReactNode;
  /** 展开回完整列表 */
  onExpand: () => void;
  /** 窄栏内换项目 */
  onSelectFromRail: (projectId: string) => void;
  /** 列表里点开详情 */
  onOpenDetail: (projectId: string) => void;
}

/**
 * 项目列表与项目详情的共用外壳 —— 两个赛事共用这一套折叠动效。
 *
 * 关键在于:调用方只在「列表」与「详情」这两个视图共用的一个分支里渲染本组件,
 * 所以两者之间来回切换时本组件**不会卸载** —— <aside> 这个 DOM 节点始终存在,
 * width 才能从 100% 连续过渡到 15rem。展开态与折叠态的两种内容在栏内**叠放**
 * (lg 下都是 absolute),各自只动 opacity,因此过渡途中不会因为「列表很高、窄栏很矮」
 * 而重排跳变。
 *
 * 外壳不认识任何赛事的数据结构:列表页、详情页、顶栏都由调用方以插槽传入,
 * 外壳只负责布局、宽度动画、以及「点中的项目落在它原来那一行的高度上」的滚动对齐。
 *
 * 窄屏(<lg)并排放不下两栏,退回整页换页行为。
 */
export const ProjectBrowser: React.FC<ProjectBrowserProps> = ({
  collapsed,
  topBar,
  railItems,
  selectedProjectId,
  listView,
  detailView,
  onExpand,
  onSelectFromRail,
  onOpenDetail,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  /**
   * 把窄栏滚到「点中的项目落在它原先那一行的高度上」,让收窄看起来是横向的
   * 移动而不是跳位。
   *
   * 必须在收起**之前**跑:窄栏层一直挂在 DOM 里(只是 opacity 0),而且宽度被
   * 钉死在 15rem,所以此刻量到的几何就是收起后的几何。等宽度动画跑完再调,
   * 会先看见它落在错误位置再跳一下。
   */
  const syncRailScroll = (projectId: string) => {
    const root = rootRef.current;
    if (!root) return;

    const container = root.querySelector<HTMLElement>('[data-rail-scroll]');
    const inner = root.querySelector<HTMLElement>('[data-rail-inner]');
    const card = root.querySelector<HTMLElement>(`[data-project-id="${projectId}"]`);
    const row = root.querySelector<HTMLElement>(`[data-row-project-id="${projectId}"]`);

    // 窄屏下窄栏是 display:none,量不出几何,也不必对齐
    if (!container || !inner || !card || !row || container.clientHeight === 0) return;

    // 先把上一轮写进去的补白还给 class,再从干净基准量一次
    inner.style.paddingTop = '';
    inner.style.paddingBottom = '';

    const containerTop = container.getBoundingClientRect().top;
    const target = row.getBoundingClientRect().top - containerTop;
    const natural = card.getBoundingClientRect().top - containerTop + container.scrollTop;
    const delta = natural - target;

    if (delta < 0) {
      // 卡片天生比目标高。往上滚不出去,只能把内容整体往下垫
      const base = parseFloat(getComputedStyle(inner).paddingTop) || 0;
      inner.style.paddingTop = `${base - delta}px`;
      container.scrollTop = 0;
      return;
    }

    const maxScroll = container.scrollHeight - container.clientHeight;
    if (delta > maxScroll) {
      // 底部余量不够,scrollTop 会被夹住,得先补垫再滚
      const base = parseFloat(getComputedStyle(inner).paddingBottom) || 0;
      inner.style.paddingBottom = `${base + (delta - maxScroll)}px`;
    }
    container.scrollTop = delta;
  };

  const handleOpenDetail = (projectId: string) => {
    syncRailScroll(projectId);
    onOpenDetail(projectId);
  };

  return (
    <div
      ref={rootRef}
      data-browser-shell
      className="lg:flex lg:flex-col lg:h-[calc(100vh-3rem)] lg:overflow-hidden"
    >
      {topBar}

      <div className="relative lg:flex lg:flex-1 lg:min-h-0 lg:overflow-hidden">
        {/* 左栏:展开态与折叠态共用同一个 <aside>,宽度连续过渡。
            lg:z-10 是必需的:详情列是 absolute 定位,默认会盖在静态定位的左栏之上,
            那样子左栏的右边缘左移就完全看不见了。压在它上面,左栏退开时才露出详情 */}
        <aside
          className={`relative lg:z-10 bg-white lg:shrink-0 lg:h-full lg:overflow-hidden lg:transition-[width] lg:duration-500 lg:ease-[cubic-bezier(0.32,0.72,0,1)] ${
            collapsed
              ? 'hidden lg:block lg:w-60 lg:border-r lg:border-slate-200'
              : 'block w-full'
          }`}
        >
          {/* 展开层:完整列表页。淡出稍快,把舞台让给窄栏 */}
          <div
            inert={collapsed}
            className={`lg:absolute lg:inset-0 lg:overflow-y-auto lg:transition-opacity lg:duration-200 ${
              collapsed
                ? 'hidden lg:block lg:opacity-0 lg:pointer-events-none'
                : 'block lg:opacity-100'
            }`}
          >
            {listView(handleOpenDetail)}
          </div>

          {/* 折叠层:只留项目名。宽度在 lg 下**恒定 15rem** ——
              不跟着外层展开成整页宽,否则量到的卡片行高是错的,位置对齐会失准 */}
          <div
            inert={!collapsed}
            className={`lg:absolute lg:inset-y-0 lg:left-0 lg:w-60 flex-col lg:transition-opacity lg:duration-300 lg:delay-150 ${
              collapsed
                ? 'flex opacity-100'
                : 'hidden lg:flex lg:opacity-0 lg:pointer-events-none'
            }`}
          >
            <ProjectListRail
              items={railItems}
              selectedProjectId={selectedProjectId ?? ''}
              onSelectProject={onSelectFromRail}
              onExpand={onExpand}
            />
          </div>
        </aside>

        {/* 右栏:详情。lg 下**绝对定位、左右都钉死**(left 恒等于左栏收起后的宽度),
            宽度因此从头到尾恒为「整行 − 15rem」,不随左栏收窄而重排。
            换成 flex 兄弟节点的话,它的宽度会从 0 连续长到 1200px,内部跟着一路重排
            —— 而 lg:grid-cols-12 是按视口判断的,列只剩两三百像素时照样排 12 列,
            过渡途中会看见卡片标题折行、数字竖着断字。
            现在它始终是最终尺寸,只是被左栏盖住,左栏退开时像拉开一道帘子。
            该列只在收起时挂载,但因为定位写死,挂载瞬间就是最终几何,依旧不重排。
            需要在换项目时重置内部状态的,把 key 加在自己的详情组件上即可。 */}
        {collapsed && detailView && (
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:left-60 lg:min-w-0 lg:overflow-hidden animate-[browser-detail-in_380ms_cubic-bezier(0.32,0.72,0,1)_160ms_both]">
            {detailView}
          </div>
        )}
      </div>
    </div>
  );
};
