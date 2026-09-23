import React, { useState } from 'react';
import { Project, ProjectAiReview } from '../types/project';
import { CheckCircle2, RefreshCw, X, ArrowRight } from 'lucide-react';
import { generateDefaultAiReview } from '../data/torchCupProjects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  initialProject?: Project | null;
  onSelectProjectDetail: (project: Project) => void;
}

export const AiReviewModal: React.FC<Props> = ({
  isOpen,
  onClose,
  projects,
  initialProject,
  onSelectProjectDetail,
}) => {
  if (!isOpen) return null;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProject ? initialProject.id : (projects[0]?.id || '')
  );
  const [customText, setCustomText] = useState('');
  const [activeMode, setActiveMode] = useState<'select' | 'custom'>('select');
  const [isReviewing, setIsReviewing] = useState(false);
  const [generatedReview, setGeneratedReview] = useState<ProjectAiReview | null>(
    initialProject ? (initialProject.aiReview || generateDefaultAiReview(initialProject)) : null
  );

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleStartReview = () => {
    setIsReviewing(true);
    setTimeout(() => {
      if (activeMode === 'select' && currentProject) {
        setGeneratedReview(generateDefaultAiReview(currentProject));
      } else {
        setGeneratedReview({
          overallScore: 89.6,
          grade: 'A',
          conclusion: '建议立项',
          dimensions: [
            {
              name: '技术壁垒与原创性',
              score: 91.2,
              weight: '25%',
              analysis: '所提技术方案逻辑自洽，创新要素聚焦核心工业生产难点，具备较高的自研与知识产权申报潜力。',
            },
            {
              name: '市场前景与成长空间',
              score: 90.0,
              weight: '20%',
              analysis: '面向战略性新兴产业赛道，下游目标企业采购意愿强烈，存量与增量空间充足。',
            },
            {
              name: '商业模式与落地可行性',
              score: 87.5,
              weight: '20%',
              analysis: '盈利链路清晰，建议强化首台套或标杆大客户落地示范案例，以加快商务推广进程。',
            },
            {
              name: '核心团队与研发配置',
              score: 89.0,
              weight: '20%',
              analysis: '技术带头人专业对口，具备软硬件或工程化实施经验，人员配置合理。',
            },
            {
              name: '合规安全与风险防控',
              score: 90.5,
              weight: '15%',
              analysis: '对政策法规与知识产权保护认知清晰，需关注供应链关键芯片与设备备选冗余。',
            },
          ],
          expertReviewSummary: `【火炬AI大模型评测意见】经综合语义理解与多维科技评测模型：本项目申报方案立意契合国家新型工业化与新质生产力方向，技术创新点论述充分，方案具有较高可操作性与社会经济效益。建议完善产业化落地试点方案并积极对接创投资本。`,
          keyStrengths: [
            '技术方案自主创新程度高，契合新质生产力导向',
            '目标应用场景明确，具备较好降本增效指标',
            '商业变现闭环规划清晰',
          ],
          riskWarnings: [
            '初期项目交付成本与周期控制需加强',
            '关注同类大厂产品可能存在的横向竞争',
          ],
          suggestedActions: [
            '优先打造1-2家示范标杆样板客户',
            '加快发明专利与软著申报进度以稳固护城河',
          ],
          generatedAt: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        });
      }
      setIsReviewing(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-md max-w-4xl w-full p-6 md:p-8 shadow-xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-6">
        {/* Modal Header: 简洁大气，无无意义图标，无英文副标题 */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              专家级AI评审控制台
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              基于火炬科技项目评价模型，输出深度测评结论与五维量化指标
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveMode('select')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer border ${
              activeMode === 'select'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            在审项目库评测 ({projects.length}个)
          </button>
          <button
            onClick={() => setActiveMode('custom')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer border ${
              activeMode === 'custom'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            自由输入/自定义资料测评
          </button>
        </div>

        {/* Input Configuration Area */}
        {activeMode === 'select' ? (
          <div className="space-y-3 bg-slate-50 p-4 rounded-sm border border-slate-200">
            <label className="block text-xs font-bold text-slate-700">
              选择待评审的项目：
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setGeneratedReview(null);
              }}
              className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-xs md:text-sm text-slate-900 focus:outline-hidden"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.projectName} ({p.companyName}) - 专家均分: {p.avgScore}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-3 bg-slate-50 p-4 rounded-sm border border-slate-200">
            <label className="block text-xs font-bold text-slate-700">
              输入项目商业计划书文本、申报书核心内容或直接粘贴产品介绍：
            </label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="请粘贴项目技术背景、产业化规划、核心技术指标等文本..."
              rows={4}
              className="w-full bg-white border border-slate-300 rounded-sm p-3 text-xs md:text-sm text-slate-900 focus:outline-hidden text-justify"
            />
          </div>
        )}

        {/* Action Trigger */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500">
            评测模块：<span className="font-semibold text-slate-800">火炬科技成果智能评价系统</span>
          </div>

          <button
            onClick={handleStartReview}
            disabled={isReviewing || (activeMode === 'custom' && !customText.trim())}
            className="px-5 py-2.5 rounded-sm bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold text-xs md:text-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            {isReviewing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>模型深度分析中...</span>
              </>
            ) : (
              <span>开始综合评测</span>
            )}
          </button>
        </div>

        {/* Generated Review Display Area */}
        {generatedReview && (
          <div className="space-y-5 pt-4 border-t border-slate-200">
            {/* Score & Verdict Card */}
            <div className="bg-slate-50 p-5 rounded-sm border border-slate-200 flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">
                  综合评测总分
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-slate-900">
                    {generatedReview.overallScore}
                  </span>
                  <span className="text-xs text-slate-500">/ 100分</span>
                  <span className="ml-2 px-2.5 py-0.5 rounded-sm bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                    评定等第: {generatedReview.grade}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500">
                  立项及入库研判
                </span>
                <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5 justify-end mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{generatedReview.conclusion}</span>
                </div>
              </div>
            </div>

            {/* AI Review Summary */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800">
                综合评审意见
              </div>
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
                {generatedReview.expertReviewSummary}
              </div>
            </div>

            {/* Dimensions Radar / Progress Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                五维能力量化测评拆解
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {generatedReview.dimensions.map((dim, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-sm bg-white border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{dim.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">权重 {dim.weight}</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {dim.score}分
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 h-1.5 rounded-sm overflow-hidden">
                      <div
                        className="bg-blue-700 h-full rounded-sm"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {dim.analysis}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Risks Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-emerald-800">
                  项目核心竞争优势
                </div>
                <ul className="text-xs text-slate-700 list-disc list-inside space-y-1 leading-relaxed">
                  {generatedReview.keyStrengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              {/* Risks & Suggestions */}
              <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-amber-800">
                  风险预警与优化举措
                </div>
                <ul className="text-xs text-slate-700 list-disc list-inside space-y-1 leading-relaxed">
                  {(generatedReview.suggestedActions || generatedReview.riskWarnings).map((sug, idx) => (
                    <li key={idx}>{sug}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Jump to Project Detail button */}
            {activeMode === 'select' && currentProject && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onClose();
                    onSelectProjectDetail(currentProject);
                  }}
                  className="px-4 py-2 rounded-sm bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>查看该项目完整申报档案与专家评分</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
