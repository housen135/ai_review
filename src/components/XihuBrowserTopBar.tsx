import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CurrentView } from '../types/navigation';

interface Props {
  onNavigate: (view: CurrentView) => void;
  /** 当前结果条数(受搜索影响) */
  count: number;
}

/**
 * 西湖英才浏览器的顶栏。与另外两个赛事一样:**展开态和折叠态共用同一根**,
 * 不属于列表或详情任何一边,所以不随左栏收放而出现/消失。
 */
export const XihuBrowserTopBar: React.FC<Props> = ({ onNavigate, count }) => {
  return (
    <div
      data-browser-topbar
      className="shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3"
    >
      <button
        onClick={() => onNavigate('xihu-intro')}
        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors cursor-pointer shrink-0"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回西湖英才概况</span>
      </button>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>西湖AI大模型</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">第二十三批西湖英才项目</span>
        <span className="text-slate-300">|</span>
        <span>
          共 <span className="font-semibold text-slate-900">{count}</span> 个项目
        </span>
      </div>
    </div>
  );
};
