import React, { useState, useEffect, useRef } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { CurrentView } from '../types/navigation';

const REVIEW_MODELS = [
  '火炬杯评审模型',
  '春晖杯评审模型',
  '人才类项目评审模型',
  '科技类项目评审模型',
] as const;

export type ReviewModel = (typeof REVIEW_MODELS)[number];

export const DEFAULT_REVIEW_MODEL: ReviewModel = '火炬杯评审模型';

interface Props {
  onNavigate: (view: CurrentView) => void;
  onOpenUpload: (type?: 'material' | 'list') => void;
  onOpenAiReview: (queryText?: string) => void;
  onSelectCompetition?: (competitionName: string) => void;
  reviewModel: ReviewModel;
  onSelectReviewModel: (model: ReviewModel) => void;
}

export const HomePage: React.FC<Props> = ({
  onNavigate,
  onOpenUpload,
  onOpenAiReview,
  reviewModel,
  onSelectReviewModel,
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedCompModal, setSelectedCompModal] = useState<string | null>(null);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const uploadMenuRef = useRef<HTMLDivElement>(null);

  // Close the '+' upload menu on outside click or Escape
  useEffect(() => {
    if (!showUploadMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(e.target as Node)) {
        setShowUploadMenu(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowUploadMenu(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showUploadMenu]);

  const handleUploadMenuItem = (type: 'material' | 'list') => {
    setShowUploadMenu(false);
    onOpenUpload(type);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim()) {
      onOpenAiReview(inputText);
    } else {
      onNavigate('torch-intro');
    }
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] flex flex-col justify-between py-8 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Main Hero & Input Section */}
      <div className="flex-1 flex flex-col items-center justify-center pt-8 md:pt-14 pb-10">
        {/* Title Lockup: 风格简洁大气，无无意义小图标、无emoji、无英文副标题 */}
        <div className="text-center mb-14 space-y-3">

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            火炬AI大模型 <span className="text-blue-700">AI评审</span>
          </h1>
        </div>

        {/* Center Search / Prompt Input Container */}
        <div className="w-full max-w-3xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white border border-slate-300 rounded-md p-2 pl-4 shadow-xs hover:border-slate-400 transition-colors"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="可上传项目商业计划书、项目申报书等资料"
              className="w-full bg-transparent text-slate-900 text-sm md:text-base placeholder-slate-400 focus:outline-hidden py-2"
            />

            {/* Dark red button */}
            <button
              type="submit"
              className="ml-2 px-5 py-2.5 rounded-sm bg-red-800 hover:bg-red-900 text-white font-medium text-xs md:text-sm transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>智能评审</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Action Buttons Below Left End of Input Box */}
          <div className="flex items-center justify-start gap-3 mt-4 flex-wrap">
            {/* Quick Upload '+' button, expands into the two upload options */}
            <div className="relative" ref={uploadMenuRef}>
              <button
                type="button"
                onClick={() => setShowUploadMenu((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={showUploadMenu}
                className={`flex items-center justify-center w-8 h-8 rounded-sm bg-white border shadow-xs transition-colors cursor-pointer ${
                  showUploadMenu
                    ? 'border-slate-400 text-slate-900 bg-slate-50'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
                title="上传"
              >
                <Plus className="w-4 h-4" />
              </button>

              {showUploadMenu && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-1.5 z-20 w-40 py-1 bg-white border border-slate-300 rounded-sm shadow-lg"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleUploadMenuItem('material')}
                    className="block w-full px-3 py-2 text-left text-xs font-medium text-slate-800 hover:bg-slate-50 cursor-pointer"
                  >
                    上传项目资料
                  </button>
                </div>
              )}
            </div>

            {/* Review model segmented control (native radios, circles hidden) */}
            <fieldset className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-md bg-slate-100 border border-slate-200">
              <legend className="sr-only">评审模型</legend>
              {REVIEW_MODELS.map((model) => {
                const isSelected = reviewModel === model;
                return (
                  <label key={model} className="cursor-pointer select-none">
                    <input
                      type="radio"
                      name="review-model"
                      value={model}
                      checked={isSelected}
                      onChange={() => onSelectReviewModel(model)}
                      className="sr-only peer"
                    />
                    <span
                      className={`block px-4 py-2 text-sm rounded-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 ${
                        isSelected
                          ? 'bg-white text-blue-700 font-semibold shadow-xs'
                          : 'text-slate-600 font-medium hover:bg-white/70 hover:text-slate-900'
                      }`}
                    >
                      {model}
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </div>
        </div>
      </div>

      {/* Four Big Buttons Section with Gradient Fills as explicitly requested:
          图片用 蓝紫渐变，红橙渐变，绿黄渐变等填充，按钮标题分别是分别是 火炬杯大赛 春晖杯大赛 5213项目 科技项目
          减少圆角使用 (rounded-md/sm)，去掉装饰性图标，风格大气
      */}
      <div className="w-full mt-4 mb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. 火炬杯大赛 (蓝紫渐变) -> Enters Page 2 */}
          <div
            onClick={() => onNavigate('torch-intro')}
            className="rounded-md p-6 text-white cursor-pointer bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 border border-blue-900/30 hover:opacity-95 transition-opacity"
          >
            <div className="flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-200">
                  重点赛事专栏
                </span>
                <span className="text-xs text-blue-300 font-mono">01</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
                  火炬杯大赛
                </h3>
                <p className="text-xs text-blue-100 line-clamp-1">
                  新一代信息技术 · 7大赛道入库项目与专家打分
                </p>
              </div>

              <div className="text-xs font-semibold text-blue-200 flex items-center justify-between pt-2 border-t border-white/20">
                <span>进入赛事专区</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. 春晖杯大赛 (红橙渐变) */}
          <div
            onClick={() => setSelectedCompModal('春晖杯大赛')}
            className="rounded-md p-6 text-white cursor-pointer bg-gradient-to-br from-rose-600 via-red-600 to-orange-500 border border-red-900/30 hover:opacity-95 transition-opacity"
          >
            <div className="flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-red-200">
                  留学人员创新
                </span>
                <span className="text-xs text-red-300 font-mono">02</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
                  春晖杯大赛
                </h3>
                <p className="text-xs text-red-100 line-clamp-1">
                  海外高层次留学人才创新创业与成果转化
                </p>
              </div>

              <div className="text-xs font-semibold text-red-200 flex items-center justify-between pt-2 border-t border-white/20">
                <span>查看赛事规则</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 3. 5213项目 (绿黄渐变) */}
          <div
            onClick={() => setSelectedCompModal('5213项目')}
            className="rounded-md p-6 text-white cursor-pointer bg-gradient-to-br from-teal-700 via-emerald-600 to-amber-500 border border-emerald-900/30 hover:opacity-95 transition-opacity"
          >
            <div className="flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-200">
                  引智招才计划
                </span>
                <span className="text-xs text-emerald-300 font-mono">03</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
                  5213项目
                </h3>
                <p className="text-xs text-emerald-100 line-clamp-1">
                  高层次人才集聚与关键战略产业扶持
                </p>
              </div>

              <div className="text-xs font-semibold text-emerald-200 flex items-center justify-between pt-2 border-t border-white/20">
                <span>查看申报指南</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 4. 科技项目 (深蓝金紫渐变) */}
          <div
            onClick={() => setSelectedCompModal('科技项目')}
            className="rounded-md p-6 text-white cursor-pointer bg-gradient-to-br from-indigo-700 via-blue-800 to-purple-800 border border-indigo-900/30 hover:opacity-95 transition-opacity"
          >
            <div className="flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-200">
                  前沿战略攻关
                </span>
                <span className="text-xs text-indigo-300 font-mono">04</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
                  科技项目
                </h3>
                <p className="text-xs text-indigo-100 line-clamp-1">
                  重大专项攻关与新型工业化产业链布局
                </p>
              </div>

              <div className="text-xs font-semibold text-indigo-200 flex items-center justify-between pt-2 border-t border-white/20">
                <span>浏览申报专项</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competition Details Modal */}
      {selectedCompModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full p-6 border border-slate-200 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">{selectedCompModal}</h3>
              <button
                onClick={() => setSelectedCompModal(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify space-y-2">
              <p>
                该申报通道正按科技主管部门统一日程组织实施。当前系统重点保障“第十三届火炬杯创新创业大赛”的新一代信息技术在库项目评审与综合分析。
              </p>
              <div className="border-l-2 border-blue-700 bg-slate-50 p-2.5">
                建议前往火炬杯大赛专区，查阅真实入围项目详情、核心团队、技术突破及专家评分。
              </div>
            </div>
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedCompModal(null)}
                className="px-3.5 py-1.5 rounded-sm border border-slate-300 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                关闭
              </button>
              <button
                onClick={() => {
                  setSelectedCompModal(null);
                  onNavigate('torch-intro');
                }}
                className="px-4 py-1.5 rounded-sm bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 cursor-pointer"
              >
                进入火炬杯大赛专区
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
