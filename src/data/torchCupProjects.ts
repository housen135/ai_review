import { Project, ParsedTeamMember, ProjectAiReview } from '../types/project';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    companyName: '杭州冰柏智能科技有限公司',
    coreTeam: `【姓名 ：朱俊锋; 性别 ：男; 出生年月 ：1986-05-13; 全职 ：是; 职位 ：CEO; 职称 ：中级职称%; 最高学历 ：博士研究生; 留学经历 ：否; 大学生科技企业 ：否; 院士 ：非院士; 创业次数 ：1次; 手机 ：18518913027;教育经历 ：【学历 ：博士研究生; 毕业学院 ：武汉大学; 专业 ：摄影测量与遥感; 毕业时间 ：2014-06-30 ;】
主要工作经历: 2005-2014年武汉大学遥感信息工程学院，师从数字摄影测量奠基人张祖勋院士，博士毕业论文《利用倾斜影像进行三维数字城市重建的关键技术研究》。2014-2016年进入中国测绘科学研究院，主持国产化实景三维建模软件开发。2026至今全职运营冰柏科技。
主要成就: 获得2项省部级科技进步奖，测绘科技进步二等奖，广州市科技进步二等奖，合肥市/杭州市高层次人才；主导核心产品Rusa三维场景还原系统、TrackSight高速目标跟踪、Mirauge3D建模引擎。】;
【姓名 ：曾晓茹; 性别 ：女; 出生年月 ：1987-02-01; 全职 ：是; 职位 ：联合创始人兼CTO; 最高学历 ：硕士研究生; 毕业学院 ：武汉大学; 专业 ：摄影测量与遥感;】;
【姓名 ：郑茂腾; 性别 ：男; 职位 ：联合创始人; 最高学历 ：博士研究生; 毕业学院 ：武汉大学; 地大学者青年优秀人才，在国际期刊发表20余篇论文。】`,
    contact: '武燕清',
    keywords: '计算机视觉、人工智能领域、低空经济、空间智能',
    region: '浙江省 - 杭州市 - 余杭区',
    summary: '冰柏科技是一家专注于计算机视觉与人工智能的技术驱动型企业，依托自主可控的空间智能技术，构建集全域感知、智能决策、高效协同于一体的三维数字底座，赋能低空经济产业升级与智慧化转型。核心产品包括M3D全自动三维建模引擎、Rusa快速三维场景精细还原系统、DS蜂群实时分析系统、TS智能运动分析系统。获阿里巴巴、合肥创新投等头部资本加持。',
    fundingStage: 'A轮',
    projectName: '数空全域智融一体化项目',
    projectIntro: '冰柏科技——空间智能与低空经济领航者。随着低空经济被确立为国家战略性新兴产业，公司打造了覆盖“数据采集—处理—三维建模—智能分析—决策应用”全链路的国产化产品体系：Rusa快速三维场景还原系统实现10分钟闭环撤场，效率提升400%；DroneSwarm蜂群实时分析系统列入军采白名单；低空飞行三维数智平台以“1底座+1平台+N场景”架构构建低空经济时空底座。',
    techInnovation: '一、边缘智能实时三维重建技术：将视觉SLAM算法与摄影测量技术深度融合，在无人机嵌入式平台上实现机上实时二三维重建与目标识别跟踪，成图速度为传统10倍，成本仅为激光建模10%。二、移动端厘米级高精度建模技术：通过普通移动设备拍摄，建模误差小于2厘米，实现“拍摄2分钟+渲染10分钟”。三、亚像素级高速目标跟踪分析技术：实现0.3像素目标锁定，跟踪识别率达99.6%。',
    techMaturity: 'Mirauge3D全自动三维建模引擎已服务近万家客户。Rusa快速三维场景还原系统被公安部列为全国推广方案，服务超6000人，处理事故1.3万余起且实战零复议。TrackSight在国防弹道、汽车安全测试投入使用。DroneSwarm经东部战区实战演练验证列入军采白名单。与华为、海光信息达成深度战略合作推出“快易绘一体机”。',
    marketAnalysis: '产品覆盖智慧交通、低空经济、军用信息化、空间计算四大万亿级赛道。交通领域单点投入较激光方案降90%以上，适配基层中队到省级部署；低空领域提供0.3米正射影像+3厘米实景三维，支持厘米级避障。全自主研发确保底层可控，具备端到端全链路交付能力与全国化服务网络。',
    topCustomers: '1. 南宁市公安局交通管理支队 2. 浙江移动数智科技有限公司 3. 电子科技大学 4. 杭州萧山国际机场有限公司 5. 浙江交科交通科技有限公司',
    topSuppliers: '1. 海康威视 2. 中国联通 3. 金华盛邦网络 4. 江苏极轴时空 5. 河北禾域航空',
    domesticRank: '前3名 / 细分行业领先',
    marketShare: '约 70%（部分细分警用三维勘验场景）',
    domesticCompetitors: '大疆创新、超图软件等',
    intlCompetitors: 'Bentley ContextCapture, Pix4D',
    businessModel: '构建“软件授权+定制化解决方案+云端订阅+运营分成+硬件销售”五维盈利体系。软件授权毛利率>85%；在全国设立分支机构，采取“直分销结合、线上线下联动”渠道策略。',
    riskAndCountermeasure: '技术快速迭代风险：坚持全自主研发与专利保护，武汉大学遥感博士团队领衔；客户集中风险：坚持“交通+军警+低空+行业”四轮驱动分散单一赛道依赖。',
    recommendReason: '公司由武汉大学遥感信息工程博士、测绘科技进步奖获得者朱俊锋创立，张祖勋院士指导，技术底蕴深厚，商业化壁垒明显。',
    judge1: 93.33,
    judge2: 90.94,
    judge3: 90.49,
    avgScore: 91.59,
    comment1: '公司基于核心的边缘三维智能重建技术，面向低空经济新兴产业，构建了较为完善的系统和解决方案，落地标杆客户具有很好的示范左右，具有较好的发展前景。',
    comment2: '公司有一定的技术底蕴，商业化潜力尚可。',
    comment3: '项目团队构建相对成熟，且已形成规模销售，商业化前景可期，产品具有一定的技术壁垒，且已有大机构投资背书。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-02',
    companyName: '云程科技股份有限公司',
    coreTeam: `【姓名 ：高宇; 职位 ：董事长; 最高学历 ：硕士研究生; 毕业学院 ：欧洲商学院; 济南优秀女企业家，新一代信息技术领军人物。】;
【姓名 ：胡立秋; 职位 ：董事长助理; 最高学历 ：硕士研究生; 毕业学院 ：交大 & 法国IPAG商学院 EMBA; 23年工作经验，20年在医药行业SFE及数字化转型。】;
【姓名 ：康樑; 职位 ：总经理; 最高学历 ：硕士研究生; 毕业学院 ：同济大学 MBA; 曾任IBM Consulting生命科学行业合伙人、埃森哲生命科学行业合伙人、Veeva大中华区销售总监。】;
【姓名 ：陈垣毅; 职位 ：AI专家顾问; 博士; 浙大城市学院教授，万人计划青年拔尖人才。】`,
    contact: '高子源',
    keywords: '数据+AI, 医药数据资产, AI应用, 智能化营销, 合规治理, 产业化落地',
    region: '浙江省 - 杭州市 - 西湖区',
    summary: '面向生命健康产业的医药数据资产治理与AI技术应用企业，聚焦药企营销数字化和智能化升级，致力于用“数据+AI”双引擎，解决药企营销管理中数据不准、流向不清、合规压力高等痛点。主要业务涵盖主数据服务、DDI流向数据服务、悟空营销一体化平台。',
    fundingStage: 'A轮正在进行中',
    projectName: '医药数据资产治理与AI技术研发及产业化项目',
    projectIntro: '面向医药行业数据治理、合规运营和智能化升级需求，建设集医药数据资产治理、数据中台、AI智能化应用和产业化服务于一体的垂直行业平台。围绕HCP/HCO主数据、DDI渠道流向数据研发面向医药场景的AI能力模块与智能体，包括AI审计、AI主数据验证、AI申诉、AI奖金、AI数字员工等。',
    techInnovation: '创新点一：医药垂直数据治理与可信资产化技术，建立行业化数据标准与合规留痕；创新点二：多模态感知与融合，解析HCP互动、合同文档等非结构化数据；创新点三：面向药企业务流程的AI Agent架构，多智能体协同；创新点四：向量知识库记忆与持续学习机制；创新点五：数据资产化与AI产品化双向飞轮。',
    techMaturity: '已完成头部药企客户验证，部分客户合作近十年。外资药企包括诺华、拜耳、礼来、武田、阿斯利康、强生等；内资包括正大天晴、豪森药业、恒瑞制药。主数据服务客户40+，HCP覆盖率达99%，客户满意度99%，形成400+标准报告。',
    marketAnalysis: '药企精细化运营与合规监管要求高，需求从单一系统转向数据资产化与智能化平台。云程具备深厚行业Know-how、高质量数据沉淀底座、头部药企供应链资质与AI垂直落地壁垒，相比通用SaaS厂商更具场景适用性与本土合规优势。',
    topCustomers: '1. 北京诺华制药有限公司 2. 礼来苏州制药有限公司 3. 海森生物医药有限公司 4. 江苏豪森药业集团 5. 武田制药',
    topSuppliers: '1. 上海沃橙信息技术 2. 上海艾万哲数字科技等',
    domesticRank: '第3名',
    marketShare: '10%',
    domesticCompetitors: '传统医药CRM/ERP提供商',
    intlCompetitors: 'IQVIA, Veeva Systems',
    businessModel: '“项目交付 + 持续运营服务 + AI产品授权/订阅 + 数据资产化延展”多元收入结构，以直销和大客户经营为主，进入药企合格供应商体系进行交叉增购。',
    riskAndCountermeasure: '技术迭代与市场推广风险：优先选择主数据验证、流向稽核等成熟场景进行研发和试点，分阶段投入确保现金流稳健。',
    recommendReason: '专精特新中小企业，客户均为全球TOP20及国内龙头药企，医药数据资产治理具备极高壁垒与商业化确定性。',
    judge1: 92.62,
    judge2: 90.0,
    judge3: 95.0,
    avgScore: 92.54,
    comment1: '生命健康产业的医药数据资产治理与AI技术应用企业，研发实力扎实。',
    comment2: '财务数据较好，医疗数据资产治理市场空间较大，行业深耕度高。',
    comment3: '该公司所处医药赛道未来发展空间确定性强，企业智能体产品如能持续转化成果，则具备比较大的成长空间。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-03',
    companyName: '赋兴（浙江）数字科技有限公司',
    coreTeam: `【姓名 ：李凯; 职位 ：副总经理兼技术负责人; 最高学历 ：硕士研究生; 毕业学院 ：中国矿业大学; 浙江清华柔性电子技术研究院能源研究所所长。】;
【姓名 ：李涵; 职位 ：副总经理; 最高学历 ：博士研究生; 毕业学院 ：复旦大学; 低空安全与无人机智能辅助决策专业，网联无人机领域连续创业者。】;
【姓名 ：詹奎; 职位 ：董事长; 能源领域连续创业者，曾创办电力工程企业实现合同额近2亿元。】`,
    contact: '马昕怡',
    keywords: '低空经济；人工智能；低空安全智能防护',
    region: '浙江省 - 嘉兴市 - 南湖区',
    summary: '赋兴数科是由浙江清华长三角研究院孵化的低空智能技术研发型企业，国家级高新技术企业、“星耀南湖”领军企业。专注于“低空+AI”系列产品研发，构建起“低空+电力”“低空+能源”“低空+交通”“低空+水利”综合解决方案。',
    fundingStage: 'Pre-A',
    projectName: '天瞰守网面向电网场景的低空安全防护先行者',
    projectIntro: '针对低空经济爆发式增长带来的无人机触碰电网外破隐患，创新构建基于人工智能与软件无线电技术的低空安全智能防护体系。以无源频谱特征为识别入口，以边缘AI为决策核心，实现对低空入侵威胁的精准发现、实时分级与联动处置。',
    techInnovation: '一、无源射频高精度频谱感知：构建“频谱轮廓-设备指纹-数据帧校验-连续航迹匹配”五层核验逻辑，捕获2.4GHz-5.8GHz信号，准确率>99%，90%低级干扰就地过滤；二、自适应动态分级决策智能预警；三、数据驱动的动态热力可视化管控。',
    techMaturity: '终端设备达IP66防护等级，已在浙江、安徽、江西、辽宁等多省市电网场景规模化落地，累计部署超90套，覆盖电力线路超500公里，检测无人机活动超11万次，预防外破事故3996次，线路外破风险下降90%以上。',
    marketAnalysis: '电网低空安防存量与新增市场空间超500亿元，年增速>35%。相较传统雷达与光电方案，具有低成本、无盲区、抗干扰、具备巡检无人机白名单等核心优势。',
    topCustomers: '国家电网有限公司、中国南方电网有限责任公司、国网浙江省电力有限公司',
    topSuppliers: '中国移动通信集团、华为技术有限公司、中国电信集团',
    domesticRank: '电网细分第1名',
    marketShare: '电网防外破细分领域优势领先',
    domesticCompetitors: '烟台欣飞智能系统有限公司 (1.2%)',
    intlCompetitors: 'Citadel Defense (0.9%)',
    businessModel: '构建“硬件销售+软件使用授权+运维与数据服务”三位一体盈利体系，客户年留存率达80%以上。',
    riskAndCountermeasure: '市场低价竞争与回款周期长：打造电力标杆案例形成高门槛资质壁垒，执行分阶段回款与供应链多源备选。',
    recommendReason: '浙江清华长三角研究院孵化，国家高新技术企业，技术指标与场景适配性行业领先。',
    judge1: 92.18,
    judge2: 92.77,
    judge3: 92.12,
    avgScore: 92.36,
    comment1: '团队优秀，聚焦行业需求大，有针对行业痛点的差异化和创新化产品和技术。',
    comment2: '公司已初具规模，团队相对成熟完整，落地成效显著。',
    comment3: '商业模式清晰，产品市场前景良好，知识产权数量及质量良好，团队整体较为优秀。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-04',
    companyName: '浙江八维通空间智能技术有限公司',
    coreTeam: `【姓名 ：郑航; 职位 ：总经理; 博士研究生; 毕业学院 ：浙江大学 计算机(AI方向); 中国消防救援学院客座教授，中国青年创新创业大赛金奖。】;
【姓名 ：马珺潇; 职位 ：首席运营官; 硕士研究生; 毕业学院 ：布里斯托大学; 数字中国创新创业大赛二等奖。】;
【姓名 ：霍然; 职位 ：副总经理; 高级工程师，主持多项超大型政企工程顶层设计。】;
【姓名 ：陈冠宇; 职位 ：AI工程师; 浙大博士在读，发表NeurIPS等多篇顶会论文。】`,
    contact: '马珺潇',
    keywords: '室内空间基础设施, 感知-推演-决策-执行, 室内数据集, 世界模型',
    region: '浙江省 - 杭州市 - 余杭区',
    summary: '面向AI时代的室内空间智能基础设施公司——把室内物理空间变成AI可读、可算、可推演、可执行的数据资产。底层软件全栈自主可控，覆盖消防、水利、城市生命线三大业务线，拥有uBuilder、uTwin、u360、uStudio四大产品线。',
    fundingStage: '天使',
    projectName: '空间语义事件引擎uStudio：从看懂空间到推演物理',
    projectIntro: '面向AI时代的空间智能应用开发平台，让AI从读懂文字图片走向理解和操控物理世界。不同于传统GIS/BIM仅追求几何精度，提出几何空间→语义空间→行为空间的三层升维范式，并作为全国消防人工智能创新应用大赛官方技术底座。',
    techInnovation: '首创三层升维空间建模范式，室内空间首次成为大模型原生介质；自然语言一句话搭建空间应用；“先查定义再动手”的本体契约纪律消除AI物理幻觉；真控制与视觉演示双通道隔离；空间物理世界模型推演火势与人员疏散。',
    techMaturity: '已完成空间数字孪生—空间本体语义—AI推理—3D渲染四层架构贯通，作为全国消防人工智能创新应用大赛官方技术底座，由一线消防员直接调用并实战检验，具备规模化推广的工程基础。',
    marketAnalysis: '室外空间已被高德、百度占据，室内空间占人类87%时间但数字化极低，属于无巨头空白蓝海。结合城市生命线安全工程、韧性城市建设，预算确定性高。',
    topCustomers: '中国消防救援学院、大连消防救援支队、泰州消防救援支队、永州消防救援支队、郧西建筑局、丹江口住建局',
    topSuppliers: '华为、宇树、云深处、五八、智元',
    domesticRank: '细分第1名',
    marketShare: '室内空间语义推演独家领先',
    domesticCompetitors: '传统GIS/BIM厂商、群核SpatialLM',
    intlCompetitors: 'NVIDIA Omniverse, Palantir',
    businessModel: '“标杆案例打信任+平台能力做转化+生态调用做放大”，按空间面积订阅SaaS、私有化部署定制、专业服务及空间算力数据服务。',
    riskAndCountermeasure: '政策资金波动与人员依赖：踩准国家韧性城市安全工程红利，推进订阅与按量计费，将关键经验固化在平台本体中。',
    recommendReason: '浙大博士团队，获数字中国大赛二等奖，全国消防AI大赛官方技术底座，技术原创性极高。',
    judge1: 92.08,
    judge2: 91.0,
    judge3: 92.0,
    avgScore: 91.69,
    comment1: '面向AI时代的室内空间智能基础设施公司，行业极为前沿，技术壁垒极高。',
    comment2: '人才属性好，财务与工程落地数据扎实。',
    comment3: '团队管理经验丰富，执行力强，产品具有通用性与极高想象空间。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-05',
    companyName: '西湖机器人科技(杭州)有限公司',
    coreTeam: `【姓名 ：魏震宇; 职位 ：硬件负责人; 博士研究生; 毕业学院 ：哈尔滨工程大学; 控制科学与工程专业。】;
【姓名 ：何常旭; 职位 ：技术支持负责人; 本科; 主导宁波海曙区灯光区域智能化改造。】;
【姓名 ：黄金宝; 职位 ：技术支持; 物联网工程专业。】;
【实验室背景 ：西湖大学人工智能和机器人领域首个优质成果转化落地项目，机器智能实验室支持。】`,
    contact: '赵静',
    keywords: '具身智能, 通用大脑, 人形全身, 重大原创, 真机数据, 运动操作一体化',
    region: '浙江省 - 杭州市 - 西湖区',
    summary: '国内知名的机器人通用大小脑公司，主攻端到端大小脑具身大模型，是西湖大学人工智能和机器人领域第一个优质成果转化落地项目。小脑方向自研国际首个通用运动专家GAE；通用大脑WR1专注于人形全身运动操作一体化。',
    fundingStage: 'A轮',
    projectName: '全球首个全身统一通用基础大模型',
    projectIntro: 'WR1是人形机器人本体上的大脑，实现机器人运动操作的一体化，提出双预训练架构，实现VLA与世界模型的融合。通过GAE商业化在真实丰富场景（包括户外）中采集大规模高质量真机数据，突破具身智能数据瓶颈。',
    techInnovation: '通用行为专家GAE为重大原创工作；全球首个提出WR1双预训练架构；大脑部分攻克解决聚焦问题的reconvla、映射问题的vla-adapter与世界价值模型，技术指标国际最好。',
    techMaturity: 'GAE时延与动作跟随精度持续优化，目前已商业化并获得大量订单；自研机器人本体稳定性优良；真机运动操作一体化数据采集链路已打通。',
    marketAnalysis: '具身智能进入中美原创技术比拼深水区，人形机器人是走向户外搜集海量多样化数据的终局方向。WR1运动操作一体化方案突破了国内绝大部分公司上下半身分离的局限。',
    topCustomers: '汽车制造厂、3C半导体龙头、科研院所',
    topSuppliers: '精密传动及核心电子器件供应商',
    domesticRank: '国内具身大小脑通用模型前列',
    marketShare: '运动大模型细分领先',
    domesticCompetitors: '智元机器人、宇树科技',
    intlCompetitors: 'Figure AI, NVIDIA GR00T, Boston Dynamics',
    businessModel: 'GAE按License收费与跨本体研发适配收费；WR1+本体提供场景综合解决方案（制造、危险替代、物流）。',
    riskAndCountermeasure: '市场开拓与核心人员风险：西湖大学大力支持，引进资源丰富的商务负责人，并建立完善股权激励。',
    recommendReason: '西湖大学孵化，国际首个通用运动专家GAE，团队学术和技术原创水准顶尖。',
    judge1: 95.01,
    judge2: 96.0,
    judge3: 96.0,
    avgScore: 95.67,
    comment1: '机器人通用大小脑公司，主攻端到端大小脑具身大模型，对标Figure，行业前景极佳，技术含量极高。',
    comment2: '具备深厚资本市场认可，顶尖高校学术与工程复合团队。',
    comment3: '具身智能赛道空间巨大，公司团队成熟，具备明显的先跑优势。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-06',
    companyName: '杭州卓印之心科技有限公司',
    coreTeam: `【姓名 ：俞开文; 职位 ：CEO; 博士研究生; 毕业学院 ：英国纽卡斯尔大学; 前蚂蚁科技AI产品专家、百度智能云AI技术架构师。】;
【姓名 ：蒋筱萌; 职位 ：COO; 硕士研究生; 德国奥格斯堡大学; 前Google(德国)用户体验研究员，联合创立曼孚科技走到A轮。】;
【姓名 ：周阳; 职位 ：CMO; 硕士; 英国格林威治大学 AI建筑仿生自生成; 英国皇家特许建筑师。】`,
    contact: '俞开文',
    keywords: '具身智能、人工智能、合成数据、物理AI',
    region: '浙江省 - 杭州市 - 临安区',
    summary: '卓印智能专注于Physical AI（物理人工智能）数据基础设施，致力于解决具身智能最核心的瓶颈——空间精确数据的获取与生成。自研Terra世界模型、Simulaix生成平台及Chain管理平台，实现采集-生成-训练-交付全栈闭环。',
    fundingStage: 'A轮',
    projectName: '懂物理世界的GenAI数据引擎',
    projectIntro: '解决具身智能“Demo在实验室很漂亮，进真实场景就失效”的行业痛点。通过输出带有精确深度图（Depth Map）和IMU轨迹的数据集，支持长程任务推理。已覆盖120+真实工业场景（制造、农业采摘、酒店服务、安全巡检）。',
    techInnovation: '创新性以真实采集数据为seed生成带有精确深度图+IMU轨迹的合成变体，视觉真实与几何精确统一；Simulaix平台将边缘长尾合成数据成本压缩至真实数据的0.2%；Chain实现数据血缘100%可追溯。',
    techMaturity: '已通过商业化订单充分验证，2026年上半年累计获国内外订单超3000万元，海外订单达200万美金，覆盖东南亚制造、餐饮服务等业务场景。',
    marketAnalysis: '物理AI市场规模预计从2025年814亿美元增长至2032年1.15万亿美元。真实场景数据供给不足1%，空间精确数据是行业最稀缺资源。公司具备先发场景准入排他壁垒与出海优势。',
    topCustomers: '1. Simplifynext Singapore 2. 中国东盟信息港 3. 微筑科技 4. 中昊芯英 5. 弋途科技',
    topSuppliers: '1. 浙江大学计算机创新研究院 2. 浙江省农业科学院',
    domesticRank: '空间精确数据细分第3名',
    marketShare: '10%',
    domesticCompetitors: '光轮智能、无问智科',
    intlCompetitors: 'Scale AI, Parallel Domain',
    businessModel: '项目制（获取现金流+场景准入）→ 产品化（标准化数据集+训练API）→ 平台化（数据飞轮构建壁垒）。',
    riskAndCountermeasure: '技术迭代与合规风险：建立全流程数据合规体系，以商业订单反哺算法迭代，扩大海外MRR。',
    recommendReason: '润苗基金投资，团队技术实力深厚，合成数据技术在具身智能领域商业化确定性高。',
    judge1: 92.1,
    judge2: 90.44,
    judge3: 94.33,
    avgScore: 92.29,
    comment1: '公司聚焦的领域是非常有前景的领域，团队技术实力深厚。',
    comment2: '团队优秀，合成数据前景较好。',
    comment3: '团队优秀，且项目处于目前最热领域，商业化前景极佳。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-07',
    companyName: '杭州灵颜科技有限公司',
    coreTeam: `【姓名 ：刘春宝; 职位 ：首席科学家; 博士; 吉林大学唐敖庆学者领军教授，主持国家863、重点研发计划等20项，联合创办泉智博、黑漫、灵颜三家企业。】;
【姓名 ：赵常屹; 职位 ：CEO; 吉林大学在读博士; 参与人形机器人国家标准编制，持有21项专利。】;
【姓名 ：杨孔华; 职位 ：CTO; 博士; 吉林大学特聘教授、博导，国家博新计划，主攻32自由度微型驱动单元。】`,
    contact: '赵常屹',
    keywords: '仿生人脸机器人；多模态情感交互；具身智能；微型伺服驱动；人形机器人配套',
    region: '浙江省 - 杭州市 - 余杭区',
    summary: '依托吉林大学工程仿生教育部重点实验室产学研转化成立，专注具身仿生人脸情感交互机器人研发、生产与落地的高新技术企业。核心产品灵枢W1为国内首款32自由度动态瞳仁仿生脸。与无锡泉智博、杭州黑漫科技同源协同。',
    fundingStage: '天使',
    projectName: '具身情感交互灵巧脸机器人技术攻关与产业化',
    projectIntro: '解决仿生人脸表情僵硬、音唇同步差、瞳孔静态等行业通病。推出32自由度动态瞳仁仿生人脸灵枢W1，打造FaceSoul Agent四层全栈控制架构，实现音唇眼三通道同步延迟<10ms，情绪识别准确率>90%，规避恐怖谷效应。',
    techInnovation: '首创分层式快反射+大模型认知协同机制；突破32自由度音唇眼三同步与高自由度运控；自研音素-视位映射与CANTsyn硬件方案；自主调配液态仿生硅胶皮肤；硬件自研率超60%。',
    techMaturity: '已完成V1-V3原型迭代并通过A级概念验证；连续稳定交互3小时无宕机；单台装配时长≤8小时，整机成本控制在3万元内；已完成千万元级天使轮融资。',
    marketAnalysis: '高校科研、文旅展馆、商用服务、人形整机配套四大赛道增量明确。海外竞品Ameca售价高达数百万且维护困难，灵颜兼顾高性能与极致性价比，国产替代空间巨大。',
    topCustomers: '浙江大学、乐聚机器人技术有限公司、中国联通集团、中电海康集团有限公司、吉林大学',
    topSuppliers: '无锡泉智博机器人（微型伺服关节）、杭州黑漫科技（微电机）、浙江杭锻精密、深圳杰瑞新材料',
    domesticRank: '高自由度仿生脸细分前列',
    marketShare: '6%',
    domesticCompetitors: '北京松延动力 (22%), 首形科技 (12%), EXrobots',
    intlCompetitors: 'Engineered Arts (Ameca - 24%)',
    businessModel: '“硬件整机销售+软件OTA升级+AI算法授权+行业场景定制”全生命周期服务模式。',
    riskAndCountermeasure: '技术迭代与市场认知：建立“预研+迭代”机制，三方产业生态集采降本，多赛道均衡布局。',
    recommendReason: '吉大教授团队，杭州C类人才领衔，32自由度动态瞳仁仿生脸技术指标国内领先。',
    judge1: 85.0,
    judge2: 82.0,
    judge3: 86.85,
    avgScore: 84.62,
    comment1: '项目是一款具身情感交互灵巧脸机器人，产品技术具有一定领先性，有产业化基础。',
    comment2: '泉智博下游兄弟企业，情感陪伴与商用文旅赛道应用想象空间大。',
    comment3: '创新建立软硬件闭环盈利模式，团队背景优秀。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-08',
    companyName: '杭州没有桌子人工智能科技有限公司',
    coreTeam: `【姓名 ：宋健; 职位 ：CEO; 本科; 前阿里/腾讯高级产品专家，连续创业者，创办多准数据并在英上市退出，智谱AI解决方案负责人。】;
【姓名 ：王仿; 职位 ：CTO; 硕士; 前智谱AI副总经理、阿里高级算法专家，拥有10余项AI发明专利。】;
【姓名 ：王晓东; 职位 ：技术VP; 硕士; 前智谱AI技术总监、字节跳动技术专家。】;
【姓名 ：尤志强; 职位 ：AI营销线产研总经理; 硕士; 前智谱AI大模型算法专家，持有26项授权发明专利。】`,
    contact: '林红梅',
    keywords: 'AI智能体, AI原生组织, 自研Agent Infra, 实战型',
    region: '浙江省 - 杭州市 - 西湖区',
    summary: 'NoDesk AI是专注企业级行动式AI智能体（AI Agent）的高新科创企业，聚焦AI原生组织与智能化生产力赛道。核心团队源自腾讯、阿里、智谱AI、字节跳动，已完成近亿元Pre-A轮融资。打造DeskClaw全能AI同事与Agent Infra底座。',
    fundingStage: '天使 / 天使+',
    projectName: 'DeskClaw企业版（企业级Agent Infra平台）',
    projectIntro: '让AI进入生产现场：企业级Agent Infra与行业应用平台。解决企业Agent从Demo走向真实生产环境的工程关、业务关、协同关。对接ERP、CRM、OA，实现多智能体协同长链路任务自主执行、断点续传、可视化审计与权限管控。',
    techInnovation: '针对工程关打造企业级Agent Runtime与治理观测体系；针对业务关提供业务转译工具与Agent Solution样板间；针对协同关实现企业知识、Skill和工具组件化统一治理；支持私有化本地部署。',
    techMaturity: '已在AI营销增长、工矿电力质检、船舶轨迹识别、DR影像判断等场景验证，具备高准确率、高可控性、安全治理与可观测性生产标准。',
    marketAnalysis: '企业从“试模型”转向“用Agent完成真实业务”，中大型企业对跨系统、带判断、有责任边界的Agent Infra需求急剧上升。',
    topCustomers: '杭州联众医疗、上海中天新辰影视、浙江荣腾信息、可口可乐饮料（上海）、山东麦富迪贸易',
    topSuppliers: '北京火山引擎科技有限公司、杭州火山引擎科技有限公司',
    domesticRank: '第2名',
    marketShare: '80%（相关细分头部落地场景渗透）',
    domesticCompetitors: '传统RPA厂商、开源Agent Builder',
    intlCompetitors: 'LangChain, CrewAI, AutoGen',
    businessModel: '“平台授权 + Agent Solution场景包 + 实施共创 + 持续运营服务”，兼顾私有化部署与长期订阅收益。',
    riskAndCountermeasure: '大模型适配与技术迭代：分层解耦架构兼容主流模型；深耕垂直行业场景壁垒，本地隔离部署保障数据合规。',
    recommendReason: '核心团队来自腾讯、阿里、智谱AI，创始团队极其豪华，完成近亿元Pre-A轮融资。',
    judge1: 82.0,
    judge2: 94.2,
    judge3: 91.65,
    avgScore: 89.28,
    comment1: '创始班底顶级，有对应经验和技术支撑，以及成熟的市场化经验和融资经验。',
    comment2: '项目为行业名企的高管团队创业，已获得专业机构投资支持。',
    comment3: '大厂骨干创业，切入企业级Agent落地真实痛点，工程化落地能力强。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-09',
    companyName: '杭州金口良策科技有限公司',
    coreTeam: `【姓名 ：周远贵; 职位 ：CEO; 前阿里巴巴-口碑资深产品专家(P9)、哈啰出行产品专家委员会委员长，拥有二十余年产品与系统经验。】;
【姓名 ：王江; 职位 ：CTO; 拥有19年高并发系统架构与工程技术管理经验，曾任二维火技术总监、恒生电子高级工程师。】;
【姓名 ：孙祖峰; 职位 ：总工程师; 博士; 浙江大学岩土工程工学博士，高级工程师，从事风电光伏工程咨询10年。】`,
    contact: '褚惠玲',
    keywords: '良策金宝AI, 电力工程AI, CAD图纸模型, 工程大模型, 智能审图',
    region: '浙江省 - 杭州市 - 余杭区',
    summary: '国家高新技术企业，国内唯一同时自研工程行业大模型（70亿tokens工程语料）和CAD图纸模型的AI企业，已通过华为昇腾技术认证与国家网信办算法备案。覆盖AI规范问答、AI文档生成、AI图纸生成、AI图纸识别、AI智能审核五大闭环。',
    fundingStage: '天使',
    projectName: '良策金宝AI——电力工程智能体应用平台',
    projectIntro: '专注于电力工程设计全链路智能化，解决工程设计文档编制耗时、规范检索困难、CAD制图繁重等痛点。已在国家电网、国家电投、中机国能等落地应用，是业内首个可签字交付的电力工程设计AI平台。',
    techInnovation: '双自研模型底座：70亿token工程大模型+CAD图纸专用模型；AI图纸生成智能排布寻优算法；AI图纸识别分而治之+交叉纠错识别率达99.12%；AI智能审核文档图纸双链路交叉引用校验。',
    techMaturity: '中机国能光伏可研效率提升100倍（15人天压缩至30分钟）；国网浙江经研院变电站图纸审核效率提升10倍，复核交付准确率100%；海纳宁源设计周期缩短70%。已获16项软著，通过华为昇腾认证。',
    marketAnalysis: '国资委要求2027年底前央企100%完成国产化替代，研发设计类软件被列入关键替代名单。电力工程年投资1.78万亿元，设计软件潜在市场百亿级。设计院AI综合渗透率不足30%，存在显著窗口。',
    topCustomers: '国家电网（浙江经研院）、国家电投、中机国能浙江工程有限公司、海纳宁源/国家电网杭州院、中国联合工程有限公司',
    topSuppliers: '核心技术均为自主研发，全栈国产适配',
    domesticRank: '电力工程AI设计审图细分第1名',
    marketShare: '行业首创双模态闭环平台',
    domesticCompetitors: '广联达、道亨软件、博微',
    intlCompetitors: 'Autodesk, Bentley Systems',
    businessModel: '“SaaS订阅服务 + 项目定制开发 + 本地私有化部署”三层漏斗商业模式。',
    riskAndCountermeasure: '设计院采购周期长：以标杆客户实际成果建立行业信任，推行轻量SaaS试用，保持研发投入占比50%以上。',
    recommendReason: '国内唯一自研工程行业大模型+图纸模型，已服务中机国能、国家电网等，估值1.63亿元。',
    judge1: 90.58,
    judge2: 91.0,
    judge3: 91.12,
    avgScore: 90.9,
    comment1: '电力行业大模型和工程图纸模型的AI企业，团队行业经验丰富，市场需求明确。',
    comment2: '垂直在电力工程行业，有上下游企业投资，商业化尚可。',
    comment3: '针对工程及电力领域做AI落地应用，发展空间较大且具备先发优势。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-10',
    companyName: '浙江智臾科技有限公司',
    coreTeam: `【姓名 ：周小华; 职位 ：CEO; 博士研究生; 毕业学院 ：美国德雷克塞尔大学; 曾任摩根士丹利量化策略师、巴克莱资本量化工程师，发表论文30余篇。】;
【姓名 ：隋鹏飞; 职位 ：产品研发总监; 硕士; 浙江大学; 前华为软件开发高级工程师，主导TSDB存储引擎与分布式系统。】;
【姓名 ：程训焘; 职位 ：研发副总监; 博士; 南洋理工大学; 前阿里PolarDB Serverless核心研发成员。】`,
    contact: '朱书凝',
    keywords: '高性能时序数据库, DolphinDB, 实时智能平台, 批流一体, 国产信创',
    region: '浙江省 - 杭州市 - 萧山区',
    summary: '以高性能分布式时序数据库为核心技术的国家级高新技术企业、浙江省专精特新中小企业、准独角兽企业。DolphinDB稳居DB-Engines全球时序数据库前五、国产时序数据库第一，首批通过国家安全可靠测评。服务近两百家头部企业。',
    fundingStage: 'B轮',
    projectName: 'DolphinDB：企业级实时智能平台',
    projectIntro: '完全自主研发的高性能分布式时序数据库，核心代码自研率>95%。统一管理时序、关系、文本、向量等多模态数据，内置低延迟流计算引擎，支撑毫秒级高频金融交易、物联网实时预警与AI智能体计算。',
    techInnovation: '存算一体与流批一体融合架构；基于LSM-Tree自研TSDB存储引擎与低延时流计算；微秒级响应；MPP分布式并行计算；写入吞吐为InfluxDB的10.7倍，磁盘占用仅为其1/96。',
    techMaturity: '自2016年研发至今稳定运行近十年，通过工信部信通院专项评测与国家安全可靠测评。服务头部券商渗透率超90%，头部公募资管超80%，客户年续约率超120%，2025年ARR近5500万元，已实现盈利。',
    marketAnalysis: '金融高频量化与工业物联网海量时序数据激增，国家关键基础设施信创替代迫切。DolphinDB在核心性能与企业级生态上全面对标并超越国际巨头。',
    topCustomers: '中信证券、中国银河证券、华泰证券、中金公司、招商银行、南方电网、长江电力、比亚迪、中国航天',
    topSuppliers: '戴尔(中国)、启帆信息科技、杭州豪营科技',
    domesticRank: '国产时序数据库第1名，全球前五',
    marketShare: '金融量化头部机构超80%渗透率',
    domesticCompetitors: 'TDengine',
    intlCompetitors: 'InfluxDB, Kdb+, TimescaleDB',
    businessModel: '标准化软件年度订阅授权为主（按节点/CPU计费），永久授权+维保为辅，搭配高级AI组件与开发者生态。',
    riskAndCountermeasure: '通过全栈国产CPU（龙芯、鲲鹏、海光）及统信麒麟OS全面适配，自动化与混沌测试保障高可用，员工持股深度绑定。',
    recommendReason: '国产时序数据库第一，准独角兽，亿元级B轮融资，技术指标全球领先，财务表现优异。',
    judge1: 95.0,
    judge2: 91.0,
    judge3: 90.0,
    avgScore: 92.0,
    comment1: '高性能分布式时序数据库企业，DolphinDB目前国际位列前十，为国产时序数据库第一名，行业地位卓越。',
    comment2: '具备深厚资本市场和行业市场认可，客户均为大型金融与能源龙头。',
    comment3: 'AI应用赛道处于关键卡位时期，公司下游付费能力极强，持续成长性优秀。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-11',
    companyName: '嘉兴允智信息技术有限公司',
    coreTeam: `【姓名 ：王成; 职位 ：董事长; 博士; 法国斯特拉斯堡大学; 中科院空天院研究员，国家万人计划、科技部创新领军人才。】;
【姓名 ：马国斌; 职位 ：总经理; 博士; 北京师范大学; 浙江工商大学副教授，深耕3S技术近30年。】;
【姓名 ：鲁琴; 职位 ：副总经理; 硕士; 南开大学; 前金华金茂公关主管。】`,
    contact: '马国斌',
    keywords: '激光雷达, 地理信息系统, 多模态大模型, 智能导盲, 具身智能',
    region: '浙江省 - 嘉兴市 - 南湖区',
    summary: '由国家万人计划专家及留学人员创办的高新技术企业，入选绍兴“名士之乡”英才计划。拥有“1+N+N+N”产品体系，将高端激光雷达点云信息处理技术降维应用于视障出行与智慧行业。',
    fundingStage: '天使',
    projectName: '蝙蝠侠-面向具身智能的AI多模态视障出行伴侣',
    projectIntro: '面向全国1731万视障群体，耦合手机LiDAR、计算机视觉与多模态大模型，打造软硬件矩阵，实现避障（5米内厘米级识别凹陷/悬挂/凸起）、导航、识物、找物四大场景，并通过蓝牙控制导盲机器人或眼镜。',
    techInnovation: '硬件降维与厘米级精准感知（不受光线影响）；多模态大模型深度融合语义理解；首创“导航+避障”双模并行架构；极简无障碍交互设计。',
    techMaturity: '已登录苹果App Store及主流应用商店，在iOS端大规模部署，与保益、点明等读屏软件完成兼容互认，获得浙江残联及盲协认可支持。',
    marketAnalysis: '全国视障人群巨大，传统盲杖与纯视觉方案痛点明显。激光雷达与大模型结合开辟无障碍科技全新蓝海，兼具极高社会公益价值与市场潜力。',
    topCustomers: '苹果App Store渠道用户、浙江残联及盲协、无障碍生态读屏厂商、视障自媒体从业群体',
    topSuppliers: '高德地图、深圳嘉立创、南京芯视界微电子、伟众信电子',
    domesticRank: '第3名',
    marketShare: '20%',
    domesticCompetitors: '传统导盲杖及视觉识别工具',
    intlCompetitors: 'OrCam, Envision Glasses',
    businessModel: '线上C端订阅与广告，线下智能硬件销售，对接残联等政府机构集中采购。',
    riskAndCountermeasure: '硬件依赖与变现瓶颈：同步研发轻量化纯视觉算法拓宽中低端手机兼容，采取B/G端反哺C端模式。',
    recommendReason: '中组部国家万人计划、科技部创新领军人才项目，技术产品社会价值极高，已实现规模化应用。',
    judge1: 92.79,
    judge2: 94.09,
    judge3: 95.12,
    avgScore: 94.0,
    comment1: '公司面向视障群体及行业痛点，较为精准地打造了具有创新性的软硬件系统，应用前景好。',
    comment2: '产品社会价值显著，且已实现规模化销售，团队整体优秀。',
    comment3: '产品商业化程度颇高，技术壁垒与公益属性双优。',
    isRecommended: '是',
    category: '新一代信息技术'
  },
  {
    id: 'proj-12',
    companyName: '杭州碳友科技有限公司',
    coreTeam: `【姓名 ：王佳明; 职位 ：创始人; 毕业学院 ：南京农业大学; 浙江省乡村振兴共富青年先锋。】;
【姓名 ：林锘; 职位 ：专业人员; 浙江大学硕士在读;】;
【姓名 ：廖星怡; 职位 ：核心技术员; 杭州师范大学硕士在读;】`,
    contact: '王佳明',
    keywords: 'AI数字经济, 智慧农业, 农产品溯源, 助残助农',
    region: '浙江省 - 杭州市 - 余杭区',
    summary: '专注AI数字经济与智慧农业融合创新的科技企业，自研数字化生态农业集成系统，针对农村农户、残疾人群体打造轻量化、低门槛数字创业增收方案。',
    fundingStage: '无融资经历',
    projectName: 'OPC赋能乡村',
    projectIntro: '通过自研数字化生态农业集成系统与AI农产品产销匹配平台，打通农产品国内及跨境电商外销渠道，帮扶农村农户、残疾人群体低成本就业创业。',
    techInnovation: 'AI农产品产销匹配算法、数字化生态农业集成平台、轻量化操作界面。',
    techMaturity: '处于前期开发与试用阶段，主要依托电商平台和公众号运营。',
    marketAnalysis: '乡村振兴助农方向广阔，但模式偏向传统电商运营与劳务中介，技术护城河偏低。',
    topCustomers: '企业，高校，个人，政府',
    topSuppliers: '小农户，平台企业',
    domesticRank: '其他',
    marketShare: '较小',
    domesticCompetitors: '传统农产品电商平台',
    intlCompetitors: '无',
    businessModel: '电商代运营分成、培训服务费与软硬件销售。',
    riskAndCountermeasure: '加强技术研发，规范内部管理流程。',
    recommendReason: '自研AI农产品产销匹配系统，省乡村振兴共富青年先锋，团队年轻有热情。',
    judge1: 65.46,
    judge2: 61.08,
    judge3: 64.77,
    avgScore: 63.77,
    comment1: '电商运营平台，模式偏传统。',
    comment2: '各方面作为科技创新项目都不太合适，缺乏核心硬科技壁垒。',
    comment3: '虽然团队成员学历背景较高，但产品不具有核心竞争技术，市场化能力欠缺。',
    isRecommended: '否',
    category: '新一代信息技术'
  },
  {
    id: 'proj-13',
    companyName: '杭州祐全科技发展有限公司',
    coreTeam: `【姓名 ：张竹林; 职位 ：董事长; 中南财经政法大学EMBA; 浙江省餐饮协会副会长，深耕食药大健康30年。】;
【姓名 ：郑宏弟; 职位 ：CEO兼CTO; 杭州电子科技大学; 高级工程师，20年AIoT从业经验。】;
【姓名 ：陈纪兵; 职位 ：副总经理兼技术总监; 南京解放军理工大学; 高级工程师。】`,
    contact: '刘雪婷',
    keywords: '食安数字监管, 智能商厨, 营养大模型, AIoT数字底座',
    region: '浙江省 - 杭州市 - 余杭区',
    summary: '中国智慧食安整体解决方案商，国家高新技术企业、浙江省专精特新企业，杭州亚运会食品安全及餐饮运行保障服务商。业务覆盖全国20多个省市，服务校园、医院、餐饮企业。',
    fundingStage: 'A轮',
    projectName: '营养大模型驱动的健康服务平台',
    projectIntro: '依托AIoT数字食安底座，构建“垂直大模型+智能体+终端设备”体系，提供智能合规审查、营养学知识图谱个性化配餐、多模态后厨风险视觉防控与语音交互服务。',
    techInnovation: '法规智能体自动化合同解析；营养学图谱推荐；视觉多模态后厨违规行为识别（mAP 92%）；模型蒸馏适配国产边缘设备。',
    techMaturity: '历经9年迭代，服务110万+企业用户，保障杭州亚运会食品安全无故障运行，参与多项国家地方标准制定。',
    marketAnalysis: '智慧餐饮渗透率仅10%，校园食品安全与阳光厨房政策推动力强。但在营养大模型方面面临技术创新与商业转化的双重考验。',
    topCustomers: '浙江省教育厅、浙江省市场监管局、亚运会亚组委、浙江大学、浙大一附院',
    topSuppliers: '杭州多协信息技术、广东互视达电子等',
    domesticRank: '第1名（食安智慧监管）',
    marketShare: '24.6%',
    domesticCompetitors: '传统商厨设备商、智慧食堂服务商',
    intlCompetitors: '无',
    businessModel: '企业买服务、政府买服务、供应链金融服务、运营商合作分成与设备销售。',
    riskAndCountermeasure: '加强与高校联合实验室合作，深耕垂直场景知识图谱。',
    recommendReason: '专精特新中小企业，在食安物联网领域积累扎实。',
    judge1: 84.52,
    judge2: 82.98,
    judge3: 73.37,
    avgScore: 80.29,
    comment1: '公司在餐饮数字化方面有较为深厚积累，但本次申报的“大模型驱动健康服务”上未见具有竞争优势的核心自研模型能力。',
    comment2: 'AI应用项目，商业化潜力尚可，团队完整。',
    comment3: '24-25年未见明显的新大模型产品收益，创新性及落地性有待持续观察。',
    isRecommended: '否',
    category: '新一代信息技术'
  },
  {
    id: 'proj-14',
    companyName: '杭州司南智能技术有限公司',
    coreTeam: `【姓名 ：欧丹林; 职位 ：总经理; 硕士研究生; 浙江大学; 20余年先进过程控制APC专家，获全国首届化工AI大赛特等奖。】;
【姓名 ：张居宾; 职位 ：工程部经理; 浙江大学; 17年横跨化工工艺与智能控制经验。】;
【姓名 ：柴俊沙; 职位 ：研发部经理; 杭州电子科技大学; 10+年APC工业级上位机系统架构经验。】`,
    contact: '杨雪',
    keywords: '非线性模型预测控制, EMPC, 实时优化RTO, 煤化工智能制造, 预测大模型',
    region: '浙江省 - 杭州市 - 钱塘区',
    summary: '专注于流程工业装置级“一体化智能系统”的高新技术企业，以“AI+机理”双核驱动，聚焦先进过程控制（APC）与实时优化（RTO）领域，服务上海赛科、镇海炼化、云天化等头部化工装置。',
    fundingStage: '无',
    projectName: '基于预测大模型的煤制氢实时优化系统研发与应用',
    projectIntro: '全球首次将先进过程控制、实时优化技术、AI大模型技术、配煤优化策略及工艺机理深度结合，构建煤制氢（气化）实时优化系统，降低煤耗1.33%，年节约成本逾千万元，荣获全国首届化工AI大赛唯一特等奖。',
    techInnovation: '沉淀华东理工大学40年气化反应综合机理模型；非线性模型预测控制（EMPC）自适应煤质多变；机理AI融合“河伯”求解器克服模型不收敛问题。',
    techMaturity: '在云天化大为制氨、贵州磷化、中安联合等企业完成从1到3的验证与竣工验收，已迈入成熟推广阶段。与华为油气矿山军团达成战略推广合作。',
    marketAnalysis: '全国日耗煤千吨的气化炉超1000台，总市场空间百亿元。属于典型高壁垒场景，但客户多为国企，立项和回款周期长，资金垫付压力大。',
    topCustomers: '云天化、中移集成、石化盈科、大榭石化、贵州磷化',
    topSuppliers: '浙江旭鑫信息、贵州广电五舟等',
    domesticRank: '煤化工先进优化前列',
    marketShare: '气化优化细分领先',
    domesticCompetitors: '中控技术 (35%)',
    intlCompetitors: 'Aspen Technology (5%)',
    businessModel: '与工艺机理深度绑定的智能化软件产品交付与运维服务，依托华为销售网络推广。',
    riskAndCountermeasure: '现金流压力大与交付周期长：优先承接有预付款的优质项目，引入地方产业耐心资本支持。',
    recommendReason: '专精特新中小企业，荣获全国首届化工AI大赛唯一特等奖，机理+AI结合扎实。',
    judge1: 86.0,
    judge2: 70.0,
    judge3: 86.0,
    avgScore: 80.67,
    comment1: '在化工流程优化领域有较强技术，团队具有大厂背景。',
    comment2: '市场竞争激烈，大厂垄断严重，回款周期制约规模化。',
    comment3: '行业准入门槛高，产品技术不错但市场化复制与扩张风险较高。',
    isRecommended: '否',
    category: '新一代信息技术'
  },
  {
    id: 'proj-15',
    companyName: '杭州捷途慧声科技有限公司',
    coreTeam: `【姓名 ：曹迪; 职位 ：技术总监; 博士; 英国斯特拉斯克莱德大学; 浙江工业大学讲师，无线传感器与通信专家。】;
【姓名 ：叶增荣; 职位 ：总经理; 浙江树人学院; 前清华文通浙江负责人，公安部语音标准制定参与者。】;
【姓名 ：陈文鹏; 职位 ：首席架构师; 郑州大学; 前捷通华声软件研发工程师。】`,
    contact: '汪伊',
    keywords: '智能语音, ASR, OCR图像识别, 司法办案, 国产化适配, 行业大模型',
    region: '浙江省 - 杭州市 - 余杭区',
    summary: '专注智能语音、OCR识别、自然语言理解等AI技术研发的人工智能解决方案商，深耕公安、检察院、法院、纪检监察等政法数字化场景，参与多项语音行业标准制定。',
    fundingStage: '无',
    projectName: '“慧脑”智能语音行业大模型',
    projectIntro: '融合语音识别（ASR）与大语言模型（LLM），专攻公检法谈话、讯问笔录制作、会议纪要生成与案件事实提取，准确率达98%以上，研制便携式软硬件一体化谈话审讯终端。',
    techInnovation: '针对公检法专属语料优化ASR引擎，抗噪能力强；软硬件一体化低功耗便携设备；全栈适配龙芯、飞腾、华为麒麟国产信创环境。',
    techMaturity: '已在多家政府纪委、公安、仲裁院长期使用，纪检监察细分领域市场占有率达60%，软硬件运行成熟稳定。',
    marketAnalysis: '政法语音市场容量较垂直，面临科大讯飞、汉王等行业巨头的直接竞争，横向拓展泛行业门槛高。',
    topCustomers: '海康、大华、天地伟业、烽火、浪潮及各地政法机关',
    topSuppliers: '宝德、华鲲振宇、华为、飞腾、统信软件',
    domesticRank: '纪检便携语音细分第1名',
    marketShare: '60%（纪检细分便携设备）',
    domesticCompetitors: '科大讯飞、捷通华声',
    intlCompetitors: 'Nuance',
    businessModel: '标准化软件授权 + 便携硬件终端销售 + 运维定制开发。',
    riskAndCountermeasure: '市场开拓受阻与巨头挤压：深耕政法特定行业术语库壁垒，加强软硬件一体化定制。',
    recommendReason: '专精特新中小企业，纪检审讯便携识别设备市占率高。',
    judge1: 70.45,
    judge2: 86.0,
    judge3: 81.15,
    avgScore: 79.2,
    comment1: '基于人工智能技术的语音识别项目，公检法场景有应用，但领域有巨头在先，大规模扩张受限。',
    comment2: '公司销售利润数据尚可，与下游客户绑定较深。',
    comment3: '竞品较多，技术泛化难度大，营收爆发性成长较难。',
    isRecommended: '否',
    category: '新一代信息技术'
  },
  {
    id: 'proj-16',
    companyName: '杭州长苏生物科技有限公司',
    coreTeam: `【姓名 ：梅宇钦; 职位 ：董事长; 博士; 浙江大学药理学; 负责一项生物制品获批美国FDA临床试验许可。】;
【姓名 ：李远胜; 职位 ：CEO; 米兰理工大学硕士; 历任贝恩、平安、复星等高管，超20年投并购与管理咨询经验。】;
【姓名 ：余贤斌; 职位 ：联合创始人; 博士; 中科院上海生科院，芝加哥大学博士后，在Science等发表论文。】;
【姓名 ：蔡宗原 / 方锦豪; 职位 ：算法架构; 英国诺丁汉大学计算神经科学与AI硕士。】`,
    contact: '梅宇钦',
    keywords: '多智能体, 生物医药, 黑灯实验室, AI制药, 文献挖掘',
    region: '浙江省 - 杭州市 - 钱塘区',
    summary: '专注于AI多智能体平台在生物医药领域应用的科技型初创公司，旨在打造“Agent Workforce+生物模型+黑灯实验室”新型组织形态，为医生与科研人员提供临床科研服务。',
    fundingStage: '天使',
    projectName: 'Bio-Discovery多智能体平台在生物医药领域的应用',
    projectIntro: '统一处理细胞图像、视频、生物序列、分子结构等跨模态数据，多智能体协同调度医学文献挖掘、临床数据治理、科研设计与统计分析，提升科研转化效率。',
    techInnovation: '多智能体协同调度与垂直大模型微调；“数据智能层-多智能体调度层-临床科研应用层”三级架构；医疗数据脱敏合规化工艺。',
    techMaturity: '核心算法与系统模块完成内测与小规模科研场景测试，正处于早期孵化验证阶段。',
    marketAnalysis: 'AI+生物医药赛道热度高，但英矽智能、晶泰科技等头部企业已完成巨额融资与先发布局，初创公司突围难度较大。',
    topCustomers: '嘉兴大学、浙江大学、浙江理工大学等潜在科研机构',
    topSuppliers: '华为云、百度智能云、腾讯云、火山引擎',
    domesticRank: '初创探索阶段',
    marketShare: '处于起步期',
    domesticCompetitors: '晶泰科技、深势科技、英矽智能',
    intlCompetitors: 'Insilico Medicine, Recursion',
    businessModel: '平台年费订阅、场景定制研发服务费、黑灯实验室测试服务费。',
    riskAndCountermeasure: '紧跟医疗合规监管，严控项目预算与现金流。',
    recommendReason: '芝加哥/斯坦福顶尖高校背景硕博团队，AI制药多模态平台概念前沿。',
    judge1: 88.5,
    judge2: 84.9,
    judge3: 85.68,
    avgScore: 86.36,
    comment1: '产品定位明确，团队配置合理，但该赛道已跑出头部龙头，需明确自身差异化优势。',
    comment2: '创始人产业背景强，处于早期需大额资金支持。',
    comment3: 'AI生物模型是一个长期方向，但研发不确定性大、商业转化周期长。',
    isRecommended: '否',
    category: '新一代信息技术'
  },
  {
    id: 'proj-17',
    companyName: '台州墨耕科技有限公司',
    coreTeam: `【姓名 ：阮小乐; 职位 ：技术总负责人; 博士; 浙江省特支计划领军人才、国家级技能大师工作室领衔人，持专利100余项。】;
【姓名 ：阮圣栋; 职位 ：总经理; 本科; 带领企业年产值突破3000万元。】;
【姓名 ：冷东旭; 职位 ：技术总监; 自动化本科，主导动态外骨骼与神经渲染工程化。】`,
    contact: '阮小乐',
    keywords: 'AI数字人, 动态外骨骼建模, 光场神经渲染, 多模态交互, 无人直播',
    region: '浙江省 - 台州市 - 温岭市',
    summary: '专注高端AI数字人系统研发、定制与落地交付，面向政企、文旅、电商、医疗等行业提供软硬件一体机与虚拟交互方案，年产值3000万元以上，百度、阿里、美团服务商。',
    fundingStage: '天使',
    projectName: '面向全场景智能交互的高端AI数字人系统研究与应用',
    projectIntro: '自研一体化AI数字人交互软硬件矩阵，搭载动态外骨骼建模系统与光场神经渲染，实现7×24小时无人直播、政务引导、文旅讲解，降低真人人力成本70%以上。',
    techInnovation: '动态外骨骼自适应体态建模；轻量化光场神经渲染，普通一体机即可流畅运行；多模态一体化认知引擎；软硬件一体化机身集成结构。',
    techMaturity: '已服务百度、美团、文旅景区落地数百套设备，7×24小时连续运行稳定，年产值3000万元。',
    marketAnalysis: '数字人赛道竞争极其激烈，面临百度、腾讯、商汤、硅基智能等巨头及海量中小工作室的价格战，行业技术门槛逐渐扁平化。',
    topCustomers: '百度智能云、美团电商事业部、某市政务服务中心、本地文旅集团、连锁综合医院',
    topSuppliers: '京东方（显示屏）、奥比中光（3D传感）、瑞芯微电子（算力主板）、歌尔股份（麦克风）',
    domesticRank: '交互数字人细分前列',
    marketShare: '0.45%',
    domesticCompetitors: '硅基智能、魔珐科技、商汤科技',
    intlCompetitors: 'Synthesia, HeyGen',
    businessModel: '“硬件终端销售 + 软件定制知识库 + 年度技术运维”三重盈利模式。',
    riskAndCountermeasure: '算法备案合规管理，差异化轻量一体机错位竞争，避免与大厂陷入云端大模型价格战。',
    recommendReason: '浙江省特支计划领军人才，已有千万级年产值，软硬件一体化交付成熟。',
    judge1: 61.0,
    judge2: 71.5,
    judge3: 76.66,
    avgScore: 69.72,
    comment1: '技术团队与项目需求存在一定错配，数字人赛道竞争惨烈，对无底层大模型壁垒的新进入者窗口正在收紧。',
    comment2: '提出了软硬件方案，但技术独创性一般。',
    comment3: '数字人行业红海竞争，核心门槛不高，抗巨头冲击能力有限。',
    isRecommended: '否',
    category: '新一代信息技术'
  },
  {
    id: 'proj-18',
    companyName: '杭州易问科技有限公司',
    coreTeam: `【姓名 ：杨挺; 职位 ：创始人; 浙江大学+巴黎综合理工双硕士; 前诺基亚软件工程师，杭州市人工智能学会会员。】;
【姓名 ：鞠学明; 职位 ：产品专家; 浙大工程管理硕士; 曾任酷家乐产品运营专家。】;
【姓名 ：张冬益; 职位 ：项目总监; 浙大工程管理硕士; 千万级智慧项目管理经验。】`,
    contact: '杨挺',
    keywords: 'AI宠物机器人, 桌面伴侣, 情感计算, MCP协议, 软硬件一体化',
    region: '浙江省 - 杭州市 - 滨江区',
    summary: '专注于AI技术领域的软硬件科技企业，主要产品包括AI Agent软件与桌面陪伴机器人硬件，秉承苹果ELEGNT非人形运动设计理念，支持MCP协议，已实现规模化小批量量产。',
    fundingStage: '无融资经历',
    projectName: 'AI宠物机器人解决方案',
    projectIntro: '以Desk-Emoji AI桌面机器人为核心，提供涵盖硬件设计、情感算法与内容生态的一站式宠物机器人方案。面向独居青年、老人与儿童提供情感陪伴，并结合STEAM教育与文创礼品。',
    techInnovation: '轻量化本地AI引擎（算力占用<1GB，延迟<500ms）；多模态情感计算与个性化记忆；原生支持MCP协议；DFM可制造性设计将售价做到数百元级。',
    techMaturity: '已实现初代产品量产交付，通过IP32防护测试、1.2米跌落与72小时压力测试，处于功能优化与渠道铺开阶段。',
    marketAnalysis: '消费级陪伴机器人市场需求广阔，但面临科大讯飞、优必选等大厂以及海外索尼Aibo、Lovot的高低端挤压，硬件供应链与售后风险较大。',
    topCustomers: '杭州市人工智能学会、AI工坊、C端年轻消费者',
    topSuppliers: '魔搭社区、涂鸦智能、乐鑫科技等',
    domesticRank: '百元级桌面AI陪伴探索者',
    marketShare: '1%',
    domesticCompetitors: '萌友智能(Ropet)、跃然创新、火火兔',
    intlCompetitors: 'Lovot, Sony Aibo, Anki Vector',
    businessModel: '“硬件销售 (899-1299元) + 软件高级会员订阅 (199元/年) + B端教培/IP定制”。',
    riskAndCountermeasure: '大厂快速跟进风险：通过性价比（百元级体验千元级）、MCP生态扩展及B端教培定制建立防线。',
    recommendReason: '浙大/巴黎综合理工双硕士，软硬件一体化完成度高，已实现小批量盈利。',
    judge1: 86.0,
    judge2: 82.0,
    judge3: 74.65,
    avgScore: 80.88,
    comment1: '宠物机器人项目市场需求广，但竞争激烈，团队软硬件综合素养不错。',
    comment2: '团队技术背景较强，但商业化规模预期与抗风险能力一般。',
    comment3: '目前竞品较多，市场推广难度大，硬件销售的可持续性需长期验证。',
    isRecommended: '否',
    category: '新一代信息技术'
  }
];

