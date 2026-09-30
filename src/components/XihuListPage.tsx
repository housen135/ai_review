import React from 'react';
import { Search, Eye, ChevronDown } from 'lucide-react';
import type { XihuListState, XihuSortBy } from '../hooks/useXihuListState';
import { XIHU_ALL_GROUPS } from '../hooks/useXihuListState';
import { XIHU_CATEGORIES } from '../data/xihuCategories';

interface Props {
  listState: XihuListState;
  /** 点行或「查看详情」:交给 ProjectBrowser 先做左栏滚动对齐再切视图 */
  onSelectProject: (projectId: string) => void;
}

/** 平均分配色沿用列表页各自的分档习惯 */
const scoreClass = (score: number | null) => {
  if (score === null) return 'text-slate-400';
  if (score >= 90) return 'text-blue-700';
  if (score >= 80) return 'text-indigo-700';
  return 'text-slate-600';
};

const SORT_OPTIONS: { value: XihuSortBy; label: string }[] = [
  { value: 'default', label: '默认顺序' },
  { value: 'score-desc', label: '平均分 (从高到低)' },
  { value: 'score-asc', label: '平均分 (从低到高)' },
  { value: 'name-asc', label: '项目名称 (拼音序)' },
];

/**
 * 第二十三批西湖英才项目列表。交互与春晖杯一致:
 * 顶栏与左栏由 ProjectBrowser 提供,这里只管搜索、排序与表格。
 * 列:项目名称 / 申报人 / 分组类别 / 平均分 / AI评分(暂空)。
 */
export const XihuListPage: React.FC<Props> = ({ listState, onSelectProject }) => {
  const {
    searchTerm, setSearchTerm,
    sortBy, setSortBy,
    group, setGroup,
    filteredProjects, totalItems,
  } = listState;

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
            placeholder="搜索项目名称、申报人、分组..."
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="shrink-0 text-slate-400">分组：</span>
            <div className="relative">
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                aria-label="分组类别"
                className="appearance-none bg-slate-50 border border-slate-300 rounded-sm pl-2 pr-7 py-1.5 text-xs text-slate-800 focus:outline-hidden cursor-pointer max-w-[11rem]"
              >
                <option value={XIHU_ALL_GROUPS}>全部分组</option>
                {XIHU_CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="shrink-0 text-slate-400">排序：</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as XihuSortBy)}
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-orange-700 rounded-2xs" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              第二十三批西湖英才项目
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            共找到 <span className="font-semibold text-slate-900">{filteredProjects.length}</span> 个
            {filteredProjects.length !== totalItems ? ` / ${totalItems}` : ''} 项目
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold select-none">
                <th className="py-3.5 px-4 min-w-[260px]">项目名称</th>
                <th className="py-3.5 px-4 w-28">申报人</th>
                <th className="py-3.5 px-4 w-40">分组类别</th>
                <th className="py-3.5 px-4 w-24 text-center">平均分</th>
                <th className="py-3.5 px-4 w-24 text-center">AI评分</th>
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
                      onClick={() => {
                        setSearchTerm('');
                        setGroup(XIHU_ALL_GROUPS);
                      }}
                      className="mt-2 text-xs text-blue-700 hover:underline cursor-pointer"
                    >
                      清空搜索与分组条件
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
                      <span className="font-medium text-slate-700">{item.applicant}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                        {item.group}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-mono font-bold text-sm tabular-nums ${scoreClass(item.avgScore)}`}
                      >
                        {item.avgScore === null ? '—' : item.avgScore.toFixed(1)}
                      </span>
                    </td>

                    {/* AI 评分尚未接入 */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-xs text-slate-300">待生成</span>
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
