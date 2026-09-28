import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CurrentView } from '../types/navigation';
import { CHUNHUI_CATEGORIES } from '../data/chunhuiCategories';
import { CHUNHUI_PROJECT_CATEGORY } from '../data/chunhuiProjects';

interface Props {
  onNavigate: (view: CurrentView) => void;
  /** 跳转首页并选中大赛类项目评审模型 */
  onLaunchReviewConsole: () => void;
}

/** 赛事简介原文 */
const INTRO_TEXT =
  '“春晖杯”中国留学人员创新创业大赛由教育部留学服务中心于2006年创办，是国内首个专门服务海外中国留学人员回国创新创业的国家级综合服务平台。截至2024年，大赛已举办19届，覆盖40多个国家和地区，遴选出优秀项目4159个，超1400家企业落地全国107个城市，并设有14个海外分赛区。大赛构建了从人才培育、项目遴选到对接落地、企业孵化的完整服务体系。二十周年之际，大赛新增学术创新人才板块，开设“春晖创新训练营”，加速向创新创业全域服务平台转型，助力海外高层次人才回国发展。';

/**
 * 春晖杯大赛概况与项目浏览。
 * 结构与 TorchCupIntroPage 对齐,差异只在:配色取春晖杯的绿系、简介换成留学人员大赛原文、
 * 不含数字看板、赛道为春晖杯的五条。
 *
 * 赛道卡片目前是**纯展示**:春晖杯还没有在库项目数据,接上跳转只会落到空列表。
 * 等有数据后把 onClick 按火炬杯那份接上即可。
 */
export const ChunHuiIntroPage: React.FC<Props> = ({ onNavigate, onLaunchReviewConsole }) => {
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
          <span>春晖AI大模型</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">春晖杯大赛概况与项目浏览</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="rounded-md bg-slate-900 p-6 md:p-8 text-white border border-slate-800">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
            “春晖杯”中国留学人员创新创业大赛
          </h2>
        </div>
      </div>

      {/* 大赛简介 —— 按要求不含数字看板 */}
      <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-4 bg-green-700 rounded-2xs" />
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            大赛简介
          </h3>
        </div>
        <p className="text-sm md:text-base leading-relaxed md:leading-8 text-slate-700 text-justify">
          {INTRO_TEXT}
        </p>
      </div>

      {/* Main Grid: Left is Category Tags, Right is AI Review Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): 项目浏览标签分类 */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-emerald-700 rounded-2xs" />
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  2026年春晖创新创业项目浏览
                </h3>
              </div>
              <button
                onClick={() => onNavigate('chunhui-list')}
                className="inline-flex items-center gap-0.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <span>浏览全部项目</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 在库项目全部属于 CHUNHUI_PROJECT_CATEGORY,只有那一个标签可点;
                其余赛道暂无数据,保持纯展示,不做成点了弹空列表 */}
            <p className="text-xs text-slate-500 mb-4">
              当前在库项目均为「{CHUNHUI_PROJECT_CATEGORY}」赛道，点击该标签进入浏览
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHUNHUI_CATEGORIES.map((cat) => {
                const hasData = cat.name === CHUNHUI_PROJECT_CATEGORY;
                return (
                  <div
                    key={cat.name}
                    onClick={hasData ? () => onNavigate('chunhui-list') : undefined}
                    className={`p-4 rounded-sm border text-left flex items-start justify-between transition-colors ${
                      hasData
                        ? 'border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 cursor-pointer'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <span
                        className={`text-sm font-bold ${
                          hasData ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {cat.name}
                      </span>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>

                    {hasData && (
                      <span className="text-xs text-emerald-700 inline-flex items-center gap-0.5 mt-2 font-medium shrink-0">
                        <span>浏览</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                );
              })}
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
                大赛类项目专家评审模型
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
