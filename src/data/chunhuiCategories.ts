/**
 * 春晖杯五大赛道：赛道名与简介的唯一数据源。
 * 概览页的分类卡片从这里取。
 *
 * 注意：desc 是为对齐火炬杯卡片的展示结构补写的占位文案，赛事方若给正式表述请替换。
 */
export const CHUNHUI_CATEGORIES = [
  { name: '新材料与先进制造', desc: '先进高分子、半导体材料、精密制造与高端装备' },
  { name: '生命医药与生命健康', desc: '创新药、医疗器械、生物技术与精准诊疗' },
  { name: '新能源与绿色科技', desc: '新型储能、氢能制备、节能降碳与资源循环' },
  { name: '人工智能与信息科技', desc: '人工智能、大数据、云计算与智能软件' },
  { name: '创意设计与新经济', desc: '工业设计、数字文创、新消费与服务模式' },
] as const;

export type ChunHuiCategory = (typeof CHUNHUI_CATEGORIES)[number]['name'];
