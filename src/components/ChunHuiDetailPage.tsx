import React from 'react';
import { FileText } from 'lucide-react';
import { CHUNHUI_DETAIL_SAMPLE, CHUNHUI_PROJECTS } from '../data/chunhuiProjects';

/**
 * 春晖杯项目详情。
 * 布局与 ProjectDetailPage 对齐:左栏(7/12)放项目信息、右栏(5/12)放 AI 综合得分与评语,
 * 两栏底边齐平,内容超出各自内部滚动。高度由 ProjectBrowser 的右列给出。
 *
 * 注意:当前**固定展示 CHUNHUI_DETAIL_SAMPLE 这一个案例** —— 从列表点任何一行
 * 进来看到的都是它。这是产品上约定的演示样例,不是真实的结果页,
 * 所以这里不接收「点了哪个项目」,后续接真实数据时再补 props。
 */
export const ChunHuiDetailPage: React.FC = () => {
  const d = CHUNHUI_DETAIL_SAMPLE;

  // 综合得分取列表里同编号的那条,保证详情与列表对得上,而不是另写一个数
  const listEntry = CHUNHUI_PROJECTS.find((p) => p.id === d.id);

  const facts: { label: string; value: string }[] = [
    { label: '项目所有人', value: d.owner },
    { label: '团组成员', value: d.teamMembers },
    { label: '项目所有人院校', value: d.school },
    { label: '所在国家/地区', value: d.country },
  ];

  return (
    /* 高度由 ProjectBrowser 的右列给出(h-full)→ 内容盒正好一屏 */
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 lg:h-full">
      {/* Main Grid: 左 项目信息 / 右 AI 评分与评语。两栏等高,底边自然对齐 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] gap-6 lg:flex-1 lg:min-h-0">
        {/* Left Column (7 cols): 项目信息 */}
        <div className="lg:col-span-7 flex flex-col lg:min-h-0">
          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden flex flex-col lg:flex-1 lg:min-h-0">
            {/* 卡片头:项目名称与状态标签 */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 shrink-0 space-y-2.5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="text-xs text-slate-500">
                    <span>项目编号：</span>
                    <span className="font-mono text-slate-700">{d.id}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                    {d.name}
                  </h2>
                </div>

                <a
                  href={d.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>原始申报 PDF</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 font-medium border border-blue-200">
                  {d.industry}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-medium border border-slate-200">
                  {d.stage}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-medium border border-slate-200">
                  专利：{d.hasPatent}
                </span>
              </div>
            </div>

            {/* 内容区:超出卡片高度时内部滚动 */}
            <div className="p-6 lg:flex-1 lg:min-h-0 lg:overflow-y-auto space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
                {facts.map((f) => (
                  <div key={f.label} className="space-y-1.5 min-w-0">
                    <span className="block text-xs font-semibold text-slate-500">
                      {f.label}
                    </span>
                    <span className="block text-sm font-medium text-slate-900 break-words">
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">项目简介：</span>
                <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                  {d.intro}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): AI 综合得分与评语 */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:min-h-0">
          <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-4 lg:flex-1 lg:min-h-0">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-indigo-700 rounded-2xs" />
                <h3 className="text-base font-bold text-slate-900">AI智能评审</h3>
              </div>
            </div>

            {/* 内容区:超出卡片高度时内部滚动 */}
            <div className="space-y-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
              <div className="bg-slate-50 rounded-sm px-4 py-3 border border-slate-200 flex items-baseline gap-2.5">
                <span className="text-xs text-slate-500 font-medium">综合得分</span>
                <span className="text-3xl font-bold font-mono text-emerald-700 tabular-nums leading-none">
                  {listEntry ? listEntry.score.toFixed(1) : '—'}
                </span>
                <span className="text-xs text-slate-400">/ 100分</span>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">AI评语：</span>
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                  {d.aiComment}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
