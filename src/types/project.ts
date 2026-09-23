export interface Project {
  id: string;
  companyName: string; // 企业名称
  coreTeam: string; // 核心团队
  contact: string; // 联系人
  keywords: string; // 关键词
  region: string; // 行政区域
  summary: string; // 企业概要
  fundingStage: string; // 融资阶段
  projectName: string; // 参赛项目名称
  projectIntro: string; // 参赛项目介绍
  techInnovation: string; // 产品技术创新点介绍
  techMaturity: string; // 技术成熟性及可靠性论述
  marketAnalysis: string; // 产品市场分析及竞争优势
  topCustomers: string; // 当前五大客户
  topSuppliers: string; // 当前五大供应商
  domesticRank: string; // 市场竞争分析-国内市场地位排名
  marketShare: string; // 市场竞争分析-市场份额占有率
  domesticCompetitors: string; // 国内竞争对手
  intlCompetitors: string; // 国际竞争对手
  businessModel: string; // 商业模式及业务拓展计划
  riskAndCountermeasure: string; // 经营风险与对策
  recommendReason: string; // 推荐理由
  judge1: number | string; // 评委1
  judge2: number | string; // 评委2
  judge3: number | string; // 评委3
  avgScore: number | string; // 均分
  comment1: string; // 评语1
  comment2: string; // 评语2
  comment3: string; // 评语3
  isRecommended: '是' | '否'; // 是否推荐
  category: string; // 赛道分类
  aiReview?: ProjectAiReview;
}

export interface ProjectAiReview {
  overallScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C';
  conclusion: '强烈推荐' | '建议立项' | '优先支持' | '保持观察' | '暂不推荐';
  dimensions: {
    name: string;
    score: number;
    weight: string;
    analysis: string;
  }[];
  expertReviewSummary: string;
  keyStrengths: string[];
  riskWarnings: string[];
  suggestedActions: string[];
  generatedAt: string;
}

export interface ParsedTeamMember {
  name: string;
  gender?: string;
  birth?: string;
  title?: string;
  degree?: string;
  university?: string;
  experience?: string;
  achievements?: string;
}
