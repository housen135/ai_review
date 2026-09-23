import { useMemo, useState } from 'react';
import { Project } from '../types/project';

export type RecommendFilter = 'all' | '是' | '否';
export type SortBy = 'default' | 'score-desc' | 'score-asc';

const PAGE_SIZE = 10;

const toScore = (v: Project['avgScore']) =>
  typeof v === 'number' ? v : parseFloat(String(v)) || 0;

/**
 * 项目列表的筛选 / 排序 / 分页状态。
 * 提升到 App 层,使项目列表页与详情页左侧的项目栏共用同一批数据与同一个页码 ——
 * 在左栏翻页,列表页也跟着翻;在列表页筛赛道,左栏也只剩该赛道的项目。
 */
export function useProjectListState(projects: Project[], selectedCategory: string) {
  const [searchTerm, setSearchTermRaw] = useState('');
  const [recommendFilter, setRecommendFilterRaw] = useState<RecommendFilter>('all');
  const [sortBy, setSortByRaw] = useState<SortBy>('default');
  const [currentPage, setCurrentPage] = useState(1);

  // 任一筛选条件变化都回到第 1 页,否则可能停在一个已不存在的空页上
  const setSearchTerm = (v: string) => {
    setSearchTermRaw(v);
    setCurrentPage(1);
  };
  const setRecommendFilter = (v: RecommendFilter) => {
    setRecommendFilterRaw(v);
    setCurrentPage(1);
  };
  const setSortBy = (v: SortBy) => {
    setSortByRaw(v);
    setCurrentPage(1);
  };

  const filteredProjects = useMemo(() => {
    return projects
      .filter((item) => {
        const matchCat =
          !selectedCategory || selectedCategory === '全部赛道' || item.category === selectedCategory;
        if (!matchCat) return false;

        if (recommendFilter !== 'all' && item.isRecommended !== recommendFilter) {
          return false;
        }

        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const hit = [item.projectName, item.companyName, item.contact, item.keywords, item.region]
            .some((field) => field.toLowerCase().includes(q));
          if (!hit) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score-desc') return toScore(b.avgScore) - toScore(a.avgScore);
        if (sortBy === 'score-asc') return toScore(a.avgScore) - toScore(b.avgScore);
        return 0;
      });
  }, [projects, selectedCategory, recommendFilter, searchTerm, sortBy]);

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  // 筛选后条数变少时,收敛到最后一页,避免停在不存在的页码上
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, safePage]);

  return {
    searchTerm,
    setSearchTerm,
    recommendFilter,
    setRecommendFilter,
    sortBy,
    setSortBy,
    pageSize: PAGE_SIZE,
    currentPage: safePage,
    setCurrentPage,
    filteredProjects,
    totalItems,
    totalPages,
    paginatedProjects,
  };
}

export type ProjectListState = ReturnType<typeof useProjectListState>;
