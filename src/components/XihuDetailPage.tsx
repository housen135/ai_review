import React from 'react';
import { FileText } from 'lucide-react';
import { XihuProject } from '../data/xihuProjects';

interface Props {
  project: XihuProject;
}

/**
 * 项目申报书 PDF。演示阶段**固定指向同一份** —— 从列表点哪个项目看到的都是它。
 *
 * 源文件是根目录的「龚鹏-多网融合自组网核心芯片及解决方案产业化-高端通用设备1组.pdf」,
 * 放进了 public/docs/ 并且**改成了 ASCII 文件名**:根目录的文件 build 不会带上,
 * 而中文文件名在 Vite 的静态服务上取不到(实测 404,ASCII 名才 200)。
 */
const PROPOSAL_PDF_URL = '/docs/proposal-sample.pdf';

/**
 * 项目简介按【小标题】切段。
 * 数据源里 212 条简介全部是「【项目背景】…【项目目的】…【实现技术】…【实现效果】…」这种写法
 * (个别条目会在段内再嵌【】列子点),整段铺开是一坨。没有【】的简介原样返回一段,不丢内容。
 */
function splitIntroSections(intro: string): { label: string; body: string }[] {
  const re = /【([^】]+)】/g;
  const marks: { label: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(intro)) !== null) {
    marks.push({ label: m[1].trim(), start: m.index, end: re.lastIndex });
  }
  if (marks.length === 0) return [{ label: '', body: intro.trim() }];

  const sections: { label: string; body: string }[] = [];
  const lead = intro.slice(0, marks[0].start).trim();
  if (lead) sections.push({ label: '', body: lead });

  marks.forEach((mark, i) => {
    const stop = i + 1 < marks.length ? marks[i + 1].start : intro.length;
    sections.push({ label: mark.label, body: intro.slice(mark.end, stop).trim() });
  });
  return sections;
}

/**
 * 第二十三批西湖英才项目详情。
 * 布局与 ProjectDetailPage / ChunHuiDetailPage 一致:左栏(7/12)放项目信息,
 * 右栏(5/12)上 AI 智能评审、下 专家评审与打分,两栏底边齐平,内容超出各自内部滚动。
 * 高度由 ProjectBrowser 的右列给出。
 *
 * AI 评分与评语尚未接入,先占位;专家评分与意见来自数据源。
 */
export const XihuDetailPage: React.FC<Props> = ({ project: d }) => {
  // 毕业院校 / 拟创办企业 在表里常为空,空的不占格子
  const facts = [
    { label: '申报人', value: d.applicant },
    { label: '分组类别', value: d.group },
    { label: '评审组别', value: d.reviewGroup },
    { label: '毕业院校', value: d.school },
    { label: '拟创办企业', value: d.company },
  ].filter((f) => f.value);

  return (
    /* 高度由 ProjectBrowser 的右列给出(h-full)→ 内容盒正好一屏 */
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 lg:h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] gap-6 lg:flex-1 lg:min-h-0">
        {/* Left Column (7 cols): 项目信息 */}
        <div className="lg:col-span-7 flex flex-col lg:min-h-0">
          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden flex flex-col lg:flex-1 lg:min-h-0">
            {/* 卡片头:项目名称与分组 */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 shrink-0 space-y-2.5">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                {d.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-sm bg-orange-50 text-orange-700 font-medium border border-orange-200">
                  {d.group}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-medium border border-slate-200">
                  {d.reviewGroup}
                </span>
              </div>
            </div>

            {/* 内容区:超出卡片高度时内部滚动 */}
            <div className="p-6 lg:flex-1 lg:min-h-0 lg:overflow-y-auto space-y-5">
              {facts.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
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
              )}

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">项目简介：</span>
                <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-3.5">
                  {splitIntroSections(d.intro).map((sec, i) => (
                    <div key={i} className="space-y-1">
                      {sec.label && (
                        <span className="block text-xs font-bold text-slate-800">
                          {sec.label}
                        </span>
                      )}
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 卡片底部右侧:查看项目申报书(shrink-0,内容再长也不会被顶走) */}
            <div className="px-5 sm:px-6 py-3 border-t border-slate-200 shrink-0 flex justify-end">
              <a
                href={PROPOSAL_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>点击查看项目申报书</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 上 AI 智能评审、下 专家评审与打分 */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:min-h-0">
          {/* 1. AI 评分与评语 —— 尚未接入,先占位 */}
          <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-4 shrink-0">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-indigo-700 rounded-2xs" />
                <h3 className="text-base font-bold text-slate-900">AI智能评审</h3>
              </div>
              <span className="text-[11px] text-slate-400">待生成</span>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-sm px-4 py-3 border border-slate-200 flex items-baseline gap-2.5">
                <span className="text-xs text-slate-500 font-medium">综合得分</span>
                <span className="text-3xl font-bold font-mono text-slate-300 leading-none">—</span>
                <span className="text-xs text-slate-400">/ 100分</span>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">AI评语：</span>
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-400 leading-relaxed">
                  AI 评语尚未生成。
                </div>
              </div>
            </div>
          </div>

          {/* 2. 专家评语和分数:平均分 + 七位专家打分 + 专家组综合意见 */}
          <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-4 lg:flex-1 lg:min-h-0">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-amber-600 rounded-2xs" />
                <h3 className="text-base font-bold text-slate-900">专家评审</h3>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-slate-500">平均分</span>
                <span className="font-mono font-bold text-emerald-700 tabular-nums text-lg">
                  {d.avgScore === null ? '—' : d.avgScore.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>

            {/* 内容区:超出卡片高度时内部滚动 */}
            <div className="space-y-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">评审专家：</span>
                {/* 固定四列 —— 七位专家排成 4 + 3 两行,不随卡片宽度乱换行 */}
                <div className="grid grid-cols-4 gap-2">
                  {d.expertScores.map((score, i) => (
                    <span
                      key={i}
                      className="inline-flex items-baseline justify-center gap-1 px-2 py-1 rounded-sm bg-slate-50 border border-slate-200 text-xs"
                    >
                      <span className="text-slate-500">专家{i + 1}</span>
                      <span className="font-mono font-semibold text-slate-800 tabular-nums">
                        {score === null ? '—' : score}
                      </span>
                      <span className="text-slate-400 text-[10px]">分</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">专家组综合意见：</span>
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                  {d.expertComment}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
