import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CurrentView } from '../types/navigation';

interface Props {
  onNavigate: (view: CurrentView) => void;
  /** 当前结果条数(受搜索影响) */
  count: number;
}

/**
 * 春晖杯浏览器的顶栏。和火炬杯那份一样:**展开态和折叠态共用同一根**,
 * 不属于列表或详情任何一边,所以不随左栏收放而出现/消失。
 * 春晖杯没有赛道筛选和导出,所以左侧只留返回,右侧显示条数。
 */
export const ChunHuiBrowserTopBar: React.FC<Props> = ({ onNavigate, count }) => {
  return (
    <div
      data-browser-topbar
      className="shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3"
    >
      <button
        onClick={() => onNavigate('chunhui-intro')}
        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors cursor-pointer shrink-0"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回春晖杯概况</span>
      </button>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>春晖AI大模型</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">2026年春晖杯项目列表</span>
        <span className="text-slate-300">|</span>
        <span>
          共 <span className="font-semibold text-slate-900">{count}</span> 个项目
        </span>
      </div>
    </div>
  );
};
