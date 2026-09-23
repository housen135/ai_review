/**
 * 火炬杯七大赛道：赛道名与简介的唯一数据源。
 * 概览页的分类卡片与项目列表页的赛道下拉都从这里取，避免两处各写一份导致筛不掉数据。
 */
export const TORCH_CUP_CATEGORIES = [
  { name: '新一代信息技术', desc: '人工智能、云计算、具身智能、空间计算、信创工业软件' },
  { name: '高端装备制造', desc: '工业机器人、数控母机、航空航天、精密测量与特种装备' },
  { name: '生物医药', desc: '靶向药物、医疗器械、生物计算、合成生物学与精准诊疗' },
  { name: '新材料', desc: '先进高分子、半导体硅基材料、超导合金与碳纳米材料' },
  { name: '新能源', desc: '新型储能、全固态电池、氢能制备、智能微电网技术' },
  { name: '节能环保', desc: '工业降碳、固废资源化利用、水环境声学遥感监测与治理' },
  { name: '新能源汽车', desc: '汽车电子工具链、智能座舱、车路协同网联与线控底盘' },
] as const;

export type TorchCupCategory = (typeof TORCH_CUP_CATEGORIES)[number]['name'];

/** 默认赛道：也是当前唯一有在库项目数据的赛道 */
export const DEFAULT_CATEGORY: TorchCupCategory = '新一代信息技术';