// Helper to parse core team string into structured cards
export function parseCoreTeamMembers(coreTeamStr: string): ParsedTeamMember[] {
  if (!coreTeamStr) return [];
  const entries = coreTeamStr.split(/】;\s*|】$/).filter(Boolean);
  
  return entries.map(entry => {
    const clean = entry.replace(/^【/, '').trim();
    const nameMatch = clean.match(/姓名\s*[:：]\s*([^;]+)/);
    const genderMatch = clean.match(/性别\s*[:：]\s*([^;]+)/);
    const birthMatch = clean.match(/出生年月\s*[:：]\s*([^;]+)/);
    const titleMatch = clean.match(/职位\s*[:：]\s*([^;]+)/);
    const degreeMatch = clean.match(/最高学历\s*[:：]\s*([^;]+)/);
    const schoolMatch = clean.match(/毕业学院\s*[:：]\s*([^;]+)/);
    
    // Extract main exp and achievements if present
    const expMatch = clean.match(/主要工作经历[:：]?([\s\S]*?)(?=主要成就|$)/);
    const achMatch = clean.match(/主要成就[:：]?([\s\S]*)$/);

    const name = nameMatch ? nameMatch[1].trim() : '核心骨干';
    const title = titleMatch ? titleMatch[1].trim() : '';
    const university = schoolMatch ? schoolMatch[1].trim() : '';
    const degree = degreeMatch ? degreeMatch[1].trim() : '';

    return {
      name,
      gender: genderMatch ? genderMatch[1].trim() : undefined,
      birth: birthMatch ? birthMatch[1].trim() : undefined,
      title: title || undefined,
      degree: degree || undefined,
      university: university || undefined,
      experience: expMatch ? expMatch[1].trim().replace(/&nbsp;/g, ' ') : undefined,
      achievements: achMatch ? achMatch[1].trim().replace(/&nbsp;/g, ' ') : undefined
    };
  });
}

