import React from 'react';
import { ArrowLeft, ChevronDown, Download, Printer, CheckCircle2, XCircle } from 'lucide-react';
import { Project } from '../types/project';
import { CurrentView } from '../types/navigation';
import { generateProjectsCSV } from '../data/torchCupProjects';
import { TORCH_CUP_CATEGORIES, DEFAULT_CATEGORY } from '../data/torchCupCategories';

interface Props {
  /** 左栏是否已收窄为窄栏(详情已打开) */
  collapsed: boolean;
  projects: Project[];
  selectedCategory: string;
  selectedProject: Project | null;
  onNavigate: (view: CurrentView) => void;
  onChangeCategory: (category: string) => void;
}

/**
 * 项目浏览器的共用顶栏 —— 展开态和折叠态是同一根,内容不整条替换。
 *
 * 左侧(返回火炬杯概况 / 赛道类别)两种状态都在:它属于「浏览器」这个层级,
 * 不属于列表或详情任何一边。右侧按上下文换:列表态给导出,详情态给该项目的
 * 推荐状态与打印 —— 这两样原本长在详情页自己的顶部,去掉那个顶栏后收到这里。
 */
export const ProjectBrowserTopBar: React.FC<Props> = ({
  collapsed,
  projects,
  selectedCategory,
  selectedProject,
  onNavigate,
  onChangeCategory,
}) => {
  const isRec = selectedProject?.isRecommended === '是';

  const handleExportCSV = () => {
    const csvContent = generateProjectsCSV(projects);
    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `第三届火炬杯_${selectedCategory || DEFAULT_CATEGORY}_项目数据清单.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      data-browser-topbar
      className="shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3"
    >
      {/* 左:返回 + 赛道类别。与展开态列表页原来的那一条完全一致 */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => onNavigate('torch-intro')}
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回火炬杯概况</span>
        </button>

        <span className="text-slate-300">|</span>

        <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500 min-w-0">
          <span className="shrink-0">赛道类别：</span>
          <div className="relative">
            <select
              value={selectedCategory || DEFAULT_CATEGORY}
              onChange={(e) => onChangeCategory(e.target.value)}
              aria-label="赛道类别"
              className="appearance-none font-bold text-slate-900 bg-slate-100 pl-2.5 pr-7 py-1 rounded-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 cursor-pointer transition-colors max-w-[10rem] truncate"
            >
              {TORCH_CUP_CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 右:随上下文切换 */}
      <div className="flex items-center gap-2 shrink-0">
        {collapsed && selectedProject ? (
          <>
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border shadow-xs transition-all ${
                isRec
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-800'
                  : 'bg-slate-50 border-slate-300 text-slate-700'
              }`}
            >
              <span className="text-xs font-bold">是否推荐：</span>
              <span className={`text-sm font-black ${isRec ? 'text-emerald-700' : 'text-slate-800'}`}>
                {selectedProject.isRecommended}
              </span>
              {isRec ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-slate-400" />
              )}
            </div>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-sm border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              title="打印或另存为PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 bg-white text-xs font-medium text-slate-800 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
            title="导出当前项目CSV数据"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>导出CSV数据</span>
          </button>
        )}
      </div>
    </div>
  );
};
