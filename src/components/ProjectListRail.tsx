import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types/project';

interface Props {
  /** 当前页的项目(与项目列表页同一批数据、同一个页码) */
  projects: Project[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedProjectId: string;
  onSelectProject: (project: Project) => void;
}

/**
 * 从项目列表进入详情时,列表页收窄成最左侧的常驻栏,只保留项目名称。
 * 点击名称切换右侧详情内容,不必退回列表页。
 * 栏内的翻页与列表页共用同一个页码状态 —— 在栏内翻到第 2 页,回到列表页也是第 2 页。
 * 窄屏(<lg)下隐藏:宽度不足以并排两栏,仍走「返回项目列表」的原有路径。
 */
export const ProjectListRail: React.FC<Props> = ({
  projects,
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
  selectedProjectId,
  onSelectProject,
}) => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-56 flex-col bg-white border-r border-slate-200 z-30">
      <div className="px-4 py-4 border-b border-slate-200 shrink-0">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight">
          项目列表
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          共 {totalItems} 个项目 · 点击切换
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-1.5">
        {projects.length === 0 ? (
          <p className="px-4 py-6 text-[11px] text-slate-400 leading-relaxed">
            当前筛选条件下没有项目
          </p>
        ) : (
          projects.map((project) => {
            const isActive = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                onClick={() => onSelectProject(project)}
                title={project.projectName}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer border-l-2 ${
                  isActive
                    ? 'border-l-blue-700 bg-blue-50 text-blue-700 font-bold'
                    : 'border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="line-clamp-2 leading-snug">{project.projectName}</span>
              </button>
            );
          })
        )}
      </div>

      {/* 翻页:驱动的是列表页共用的页码状态 */}
      {totalPages > 1 && (
        <div className="shrink-0 border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            title="上一页"
            className="p-1 rounded-sm border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono text-slate-600 tabular-nums">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            title="下一页"
            className="p-1 rounded-sm border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
};
