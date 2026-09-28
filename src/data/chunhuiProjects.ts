/**
 * 2026 年春晖杯项目数据。
 *
 * 字段用英文名(原表为中文列名,映射写在下方注释里),避免到处写中文键。
 * 列表只有 5 个展示字段:项目名称 / 所有人 / 院校 / AI 评分 / 排名 —— 原数据里的
 * country、status 暂时不展示,但保留在数据里,以后要加列直接取。
 */

/** 列表行 */
export interface ChunHuiProject {
  id: string;
  name: string;
  owner: string;
  school: string;
  country: string;
  score: number;
  status: string;
  /** 赛道。本批 29 条全部是新材料与先进制造,但字段留着,以后多条赛道直接筛 */
  category: string;
  rank: number;
}

/** 本批项目所属赛道 —— 概览页据此决定哪个赛道标签可点 */
export const CHUNHUI_PROJECT_CATEGORY = '新材料与先进制造';

/**
 * 详情。目前**只有这一个案例**:不管从列表点哪一行,都展示它
 * (产品上是个演示样例,不是真实的结果页)。
 * 原中文列名对照:编号/名称/所有人/团组成员/行业领域/项目进度/是否有专利/院校/国家地区/简介/PDF/AI评语
 */
export interface ChunHuiProjectDetail {
  id: string;
  name: string;
  owner: string;
  teamMembers: string;
  industry: string;
  stage: string;
  hasPatent: string;
  school: string;
  country: string;
  intro: string;
  pdfUrl: string;
  aiComment: string;
}

