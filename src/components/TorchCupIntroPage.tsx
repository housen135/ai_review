import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CurrentView } from '../types/navigation';
import { TORCH_CUP_CATEGORIES, DEFAULT_CATEGORY } from '../data/torchCupCategories';

interface Props {
  onNavigate: (view: CurrentView) => void;
  onSelectCategory: (category: string) => void;
  /** 跳转首页并选中火炬杯评审模型 */
  onLaunchReviewConsole: () => void;
  projectCount: number;
}

export const TorchCupIntroPage: React.FC<Props> = ({
  onNavigate,
  onSelectCategory,
  onLaunchReviewConsole,
  projectCount,
}) => {
  // 各赛道在库项目数(展示用);新一代信息技术取实际导入的项目数
  const categoryCounts: Record<string, number> = {
    新一代信息技术: projectCount,
    高端装备制造: 8,
    生物医药: 6,
    新材料: 7,
    新能源: 5,
    节能环保: 6,
    新能源汽车: 5,
  };

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
          <span>火炬AI大模型</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">火炬杯大赛概况与项目浏览</span>
        </div>
      </div>

      {/* Hero Header with Clean, Authoritative Styling */}
      <div className="rounded-md bg-slate-900 p-6 md:p-8 text-white border border-slate-800">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
            第十五届中国创新创业大赛（浙江赛区）
          </h2>
          <p className="text-lg md:text-xl text-blue-200 font-medium">
            暨第十三届浙江省“火炬杯”创新创业大赛
          </p>
        </div>
      </div>

      {/* 大赛简介 — full width, right edge aligns with the title bar above */}
      <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-4 bg-blue-700 rounded-2xs" />
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            大赛简介
          </h3>
        </div>
        {/* The exact text specified in the prompt */}
        <p className="text-sm md:text-base leading-relaxed md:leading-8 text-slate-700 text-justify">
          大赛遵循政府引导、公益支持、市场助力原则，围绕发展高科技、实现产业化、加快形成新质生产力，搭建“政、产、学、研、用、金、服、城”多向对接交流平台，发现优质企业和团队，发掘源头创新与早期项目，促进科技成果转化，优化创新创业生态，服务产业基础再造和重大关键核心技术攻关，推动重点产业链高质量发展，支撑国家高新区、国家自创区建设，助力构建以科技创新为引领、以先进制造业为支撑的现代化产业体系，加快推进新型工业化和制造强国、网络强国建设。
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-slate-200 gap-y-5 md:gap-y-0 mt-5 pt-4 border-t border-slate-100 bg-slate-50 rounded-sm border border-slate-200">
          <div className="px-2 py-5 text-center">
            <span className="block text-3xl md:text-4xl font-bold font-mono text-slate-900 tabular-nums leading-none">551</span>
            <span className="block text-sm text-slate-500 mt-3">总项目数量</span>
          </div>
          <div className="px-2 py-5 text-center">
            <span className="block text-3xl md:text-4xl font-bold font-mono text-emerald-700 tabular-nums leading-none">100%</span>
            <span className="block text-sm text-slate-500 mt-3">评审进度</span>
          </div>
          <div className="px-2 py-5 text-center">
            <span className="block text-3xl md:text-4xl font-bold font-mono text-blue-700 tabular-nums leading-none">152</span>
            <span className="block text-sm text-slate-500 mt-3">推荐项目</span>
          </div>
          <div className="px-2 py-5 text-center">
            <span className="block text-3xl md:text-4xl font-bold font-mono text-indigo-700 tabular-nums leading-none">78.77</span>
            <span className="block text-sm text-slate-500 mt-3">项目均分</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left is Category Tags, Right is AI Review Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): 项目浏览标签分类 */}
        <div className="lg:col-span-8">
          {/* 第十三届火炬杯项目浏览 */}
          <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-indigo-700 rounded-2xs" />
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  第十三届火炬杯项目浏览
                </h3>
              </div>
            </div>

            {/* Hint as specified in user prompt */}
            <p className="text-xs text-slate-500 mb-4">
              提示点击下方标签 进入项目浏览
            </p>

            {/* 展示标签分类 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TORCH_CUP_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => {
                    onSelectCategory(cat.name);
                    onNavigate('project-list');
                  }}
                  className={`p-4 rounded-sm border transition-colors cursor-pointer text-left flex items-start justify-between ${
                    cat.name === DEFAULT_CATEGORY
                      ? 'border-blue-500 bg-blue-50/40 hover:bg-blue-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1 pr-2">
                    <span className="text-sm font-bold text-slate-900">
                      {cat.name}
                    </span>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-semibold text-slate-400 block">
                      {categoryCounts[cat.name]} 项
                    </span>
                    <span className="text-xs text-blue-700 inline-flex items-center gap-0.5 mt-2 font-medium">
                      <span>浏览</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
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
              <h4 className="text-lg md:text-xl font-bold text-white text-balance">火炬AI大模型--专家评审模型</h4>
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
