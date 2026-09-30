import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CurrentView } from '../types/navigation';
import { XIHU_CATEGORIES } from '../data/xihuCategories';

interface Props {
  onNavigate: (view: CurrentView) => void;
  /** 跳转首页并选中人才类项目评审模型 */
  onLaunchReviewConsole: () => void;
  /** 点分组卡片:进入项目列表并只看该分组 */
  onSelectGroup: (group: string) => void;
}

/** 项目简介原文 */
const INTRO_TEXT =
  '“西湖英才”引智工程是西湖区聚力打造国际人才港的核心引才政策，面向全球重点引进云计算、大数据、人工智能、空天信息、生命健康、高端装备制造、文化创意、金融科技等新兴产业的海内外高层次人才创新创业团队。扶持政策涵盖创业启动资金、贷款贴息、房租补贴、住房补贴、融资资助及人才保障激励等，分层级、多角度护航人才创业。第二十三批项目征集已启动，围绕浙江省“315”科技创新体系、杭州市“296X”先进制造业集群及西湖区“114X”产业体系建设，重点引进人工智能、商业航天、具身智能机器人、集成电路、生物医药与医疗器械、高端通用设备、科技文化创意等领域的创新创业团队。';

/**
 * 第二十三批西湖英才项目申报介绍页。
 * 结构与 ChunHuiIntroPage 对齐,差异只在:配色取西湖英才的橙系、简介换成引智工程原文、
 * 分组为西湖英才的八条。不含数字看板。
 *
 * 项目列表与详情页按需求暂不做,所以分组卡片是**纯展示**的。
 */
export const XihuIntroPage: React.FC<Props> = ({
  onNavigate,
  onLaunchReviewConsole,
  onSelectGroup,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>西湖AI大模型</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">西湖英才项目申报概况</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="rounded-md bg-slate-900 p-6 md:p-8 text-white border border-slate-800">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
            第二十三批西湖英才项目申报
          </h2>
        </div>
      </div>

      {/* 项目简介 */}
      <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-4 bg-orange-700 rounded-2xs" />
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            项目简介
          </h3>
        </div>
        <p className="text-sm md:text-base leading-relaxed md:leading-8 text-slate-700 text-justify">
          {INTRO_TEXT}
        </p>
      </div>

      {/* Main Grid: Left is Groups, Right is AI Review Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): 项目分组 */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-4 bg-amber-700 rounded-2xs" />
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                项目分组
              </h3>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              点击分组查看该分组的项目
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {XIHU_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => onSelectGroup(cat.name)}
                  className="p-4 rounded-sm border border-slate-200 bg-white text-left flex items-start justify-between hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="space-y-1 pr-2">
                    <span className="text-sm font-bold text-slate-900">
                      {cat.name}
                    </span>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>

                  <span className="text-xs text-blue-700 inline-flex items-center gap-0.5 mt-2 font-medium shrink-0">
                    <span>浏览</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): AI 大模型评审入口 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative overflow-hidden rounded-md p-6 text-white border border-blue-500/40 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 shadow-lg shadow-blue-950/10 space-y-5">
            {/* 背景光晕:给深色卡片补光,避免沉闷 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-14 w-44 h-44 rounded-full bg-cyan-400/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-12 w-44 h-44 rounded-full bg-violet-400/25 blur-3xl"
            />

            <div className="relative space-y-2.5">
              <h4 className="text-lg md:text-xl font-bold text-white text-balance">
                人才类项目专家评审模型
              </h4>
              <p className="text-sm text-blue-100 leading-relaxed md:leading-7 text-pretty">
                基于海量真实专家评审评语训练，调用 AI 评审逻辑模型，为你生成专家级的深度测评与评分结果：
              </p>
            </div>

            <div className="relative space-y-3 pt-4 border-t border-white/20 text-sm text-blue-50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-300 shrink-0" />
                <span>自动生成专家级评语与打分</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-300 shrink-0" />
                <span>提取关键技术优势与经营风险防范</span>
              </div>
            </div>

            <div className="relative pt-3">
              <button
                onClick={onLaunchReviewConsole}
                className="w-full py-3 rounded-sm bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-md shadow-blue-950/20 transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.96] cursor-pointer"
              >
                启动AI评审
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
