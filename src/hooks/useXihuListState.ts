import { useMemo, useState } from 'react';
import { XIHU_PROJECTS, XihuProject } from '../data/xihuProjects';

export type XihuSortBy = 'default' | 'score-desc' | 'score-asc' | 'name-asc';

/** 「全部」不筛选,其余按分组类别精确匹配 */
export const XIHU_ALL_GROUPS = '全部';

/**
 * 西湖英才列表的搜索 / 分组 / 排序状态。提升到 App 层,与详情页左侧的项目栏共用同一份结果。
 *
 * 分组自己由 App 持有并传进来 —— 因为概览页的分组卡片要能直接把列表切到某一组,
 * 那个入口在列表页之外。
 */
export function useXihuListState(
  selectedGroup: string,
  onSelectGroup: (group: string) => void
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<XihuSortBy>('default');

  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    const matched = XIHU_PROJECTS.filter((p) => {
      if (selectedGroup !== XIHU_ALL_GROUPS && p.group !== selectedGroup) return false;
      if (!q) return true;
      return [p.name, p.applicant, p.group, p.reviewGroup, p.school, p.company].some((f) =>
        f.toLowerCase().includes(q)
      );
    });

    return matched.sort((a: XihuProject, b: XihuProject) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'zh-Hans-CN');
      if (sortBy === 'score-desc') return (b.avgScore ?? -1) - (a.avgScore ?? -1);
      if (sortBy === 'score-asc') return (a.avgScore ?? Infinity) - (b.avgScore ?? Infinity);
      return 0;
    });
  }, [searchTerm, sortBy, selectedGroup]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    group: selectedGroup,
    setGroup: onSelectGroup,
    filteredProjects,
    totalItems: XIHU_PROJECTS.length,
  };
}

export type XihuListState = ReturnType<typeof useXihuListState>;
