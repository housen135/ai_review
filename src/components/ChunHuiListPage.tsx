import React from 'react';
import { Search, Eye, ChevronDown } from 'lucide-react';
import type { ChunHuiListState, ChunHuiSortBy } from '../hooks/useChunHuiListState';
import { CHUNHUI_PROJECT_CATEGORY } from '../data/chunhuiProjects';

interface Props {
  listState: ChunHuiListState;
  /** 点行或「查看详情」:交给 ProjectBrowser 先做左栏滚动对齐再切视图 */
  onSelectProject: (projectId: string) => void;
}

/** 评分配色沿用火炬杯列表页的分档 */
const scoreClass = (score: number) =>
  score >= 90 ? 'text-blue-700' : score >= 80 ? 'text-indigo-700' : 'text-slate-600';

const SORT_OPTIONS: { value: ChunHuiSortBy; label: string }[] = [
  { value: 'default', label: '默认顺序' },
  { value: 'score-desc', label: 'AI评分 (从高到低)' },
  { value: 'score-asc', label: 'AI评分 (从低到高)' },
  { value: 'rank-asc', label: '排名 (从第1名开始)' },
  { value: 'rank-desc', label: '排名 (从末位开始)' },
];

/**
 * 2026 年春晖杯项目列表。
 * 顶栏(返回春晖杯概况)已提到 ProjectBrowser 的共用顶栏,这里只管搜索、排序与表格。
 * 列顺序按需求给的顺序:项目名称 / 所有人 / 院校 / AI评分 / 排名。
 */
export const ChunHuiListPage: React.FC<Props> = ({ listState, onSelectProject }) => {
  const { searchTerm, setSearchTerm, sortBy, setSortBy, filteredProjects, totalItems } = listState;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Control Bar: Search & Sort */}
      <div className="bg-white rounded-md p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索项目名称、所有人、院校..."
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-600">
          <span className="shrink-0 text-slate-400">排序：</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as ChunHuiSortBy)}
              aria-label="排序方式"
              className="appearance-none bg-slate-50 border border-slate-300 rounded-sm pl-2 pr-7 py-1.5 text-xs text-slate-800 focus:outline-hidden cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-emerald-700 rounded-2xs" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              2026年春晖创新创业项目
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
              {CHUNHUI_PROJECT_CATEGORY}
            </span>
            <span>
              共找到 <span className="font-semibold text-slate-900">{filteredProjects.length}</span> 个
              {filteredProjects.length !== totalItems ? ` / ${totalItems}` : ''} 项目
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold select-none">
                <th className="py-3.5 px-4 min-w-[240px]">项目名称</th>
                <th className="py-3.5 px-4 w-32">所有人</th>
                <th className="py-3.5 px-4 min-w-[180px]">院校</th>
                <th className="py-3.5 px-4 w-28 text-center">AI评分</th>
                <th className="py-3.5 px-4 w-20 text-center">排名</th>
                <th className="py-3.5 px-4 w-32 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">未匹配到符合条件的项目</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-2 text-xs text-blue-700 hover:underline cursor-pointer"
                    >
                      清空搜索条件
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((item) => (
                  <tr
                    key={item.id}
                    data-row-project-id={item.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => onSelectProject(item.id)}
                  >
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onSelectProject(item.id)}
                        title={item.name}
                        className="font-bold text-slate-900 hover:text-blue-700 transition-colors text-left line-clamp-1 cursor-pointer"
                      >
                        {item.name}
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-700">{item.owner}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="text-slate-800 line-clamp-1" title={item.school}>
                        {item.school}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{item.country}</p>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-mono font-bold text-sm tabular-nums ${scoreClass(item.score)}`}
                      >
                        {item.score.toFixed(1)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono font-semibold text-slate-700 tabular-nums">
                        {item.rank}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onSelectProject(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-800 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>查看详情</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