// Generate an authentic AI expert assessment for a project based on its parameters
export function generateDefaultAiReview(project: Project): ProjectAiReview {
  const isRec = project.isRecommended === '是';
  const numAvg = typeof project.avgScore === 'number' ? project.avgScore : parseFloat(project.avgScore) || 85;
  
  // Calculate calibrated AI score based on avgScore and factors
  const aiScore = Number((numAvg * 0.98 + (isRec ? 2.5 : -1.2)).toFixed(1));
  const grade = aiScore >= 93 ? 'A+' : aiScore >= 88 ? 'A' : aiScore >= 80 ? 'B+' : aiScore >= 70 ? 'B' : 'C';
  const conclusion = isRec ? (aiScore >= 92 ? '强烈推荐' : '建议立项') : (aiScore >= 80 ? '保持观察' : '暂不推荐');

  return {
    overallScore: aiScore,
    grade,
    conclusion,
    dimensions: [
      {
        name: '技术壁垒与原创性',
        score: Number((aiScore * (isRec ? 0.99 : 0.91) + (Math.random() * 2 - 1)).toFixed(1)),
        weight: '25%',
        analysis: isRec 
          ? `核心技术掌握自主知识产权与算法专利，技术指标在行业内具备显著代际优势，摆脱了外部依赖。` 
          : `具备一定工程开发能力，但在底层核心算法与原始创新性方面与行业头部仍存在差距。`
      },
      {
        name: '市场前景与成长空间',
        score: Number((aiScore * 0.96 + (Math.random() * 2)).toFixed(1)),
        weight: '20%',
        analysis: `切入${project.keywords.split('、')[0] || '战略性新兴产业'}赛道，政策导向支持明确，行业存量改造与新增采购需求持续释放。`
      },
      {
        name: '商业模式与落地可行性',
        score: Number((aiScore * (isRec ? 1.01 : 0.88)).toFixed(1)),
        weight: '20%',
        analysis: isRec 
          ? `已有成熟标杆客户付费验证，复购与毛利模型较好，具备规模化放量基础。` 
          : `当前客户集中度偏高或回款周期较长，商业化变现仍需探索可持续规模化交付模式。`
      },
      {
        name: '核心团队与研发配置',
        score: Number((aiScore * 0.97 + (Math.random() * 1.5)).toFixed(1)),
        weight: '20%',
        analysis: `核心成员兼具产学研背景与工程落地经验，技术梯队与管理分工结构较为完备。`
      },
      {
        name: '合规安全与风险防控',
        score: Number((aiScore * 0.95 + 1).toFixed(1)),
        weight: '15%',
        analysis: `建立了初步的质量保障与风控机制，需继续强化产业链供应链备选与知识产权维权策略。`
      }
    ],
    expertReviewSummary: `【火炬AI大模型综合评审意见】本项目《${project.projectName}》由${project.companyName}申报。经AI评审逻辑模型全面解构与深度权衡：项目在${project.keywords}领域展现了扎实的产业融合度。${isRec ? '项目技术成熟度通过严苛场景验证，标杆效应与经济社会效益突出，综合建议予以优先扶持与立项支持。' : '项目当前处于细分探索期，建议进一步聚焦核心产品打磨与商业壁垒构建，提升现金流造血能力与市场差异化竞争力。'}`,
    keyStrengths: [
      `自研核心技术体系：${project.techInnovation.slice(0, 48)}...`,
      `标杆示范效应：已在重点领域或头部客户群体中取得实质应用`,
      `符合国家新质生产力与战略性新兴产业发展导向`
    ],
    riskWarnings: [
      `下游行业采购决策周期与预算受宏观及地方财政波动影响`,
      `行业技术迭代迅速，需警惕同类巨头跟进及价格竞争`,
      `需持续保障核心研发骨干稳定性与供应链关键物料安全`
    ],
    suggestedActions: [
      '加快推进自主知识产权专利矩阵布局与国家/行业标准参编',
      '深化与头部产业链战略伙伴协同，拓宽区域渠道与分销网络',
      '优化SaaS/硬件订阅服务比重，提升经常性收入（ARR）抗风险韧性'
    ],
    generatedAt: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
  };
}

