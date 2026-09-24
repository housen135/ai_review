import React, { useRef } from 'react';
import { Project, ProjectAiReview } from '../types/project';
import { CurrentView } from '../types/navigation';
import { ProjectListPage } from './ProjectListPage';
import { ProjectListRail } from './ProjectListRail';
import { ProjectDetailPage } from './ProjectDetailPage';
import { ProjectBrowserTopBar } from './ProjectBrowserTopBar';
import type { ProjectListState } from '../hooks/useProjectListState';

interface Props {
  /** 收起为左侧窄栏(详情已打开)。由 currentView 推导,不是独立 state */
  collapsed: boolean;
  projects: Project[];
  selectedCategory: string;
  listState: ProjectListState;
  selectedProject: Project | null;
  onNavigate: (view: CurrentView) => void;
  onSelectCategory: (category: string) => void;
  onSelectProject: (project: Project) => void;
  onSelectProjectFromRail: (project: Project) => void;
  onUpdateProjectAiReview: (projectId: string, review: ProjectAiReview) => void;
}

/**
 * 项目列表与项目详情的共用外壳 —— 列表、详情、顶栏合成一个页面。
 *
 * 关键在于:App 只在这两个视图共用的一个分支里渲染本组件,所以 'project-list' 与
 * 'project-detail' 之间来回切换时本组件**不会卸载** —— <aside> 这个 DOM 节点始终存在,
 * width 才能从 100% 连续过渡到 15rem。展开态与折叠态的两种内容在栏内**叠放**
 * (lg 下都是 absolute),各自只动 opacity,因此过渡途中不会因为「表格很高、窄栏很矮」
 * 而重排跳变。
 *
 * 窄屏(<lg)并排放不下两栏,退回原本的整页换页行为。
 */
export const ProjectBrowser: React.FC<Props> = ({
  collapsed,
  projects,
  selectedCategory,
  listState,
  selectedProject,
  onNavigate,
  onSelectCategory,
  onSelectProject,
  onSelectProjectFromRail,
  onUpdateProjectAiReview,
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

  const handleSelectFromList = (project: Project) => {
    syncRailScroll(project.id);
    onSelectProject(project);
  };

  const handleChangeCategory = (category: string) => {
    onSelectCategory(category);
    listState.setCurrentPage(1);
  };

  return (
    <div
      ref={rootRef}
      data-browser-shell
      className="lg:flex lg:flex-col lg:h-[calc(100vh-3rem)] lg:overflow-hidden"
    >
      {/* 顶栏:展开态和折叠态共用同一根 */}
      <ProjectBrowserTopBar
        collapsed={collapsed}
        projects={projects}
        selectedCategory={selectedCategory}
        selectedProject={selectedProject}
        onNavigate={onNavigate}
        onChangeCategory={handleChangeCategory}
      />

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
            <ProjectListPage
              projects={projects}
              listState={listState}
              onSelectCategory={onSelectCategory}
              onSelectProject={handleSelectFromList}
            />
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
              projects={listState.filteredProjects}
              selectedProjectId={selectedProject?.id ?? ''}
              onSelectProject={onSelectProjectFromRail}
              onExpand={() => onNavigate('project-list')}
            />
          </div>
        </aside>

        {/* 右栏:详情。lg 下**绝对定位、左右都钉死**(left 恒等于左栏收起后的宽度),
            宽度因此从头到尾恒为「整行 − 15rem」,不随左栏收窄而重排。
            换成 flex 兄弟节点的话,它的宽度会从 0 连续长到 1200px,内部跟着一路重排
            —— 而 lg:grid-cols-12 是按视口判断的,列只剩两三百像素时照样排 12 列,
            过渡途中会看见「AI 智能评审」折行、「综合得分」竖着断字。
            现在它始终是最终尺寸,只是被左栏盖住,左栏退开时像拉开一道帘子。
            该列只在收起时挂载,但因为定位写死,挂载瞬间就是最终几何,依旧不重排。 */}
        {collapsed && selectedProject && (
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:left-60 lg:min-w-0 lg:overflow-hidden animate-[browser-detail-in_380ms_cubic-bezier(0.32,0.72,0,1)_160ms_both]">
            {/* key 保住原有的语义:切换项目时重置该页的模块页签 / 市场页签 / AI 评审缓存 */}
            <ProjectDetailPage
              key={selectedProject.id}
              project={selectedProject}
              onUpdateProjectAiReview={onUpdateProjectAiReview}
            />
          </div>
        )}
      </div>
    </div>
  );
};
