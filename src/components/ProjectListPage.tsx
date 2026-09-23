import React, { useState, useMemo } from 'react';
import { Project } from '../types/project';
import { CurrentView } from '../types/navigation';
import { ArrowLeft, Search, Filter, Download, Eye, CheckCircle2, XCircle, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { generateProjectsCSV } from '../data/torchCupProjects';
import { TORCH_CUP_CATEGORIES, DEFAULT_CATEGORY } from '../data/torchCupCategories';

interface Props {
  projects: Project[];
  selectedCategory: string;
  onNavigate: (view: CurrentView) => void;
  onSelectCategory: (category: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenAiReviewForProject?: (project: Project) => void;
}

export const ProjectListPage: React.FC<Props> = ({
  projects,
  selectedCategory,
  onNavigate,
  onSelectCategory,
  onSelectProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendFilter, setRecommendFilter] = useState<'all' | '是' | '否'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'score-desc' | 'score-asc'>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      // Category match — 原样按赛道过滤，不再兜底放行其它赛道的项目
      const matchCat = !selectedCategory || selectedCategory === '全部赛道' || item.category === selectedCategory;
      if (!matchCat) return false;

      // Recommendation filter
      if (recommendFilter !== 'all' && item.isRecommended !== recommendFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const inName = item.projectName.toLowerCase().includes(q);
        const inComp = item.companyName.toLowerCase().includes(q);
        const inContact = item.contact.toLowerCase().includes(q);
        const inKw = item.keywords.toLowerCase().includes(q);
        const inRegion = item.region.toLowerCase().includes(q);
        if (!inName && !inComp && !inContact && !inKw && !inRegion) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'score-desc') {
        const sA = typeof a.avgScore === 'number' ? a.avgScore : parseFloat(a.avgScore) || 0;
        const sB = typeof b.avgScore === 'number' ? b.avgScore : parseFloat(b.avgScore) || 0;
        return sB - sA;
      }
      if (sortBy === 'score-asc') {
        const sA = typeof a.avgScore === 'number' ? a.avgScore : parseFloat(a.avgScore) || 0;
        const sB = typeof b.avgScore === 'number' ? b.avgScore : parseFloat(b.avgScore) || 0;
        return sA - sB;
      }
      return 0;
    });
  }, [projects, selectedCategory, recommendFilter, searchTerm, sortBy]);

  // Pagination calculation
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  // Download CSV handler
  const handleExportCSV = () => {
    const csvContent = generateProjectsCSV(projects);
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `第三届火炬杯_${selectedCategory || '新一代信息技术'}_项目数据清单.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('torch-intro')}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回火炬杯概况</span>
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500">
            <span className="shrink-0">赛道类别：</span>
            <div className="relative">
              <select
                value={selectedCategory || DEFAULT_CATEGORY}
                onChange={(e) => {
                  onSelectCategory(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="赛道类别"
                className="appearance-none font-bold text-slate-900 bg-slate-100 pl-2.5 pr-7 py-1 rounded-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 cursor-pointer transition-colors"
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

        {/* Action Buttons: Export CSV */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 bg-white text-xs font-medium text-slate-800 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
            title="导出当前项目CSV数据"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>导出CSV数据</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white rounded-md p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="搜索项目名称、企业名称、联系人..."
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500 transition-colors"
          />
        </div>

        {/* Filter Tabs & Sorting */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-sm border border-slate-200 text-xs">
            <button
              onClick={() => {
                setRecommendFilter('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 font-medium rounded-2xs transition-colors cursor-pointer ${
                recommendFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全部项目 ({projects.length})
            </button>
            <button
              onClick={() => {
                setRecommendFilter('是');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 font-medium rounded-2xs transition-colors cursor-pointer ${
                recommendFilter === '是'
                  ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              推荐项目 ({projects.filter((p) => p.isRecommended === '是').length})
            </button>
            <button
              onClick={() => {
                setRecommendFilter('否');
                setCurrentPage(1);
              }}
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