export const CHUNHUI_PROJECTS: ChunHuiProject[] = [
  { id: 'CH202400216N', name: 'SOLE_相愈', owner: '白伊园', school: '皇家艺术学院', country: '英国', score: 64.1, status: '正常评分', category: '新材料与先进制造', rank: 26 },
  { id: 'CH202600027', name: '石墨烯磁场传感器', owner: '周博文', school: '华盛顿大学在圣路易斯', country: '美国', score: 84.3, status: '正常评分', category: '新材料与先进制造', rank: 10 },
  { id: 'CH202600069', name: '定制化测量仪器', owner: '张烁', school: '约克大学', country: '加拿大', score: 76.5, status: '正常评分', category: '新材料与先进制造', rank: 20 },
  { id: 'CH202600082', name: '仿生防附着材料赋能贝类养殖产业', owner: '卢奕含', school: '乔治华盛顿大学', country: '美国', score: 65.8, status: '正常评分', category: '新材料与先进制造', rank: 25 },
  { id: 'CH202600099', name: '光纤端面超表面偏振器件', owner: '陈林楠', school: '剑桥大学', country: '英国', score: 89.6, status: '正常评分', category: '新材料与先进制造', rank: 3 },
  { id: 'CH202600187', name: '高分子聚合物掺杂纳米级富勒烯和稀土光敏新材料', owner: 'XIAO DENG', school: '匹兹堡大学', country: '美国', score: 68.3, status: '正常评分', category: '新材料与先进制造', rank: 24 },
  { id: 'CH202600194', name: '色芯量子', owner: '徐哲文', school: '苏黎世联邦理工大学（瑞士联邦理工学院）', country: '瑞士', score: 86.8, status: '正常评分', category: '新材料与先进制造', rank: 6 },
  { id: 'CH202600196', name: 'AI化汽车发动机制动控制系统传感器的节能设计与产业化', owner: '陈亮', school: '东京大学', country: '日本', score: 40.8, status: '正常评分', category: '新材料与先进制造', rank: 29 },
  { id: 'CH202600212', name: '激光焊接OCT熔深实时监测设备', owner: '王鹿鹿', school: '南洋理工大学', country: '新加坡', score: 87.5, status: '正常评分', category: '新材料与先进制造', rank: 5 },
  { id: 'CH202600247', name: '高温合金增材制造材料工艺与可靠性验证平台', owner: '魏至成', school: '新加坡国立大学', country: '新加坡', score: 86.8, status: '正常评分', category: '新材料与先进制造', rank: 7 },
  { id: 'CH202600260', name: '循环丝蛋白材料', owner: '孟泽元', school: '华威大学', country: '英国', score: 81.8, status: '正常评分', category: '新材料与先进制造', rank: 16 },
  { id: 'CH202600270', name: '面向无人矿山的重载行走系统全生命周期解决方案', owner: '张南南', school: 'University of Perpetual Help System Dalta', country: '菲律宾', score: 89.6, status: '正常评分', category: '新材料与先进制造', rank: 4 },
  { id: 'CH202600351', name: '工场诊断中小制造企业现场浪费识别与微改善服务', owner: '刘川溥', school: '普渡大学', country: '美国', score: 83.7, status: '正常评分', category: '新材料与先进制造', rank: 15 },
  { id: 'CH202600405', name: '军民两用无人机产业化项目', owner: '张礼彬', school: '谢菲尔德大学', country: '英国', score: 54.1, status: '正常评分', category: '新材料与先进制造', rank: 28 },
  { id: 'CH202600423', name: '数据驱动的高性能合金研发决策工具 —— 让每一次实验都掷地有声', owner: '段翔峰', school: '帝国理工学院', country: '英国', score: 79.8, status: '正常评分', category: '新材料与先进制造', rank: 17 },
  { id: 'CH202600446', name: '热垒科技新型无机固固相变材料项目', owner: '罗凯文', school: '南洋理工大学', country: '新加坡', score: 86.8, status: '正常评分', category: '新材料与先进制造', rank: 8 },
  { id: 'CH202600452', name: '因果硅验 CausalDFx, 面向 First-Silicon 与多芯粒系统的因果干预合成与可信诊断平台', owner: '肖鹏飞', school: '谢菲尔德大学', country: '英国', score: 86.8, status: '正常评分', category: '新材料与先进制造', rank: 9 },
  { id: 'CH202600469', name: '高效能钠离子电池负极材料智能化研发及产业化', owner: '单光存', school: '香港城市大学', country: '中国香港', score: 94.7, status: '正常评分', category: '新材料与先进制造', rank: 1 },
  { id: 'CH202600474', name: '高性能复合材料国产替代突围', owner: '唐宏杨', school: '鲁汶大学', country: '比利时', score: 79, status: '正常评分', category: '新材料与先进制造', rank: 18 },
  { id: 'CH202600526', name: 'SENS-CO：基于纳米级超薄二维半导体膜的室温可穿戴气体智能感知平台', owner: '李然', school: '巴黎理工学院', country: '法国', score: 84.3, status: '正常评分', category: '新材料与先进制造', rank: 11 },
  { id: 'CH202600528', name: '面向湿生物界面的智能水凝胶传感与微针递送系统', owner: '李明', school: '帝国理工学院', country: '英国', score: 84.3, status: '正常评分', category: '新材料与先进制造', rank: 12 },
  { id: 'CH202600537', name: '结晶造粒流化床水质软化装置研发与产业化', owner: '吴金成', school: '伦敦大学皇后玛丽学院（QMUL）', country: '英国', score: 76.5, status: '正常评分', category: '新材料与先进制造', rank: 21 },
  { id: 'CH202600548', name: 'Neuro？AI Reborn——Neurocognitive Recognition Enabled Recycled Aluminum Intelligent Production System', owner: '杨俊泽', school: '（Brest State Technical University）布列斯特国立技术大学', country: '白俄罗斯', score: 84.3, status: '正常评分', category: '新材料与先进制造', rank: 13 },
  { id: 'CH202600554', name: '氮擎科技：高附加值医药与精细化学品电合成平台', owner: '祝宇鹏', school: '新加坡国立大学', country: '新加坡', score: 91.4, status: '正常评分', category: '新材料与先进制造', rank: 2 },
  { id: 'CH202600563', name: 'Coconut-Cycle 基于生物制造的椰子全产业链高值化利用', owner: '侯文政', school: '菲律宾国家大学', country: '菲律宾', score: 70.7, status: '正常评分', category: '新材料与先进制造', rank: 22 },
  { id: 'CH202600593', name: '领能再生-工业再生材料增材制造', owner: '崔璨', school: '剑桥大学', country: '英国', score: 60.8, status: '正常评分', category: '新材料与先进制造', rank: 27 },
  { id: 'CH202600598', name: '光电材料轻量化及产业化', owner: '潘靖邦', school: '巴斯大学', country: '英国', score: 79, status: '正常评分', category: '新材料与先进制造', rank: 19 },
  { id: 'CH202600614', name: '木材钠电池：高性能木质生物质基硬碳负极材料', owner: '张昊', school: '新不伦瑞克大学', country: '加拿大', score: 84.3, status: '正常评分', category: '新材料与先进制造', rank: 14 },
  { id: 'CH202600615', name: '菲律宾离岛"光伏+海水淡化"微网', owner: '李睿', school: '菲律宾克里斯汀大学', country: '菲律宾', score: 69.9, status: '正常评分', category: '新材料与先进制造', rank: 23 },
];