// Simple CSV export generator
export function generateProjectsCSV(projects: Project[]): string {
  const headers = [
    '企业名称', '核心团队', '联系人', '关键词', '行政区域', '企业概要', '融资阶段',
    '参赛项目名称', '参赛项目介绍', '产品技术创新点介绍', '技术成熟性及可靠性论述',
    '产品市场分析及竞争优势', '当前五大客户', '当前五大供应商', '市场竞争分析-国内市场地位排名',
    '市场竞争分析-市场份额占有率', '国内竞争对手', '国际竞争对手', '商业模式及业务拓展计划',
    '经营风险与对策', '推荐理由', '评委1', '评委2', '评委3', '均分', '评语1', '评语2', '评语3', '是否推荐'
  ];

  const escapeCSV = (str: string | number) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = projects.map(p => [
    escapeCSV(p.companyName),
    escapeCSV(p.coreTeam),
    escapeCSV(p.contact),
    escapeCSV(p.keywords),
    escapeCSV(p.region),
    escapeCSV(p.summary),
    escapeCSV(p.fundingStage),
    escapeCSV(p.projectName),
    escapeCSV(p.projectIntro),
    escapeCSV(p.techInnovation),
    escapeCSV(p.techMaturity),
    escapeCSV(p.marketAnalysis),
    escapeCSV(p.topCustomers),
    escapeCSV(p.topSuppliers),
    escapeCSV(p.domesticRank),
    escapeCSV(p.marketShare),
    escapeCSV(p.domesticCompetitors),
    escapeCSV(p.intlCompetitors),
    escapeCSV(p.businessModel),
    escapeCSV(p.riskAndCountermeasure),
    escapeCSV(p.recommendReason),
    escapeCSV(p.judge1),
    escapeCSV(p.judge2),
    escapeCSV(p.judge3),
    escapeCSV(p.avgScore),
    escapeCSV(p.comment1),
    escapeCSV(p.comment2),
    escapeCSV(p.comment3),
    escapeCSV(p.isRecommended)
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}
