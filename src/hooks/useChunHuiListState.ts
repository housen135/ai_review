import { useMemo, useState } from 'react';
import { CHUNHUI_PROJECTS, ChunHuiProject } from '../data/chunhuiProjects';

export type ChunHuiSortBy =
  | 'default'
  | 'score-desc'
  | 'score-asc'
  | 'rank-asc'
  | 'rank-desc';

/**
 * 春晖杯列表的搜索 / 排序状态。提升到 App 层,与详情页左侧的项目栏共用同一份结果
 * —— 在列表页搜「剑桥」,左栏也跟着只剩剑桥大学的项目。
 *
 * 按要求不做筛选(没有赛道/推荐之类的分面),也**不分页**:29 条一次给完,
 * 窄栏要能滚才做得了位置对齐。
 */
export function useChunHuiListState() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<ChunHuiSortBy>('default');

  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    const matched = q
      ? CHUNHUI_PROJECTS.filter((p) =>
          [p.name, p.owner, p.school, p.country, p.id].some((field) =>
            field.toLowerCase().includes(q)
          )
        )
      : CHUNHUI_PROJECTS.slice();

    return matched.sort((a: ChunHuiProject, b: ChunHuiProject) => {
      if (sortBy === 'score-desc') return b.score - a.score;
      if (sortBy === 'score-asc') return a.score - b.score;
      if (sortBy === 'rank-asc') return a.rank - b.rank;
      if (sortBy === 'rank-desc') return b.rank - a.rank;
      return 0;
    });
  }, [searchTerm, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filteredProjects,
    totalItems: CHUNHUI_PROJECTS.length,
  };
}

export type ChunHuiListState = ReturnType<typeof useChunHuiListState>;