/** 详情演示案例:与列表无关,固定展示 */
export const CHUNHUI_DETAIL_SAMPLE: ChunHuiProjectDetail = {
  id: 'CH202600526',
  name: 'SENS-CO：基于纳米级超薄二维半导体膜的室温可穿戴气体智能感知平台',
  owner: '李然',
  teamMembers: '朱孟可',
  industry: '新材料与先进制造',
  stage: '中试阶段',
  hasPatent: '否',
  school: '巴黎理工学院',
  country: '法国',
  intro:
    'SENS-CO 面向工业安全、城市微环境和个体暴露监测，开发以纳米级超薄二维半导体膜为核心的室温气体智能感知平台。项目采用液相剪切剥离获得可溶液加工单层和少层纳米片，通过界面自组装形成连续10nm超薄均匀半导体敏感膜，敏感膜制备过程绿色低价，无需高温生长或真空沉积；再以金属酞菁进行非共价功能化，利用不同中心金属调控界面电荷转移和气体吸附。当前 CuPc-WS？ 器件在室温下对 0.2 ppm NO？ 的响应达到 58.8%，模型估算检测限为 0.646 ppb，并已完成选择性、循环和湿度影响的初步验证。商业化并非只销售一种 材料，而是以同一超薄半导体膜工艺为底座，通过更换功能分子和器件配置形成可扩展的气体传感产品族；第一阶段推出 NO？ 传感柔性电子设备、随后进行无线通信和算法补偿集成，向 NOx/CO 及多场景可穿戴物联网监测延伸。',
  pdfUrl: 'https://technology-convert-oss.oss-cn-shanghai.aliyuncs.com/chunhuibei/CH202600526.pdf',
  aiComment:
    '项目基于液相剥离WS2纳米片与金属酞菁功能化技术，构建室温超薄气体传感平台，工艺绿色且具备柔性集成潜力。核心创新在于通过分子编程调控界面电荷转移，在0.2ppm NO2下实现58.8%的高响应，理论检测限达ppb级，技术逻辑清晰，具有较好的材料学价值和应用前景。\n\n商业规划采用“材料平台-模组-终端”的分层路径，切入工业安全与环境监测细分市场，符合政策导向。团队依托高校科研资源，分工明确，但项目目前处于极早期筹备阶段，尚未形成独立经营主体，且无专利申请，技术壁垒主要依赖工艺诀窍，法律护城河尚需构建。财务预测基于假设，缺乏历史营收支撑，单位成本分析与盈亏平衡点测算需进一步细化。\n\n主要风险在于从实验室器件到工程样机的转化过程中，批次一致性、封装稳定性及复杂环境下的长期漂移控制。建议下一步重点开展多器件统计验证与真实环境共址测试，明确中试阶段的良率控制指标；同时加快知识产权布局，完善公司化运营架构，以增强投资者信心并推动产业化落地。',
};
