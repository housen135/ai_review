import React from 'react';
import { Project } from '../types/project';
import { Search, Filter, Eye, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_CATEGORY } from '../data/torchCupCategories';
import type { ProjectListState } from '../hooks/useProjectListState';

interface Props {
  projects: Project[];
  /** 筛选 / 排序 / 分页状态由 App 持有,与详情页左侧项目栏共用 */
  listState: ProjectListState;
  onSelectCategory: (category: string) => void;
  onSelectProject: (project: Project) => void;
}

/**
 * 展开态的完整项目列表。
 * 原本长在这里的顶栏(返回火炬杯概况 / 赛道类别 / 导出CSV)已经提到 ProjectBrowser,
 * 展开态与折叠态共用同一根 —— 这里只管搜索、筛选、排序、表格和翻页。
 */
export const ProjectListPage: React.FC<Props> = ({
  projects,
  listState,
  onSelectCategory,
  onSelectProject,
}) => {
  const {
    searchTerm, setSearchTerm,
    recommendFilter, setRecommendFilter,
    sortBy, setSortBy,
    pageSize,
    currentPage, setCurrentPage,
    totalItems,
    totalPages,
    paginatedProjects,
  } = listState;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Control Bar: Search & Filters */}
      <div className="bg-white rounded-md p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索项目名称、企业名称、联系人..."
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500 transition-colors"
          />
        </div>

        {/* Filter Tabs & Sorting */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-sm border border-slate-200 text-xs">
            <button
              onClick={() => setRecommendFilter('all')}
              className={`px-3 py-1.5 font-medium rounded-2xs transition-colors cursor-pointer ${
                recommendFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全部项目 ({projects.length})
            </button>
            <button
              onClick={() => setRecommendFilter('是')}
              className={`px-3 py-1.5 font-medium rounded-2xs transition-colors cursor-pointer ${
                recommendFilter === '是'
                  ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              推荐项目 ({projects.filter((p) => p.isRecommended === '是').length})
            </button>
            <button
              onClick={() => setRecommendFilter('否')}
              className={`px-3 py-1.5 font-medium rounded-2xs transition-colors cursor-pointer ${
                recommendFilter === '否'
                  ? 'bg-slate-800 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              未推荐 ({projects.filter((p) => p.isRecommended === '否').length})
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="shrink-0 text-slate-400">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-sm px-2 py-1.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="default">默认序号</option>
              <option value="score-desc">专家均分 (从高到低)</option>
              <option value="score-asc">专家均分 (从低到高)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container: Clean borders, reduced rounded corners */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold select-none">
                <th className="py-3.5 px-4 w-12 text-center text-slate-400">#</th>
                <th className="py-3.5 px-4 min-w-[200px]">项目名称</th>
                <th className="py-3.5 px-4 min-w-[180px]">企业名称</th>
                <th className="py-3.5 px-4 w-28">联系人</th>
                <th className="py-3.5 px-4 w-28 text-center">专家均分</th>
                <th className="py-3.5 px-4 w-32 text-center">是否推荐</th>
                <th className="py-3.5 px-4 w-36 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Filter className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">未匹配到符合条件的项目</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setRecommendFilter('all');
                        // 赛道也是筛选条件之一,一并回到有数据的默认赛道
                        onSelectCategory(DEFAULT_CATEGORY);
                        setCurrentPage(1);
                      }}
                      className="mt-2 text-xs text-blue-700 hover:underline cursor-pointer"
                    >
                      清空筛选条件
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((item, idx) => {
                  const globalIndex = (currentPage - 1) * pageSize + idx + 1;
                  const isRec = item.isRecommended === '是';
                  const scoreNum = typeof item.avgScore === 'number' ? item.avgScore : parseFloat(item.avgScore) || 0;

                  return (
                    <tr
                      key={item.id || idx}
                      data-row-project-id={item.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {/* Index */}
                      <td className="py-3.5 px-4 text-center font-mono text-slate-400 text-xs tabular-nums">
                        {globalIndex}
                      </td>

                      {/* 1. 项目名称 */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <button
                            onClick={() => onSelectProject(item)}
                            className="font-bold text-slate-900 hover:text-blue-700 transition-colors text-left line-clamp-1 cursor-pointer"
                            title={item.projectName}
                          >
                            {item.projectName}
                          </button>
                          <div className="text-[11px] text-slate-500">
                            <span className="truncate max-w-[240px]">{item.keywords}</span>
                          </div>
                        </div>
                      </td>

                      {/* 2. 企业名称 */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <p className="font-medium text-slate-800 line-clamp-1" title={item.companyName}>
                            {item.companyName}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">{item.region}</p>
                        </div>
                      </td>

                      {/* 3. 联系人 */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">{item.contact}</span>
                      </td>

                      {/* 专家均分 */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-mono font-bold text-sm tabular-nums ${
                            scoreNum >= 90
                              ? 'text-blue-700'
                              : scoreNum >= 80
                              ? 'text-indigo-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {scoreNum.toFixed(2)}
                        </span>
                      </td>

                      {/* 4. 是否推荐 */}
                      <td className="py-3.5 px-4 text-center">
                        {isRec ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>推荐</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>不推荐</span>
                          </span>
                        )}
                      </td>

                      {/* 查看详情操作 */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onSelectProject(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-800 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>查看详情</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            <span>共找到 </span>
            <span className="font-semibold text-slate-900">{totalItems}</span>
            <span> 个项目 · 第 {currentPage} / {totalPages} 页</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>上一页</span>
            </button>
            <span className="font-mono text-xs px-2 text-slate-800 font-semibold">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>下一页</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
