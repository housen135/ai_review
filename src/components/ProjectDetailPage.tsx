import React, { useState } from 'react';
import { Project, ProjectAiReview } from '../types/project';
import { parseCoreTeamMembers, generateDefaultAiReview } from '../data/torchCupProjects';
import { RefreshCw } from 'lucide-react';

interface Props {
  project: Project;
  onUpdateProjectAiReview?: (projectId: string, review: ProjectAiReview) => void;
}

/**
 * 项目详情。顶部原本有一条自己的信息卡(首页/项目列表面包屑、是否推荐、打印),
 * 已经整条去掉 —— 那些收进了 ProjectBrowser 的共用顶栏,这里专心放内容。
 */
export const ProjectDetailPage: React.FC<Props> = ({
  project,
  onUpdateProjectAiReview,
}) => {
  // 左侧三大模块：项目详情 / 企业与团队 / 市场竞争与运营分析
  const LEFT_MODULES = [
    { key: 'project', label: '参赛项目详情信息', shortLabel: '项目详情' },
    { key: 'team', label: '企业与团队介绍', shortLabel: '企业与团队' },
    { key: 'market', label: '市场竞争与运营分析', shortLabel: '市场竞争' },
  ] as const;

  type ModuleKey = typeof LEFT_MODULES[number]['key'];
  const [activeModule, setActiveModule] = useState<ModuleKey>('project');

  // 9 Tabs as specified in Requirement:
  const MARKET_TABS = [
    { key: 'marketAnalysis', label: '产品市场分析及竞争优势', shortLabel: '产品市场分析' },
    { key: 'topCustomers', label: '当前五大客户', shortLabel: '五大客户' },
    { key: 'topSuppliers', label: '当前五大供应商', shortLabel: '五大供应商' },
    { key: 'domesticRank', label: '市场竞争分析-国内市场地位排名', shortLabel: '国内地位排名' },
    { key: 'marketShare', label: '市场竞争分析-市场份额占有率', shortLabel: '市场份额占有率' },
    { key: 'domesticCompetitors', label: '国内竞争对手', shortLabel: '国内竞争对手' },
    { key: 'intlCompetitors', label: '国际竞争对手', shortLabel: '国际竞争对手' },
    { key: 'businessModel', label: '商业模式及业务拓展计划', shortLabel: '商业模式及拓展' },
    { key: 'riskAndCountermeasure', label: '经营风险与对策', shortLabel: '经营风险与对策' },
  ] as const;

  type TabKey = typeof MARKET_TABS[number]['key'];
  const [activeTab, setActiveTab] = useState<TabKey>('marketAnalysis');

  // Expert Judge Tab
  const [activeJudgeTab, setActiveJudgeTab] = useState<'judge1' | 'judge2' | 'judge3'>('judge1');

  // AI review state
  const [aiReview, setAiReview] = useState<ProjectAiReview>(
    project.aiReview || generateDefaultAiReview(project)
  );
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const parsedTeam = parseCoreTeamMembers(project.coreTeam);

  const handleRegenerateAi = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const updated = generateDefaultAiReview(project);
      setAiReview(updated);
      setIsGeneratingAi(false);
      if (onUpdateProjectAiReview) {
        onUpdateProjectAiReview(project.id, updated);
      }
    }, 600);
  };

  const avgScoreFormatted = typeof project.avgScore === 'number'
    ? project.avgScore.toFixed(2)
    : parseFloat(String(project.avgScore) || '0').toFixed(2);

  return (
    /* lg 下整页锁定为一屏,高度由 ProjectBrowser 的右列给出(h-full)→ 内容盒正好一屏。
       顶部那条信息卡已经整条去掉,这里只剩一个网格,lg:flex-1 直接吃掉整屏 */
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 lg:h-full">
      {/* Main Grid:
          Left (col-span-7): 参赛项目详情信息 / 企业与团队介绍 / 市场竞争与运营分析 三个标签页
          Right (col-span-5): 上 AI智能评审、下 专家评审与打分
          两列等高撑满剩余高度,底边框自然对齐;内容超出各自内部滚动
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] gap-6 lg:flex-1 lg:min-h-0">
        {/* Left Column: Tabbed panel
            与右栏同高,底边框与右下「专家评审与打分」卡片下边框对齐;
            内容超出面板高度时在面板内部滚动
        */}
        <div className="lg:col-span-7 flex flex-col lg:min-h-0">
          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden flex flex-col lg:flex-1 lg:min-h-0">
            {/* Tab strip */}
            <div className="flex items-center border-b border-slate-200 pl-1 sm:pl-2 pr-4 shrink-0">
              <div className="flex items-stretch overflow-x-auto">
                {LEFT_MODULES.map((tab) => {
                  const isActive = activeModule === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveModule(tab.key)}
                      className={`px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer ${
                        isActive
                          ? 'text-blue-700 border-blue-700 font-bold'
                          : 'text-slate-600 border-transparent font-medium hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active module panel:超出面板高度时内部滚动 */}
            <div className="p-6 lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
              {/* ---- 模块 1：参赛项目详情信息 ---- */}
              {activeModule === 'project' && (
                <div className="space-y-5">
                  {/* 1. 参赛项目名称 */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-500">
                      参赛项目名称
                    </span>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                      {project.projectName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                      <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 font-medium border border-blue-200">
                        {project.category}
                      </span>
                      <span>·</span>
                      <span className="text-slate-600 font-medium">{project.keywords}</span>
                    </div>
                  </div>

                  {/* 2. 参赛项目介绍 */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-slate-700">
                      参赛项目介绍
                    </div>
                    <div className="bg-slate-50 rounded-sm p-4 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                      {project.projectIntro}
                    </div>
                  </div>

                  {/* 3. 产品技术创新点介绍 */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800">
                      产品技术创新点介绍
                    </div>
                    <div className="bg-slate-50 rounded-sm p-4 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                      {project.techInnovation}
                    </div>
                  </div>

                  {/* 4. 技术成熟性及可靠性论述 */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800">
                      技术成熟性及可靠性论述
                    </div>
                    <div className="bg-slate-50 rounded-sm p-4 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                      {project.techMaturity}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- 模块 2：企业与团队介绍 ---- */}
              {activeModule === 'team' && (
                <div className="space-y-5">
                  {/* 申报企业 */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {project.companyName}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        {project.fundingStage || '未公开'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      <span>区域：{project.region}</span>
                      <span className="mx-2">·</span>
                      <span>联系人：{project.contact}</span>
                    </div>
                  </div>

                  {/* 核心团队介绍 */}
                  <div className="space-y-2.5 pt-1">
                    <div className="text-xs font-bold text-slate-800">
                      核心团队介绍 ({parsedTeam.length || '多位'}人)
                    </div>

                    {/* Parsed Team Cards */}
                    <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                      {parsedTeam.length > 0 ? (
                        parsedTeam.map((member, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-sm bg-slate-50 border border-slate-200 space-y-1 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{member.name}</span>
                                {member.title && (
                                  <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-sm bg-slate-200 text-slate-800">
                                    {member.title}
                                  </span>
                                )}
                              </div>
                              {member.degree && (
                                <span className="text-[11px] text-slate-500 font-medium">
                                  {member.degree}
                                </span>
                              )}
                            </div>

                            {member.university && (
                              <p className="text-[11px] text-slate-500">
                                毕业院校：<span className="text-slate-700 font-medium">{member.university}</span>
                              </p>
                            )}

                            {member.experience && (
                              <p className="text-xs text-slate-600 line-clamp-3 text-justify leading-relaxed">
                                {member.experience}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 rounded-sm bg-slate-50 border border-slate-200 text-xs text-slate-600 whitespace-pre-line">
                          {project.coreTeam}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- 模块 3：市场竞争与运营分析（内含 9 项维度标签） ---- */}
              {activeModule === 'market' && (
                <div className="space-y-4">
                  {/* Tag Selector */}
                  <div className="flex flex-wrap gap-1.5">
                    {MARKET_TABS.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-2.5 py-1 rounded-sm text-xs transition-all cursor-pointer border ${
                          activeTab === tab.key
                            ? 'bg-slate-900 text-white border-slate-900 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        title={tab.label}
                      >
                        {tab.shortLabel}
                      </button>
                    ))}
                  </div>

                  {/* Active Tab Content Card */}
                  <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                      <h4 className="text-xs font-bold text-slate-900">
                        {MARKET_TABS.find((t) => t.key === activeTab)?.label}
                      </h4>
                    </div>

                    <div className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line pt-1">
                      {activeTab === 'marketAnalysis' && (
                        project.marketAnalysis || '暂无详细产品市场分析数据'
                      )}

                      {activeTab === 'topCustomers' && (
                        <div className="space-y-1.5">
                          <span className="font-semibold text-slate-800 block">合作客户名录与业务往来：</span>
                          <p>{project.topCustomers || '保密或未披露'}</p>
                        </div>
                      )}

                      {activeTab === 'topSuppliers' && (
                        <div className="space-y-1.5">
                          <span className="font-semibold text-slate-800 block">上游核心供应商名录：</span>
                          <p>{project.topSuppliers || '保密或自主研发无需外购'}</p>
                        </div>
                      )}

                      {activeTab === 'domesticRank' && (
                        <div className="space-y-2">
                          <span className="text-slate-500 block">国内市场地位排名：</span>
                          <div className="inline-block px-3 py-1 rounded-sm bg-white text-slate-800 font-bold border border-slate-300 text-sm">
                            {project.domesticRank || '行业前列'}
                          </div>
                        </div>
                      )}

                      {activeTab === 'marketShare' && (
                        <div className="space-y-2">
                          <span className="text-slate-500 block">市场份额占有率：</span>
                          <div className="inline-block px-3 py-1 rounded-sm bg-white text-emerald-800 font-bold border border-emerald-300 text-sm">
                            {project.marketShare ? `${project.marketShare}%` : '快速增长中'}
                          </div>
                        </div>
                      )}

                      {activeTab === 'domesticCompetitors' && (
                        <div className="space-y-1.5">
                          <span className="font-semibold text-slate-800 block">国内主要竞品对标：</span>
                          <p>{project.domesticCompetitors || '暂无主要竞品或行业独家突破'}</p>
                        </div>
                      )}

                      {activeTab === 'intlCompetitors' && (
                        <div className="space-y-1.5">
                          <span className="font-semibold text-slate-800 block">国际竞争对手与对标情况：</span>
                          <p>{project.intlCompetitors || '对标欧美头部厂商，实现国产化自主替代'}</p>
                        </div>
                      )}

                      {activeTab === 'businessModel' && (
                        <div className="space-y-1.5">
                          <span className="font-semibold text-slate-800 block">商业模式及拓展计划：</span>
                          <p>{project.businessModel || '标准化产品销售与行业定制服务'}</p>
                        </div>
                      )}

                      {activeTab === 'riskAndCountermeasure' && (
                        <div className="space-y-1.5">
                          <span className="font-semibold text-slate-800 block">经营风险防范与应对措施：</span>
                          <p>{project.riskAndCountermeasure || '建立完善的供应链安全与知识产权保护机制'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 上 AI智能评审、下 专家评审与打分
            两卡等分右栏高度;内容超出时在卡片内部滚动,页面本身不被右栏撑高
        */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:min-h-0">
          {/* 1. AI评分和评语 (精简): 综合得分、AI评语、核心优势和风控策略 */}
          <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-4 lg:flex-1 lg:min-h-0">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-indigo-700 rounded-2xs" />
                <h3 className="text-base font-bold text-slate-900">AI智能评审</h3>
              </div>

              <button
                onClick={handleRegenerateAi}
                disabled={isGeneratingAi}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAi ? '评测中...' : '重新评估'}</span>
              </button>
            </div>

            {/* 内容区:超出卡片高度时内部滚动 */}
            <div className="space-y-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
              {/* 只展示综合得分 */}
              <div className="bg-slate-50 rounded-sm px-4 py-3 border border-slate-200 flex items-baseline gap-2.5">
                <span className="text-xs text-slate-500 font-medium">综合得分</span>
                <span className="text-3xl font-bold font-mono text-emerald-700 tabular-nums leading-none">
                  {aiReview.overallScore}
                </span>
                <span className="text-xs text-slate-400">/ 100分</span>
              </div>

              {/* AI评语 (精简) */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">AI评语：</span>
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
                  {aiReview.expertReviewSummary}
                </div>
              </div>

              {/* 核心优势 和 风控策略 (精简) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 核心优势 */}
                <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-800 block">
                    核心优势
                  </span>
                  <ul className="text-xs text-slate-700 list-disc list-inside space-y-1 leading-relaxed">
                    {aiReview.keyStrengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* 风控策略 */}
                <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-amber-800 block">
                    风控策略
                  </span>
                  <ul className="text-xs text-slate-700 list-disc list-inside space-y-1 leading-relaxed">
                    {(aiReview.suggestedActions || aiReview.riskWarnings || ['建议完善上下游供应链风险对冲方案']).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 专家评语和分数 (精简): 平均分 + 专家123打分与评语切换 */}
          <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-4 lg:flex-1 lg:min-h-0">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-amber-600 rounded-2xs" />
                <h3 className="text-base font-bold text-slate-900">专家评审</h3>
              </div>

              {/* 精简展示平均分 */}
              <div className="flex items-baseline gap-1.5 bg-slate-50 px-3 py-1 rounded-sm border border-slate-200">
                <span className="text-xs text-slate-600 font-medium">平均分：</span>
                <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                  {avgScoreFormatted}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>

            {/* 内容区:超出卡片高度时内部滚动 */}
            <div className="space-y-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
              {/* 切换标签展示专家123的打分和评语 */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="text-xs font-semibold text-slate-500">评审专家：</span>
                  <div className="flex items-center gap-2">
                    {(['judge1', 'judge2', 'judge3'] as const).map((jKey, idx) => {
                      const label = `专家 ${idx + 1}`;
                      const score = idx === 0 ? project.judge1 : idx === 1 ? project.judge2 : project.judge3;
                      const isActive = activeJudgeTab === jKey;

                      return (
                        <button
                          key={jKey}
                          onClick={() => setActiveJudgeTab(jKey)}
                          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                            isActive
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span>{label}</span>
                          <span className={`font-mono text-xs px-1 rounded-xs ${isActive ? 'bg-slate-800 text-emerald-300' : 'bg-slate-100 text-emerald-700'}`}>
                            {score}分
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Current Selected Judge Score & Comment */}
                <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {activeJudgeTab === 'judge1' && '专家 1 评分及评语'}
                      {activeJudgeTab === 'judge2' && '专家 2 评分及评语'}
                      {activeJudgeTab === 'judge3' && '专家 3 评分及评语'}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500">打分：</span>
                      <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
                        {activeJudgeTab === 'judge1' && project.judge1}
                        {activeJudgeTab === 'judge2' && project.judge2}
                        {activeJudgeTab === 'judge3' && project.judge3}
                      </span>
                      <span className="text-xs text-slate-400">分</span>
                    </div>
                  </div>

                  <div className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify bg-white p-3.5 rounded-sm border border-slate-200">
                    {activeJudgeTab === 'judge1' && (project.comment1 || '符合项目申报条件，建议推进产业化落地与资本对接。')}
                    {activeJudgeTab === 'judge2' && (project.comment2 || '技术方案完整，自主研发壁垒较高，具有较好市场应用空间。')}
                    {activeJudgeTab === 'judge3' && (project.comment3 || '团队结构完整，具备较强转化与工程化实施能力。')}
                  </div>
                </div>
              </div>

              {/* 专家综合推荐理由 */}
              {project.recommendReason && (
                <div className="p-3 rounded-sm bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block">专家组综合推荐意见：</span>
                  <p className="leading-relaxed text-slate-800">{project.recommendReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
