import React, { useState, useRef } from 'react';
import { Project } from '../types/project';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateDefaultAiReview } from '../data/torchCupProjects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'material' | 'list';
  onAddProject?: (project: Project) => void;
  onImportProjects?: (projects: Project[]) => void;
  onTriggerAiReview?: (projectName: string, docText: string) => void;
}

export const UploadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialType = 'material',
  onAddProject,
  onImportProjects,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'material' | 'list'>(initialType);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  
  // Custom manual form fields if submitting single project material
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [contactName, setContactName] = useState('');
  const [projectIntro, setProjectIntro] = useState('');
  const [techInnovation, setTechInnovation] = useState('');
  const [businessModel, setBusinessModel] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const parseUploadedCSV = (text: string) => {
    try {
      const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length < 2) {
        throw new Error('CSV文件内容过少，需包含表头及至少一条数据');
      }

      const newProjects: Project[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const pattern = /(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/g;
        const matched: string[] = [];
        let match;
        while ((match = pattern.exec(line)) !== null) {
          let val = match[1];
          if (val.startsWith(',')) val = val.substring(1);
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1).replace(/""/g, '"');
          }
          matched.push(val.trim());
          if (matched.length >= 29) break;
        }

        if (matched.length >= 8 && matched[0]) {
          const comp = matched[0] || '企业名称';
          const proj = matched[7] || comp + '科技成果';
          const isRec = (matched[28] === '是' ? '是' : '否') as '是' | '否';
          const p: Project = {
            id: `imported-${Date.now()}-${i}`,
            companyName: comp,
            coreTeam: matched[1] || '待补充',
            contact: matched[2] || '项目申报人',
            keywords: matched[3] || '高新技术',
            region: matched[4] || '浙江省',
            summary: matched[5] || '',
            fundingStage: matched[6] || '天使轮',
            projectName: proj,
            projectIntro: matched[8] || '',
            techInnovation: matched[9] || '',
            techMaturity: matched[10] || '',
            marketAnalysis: matched[11] || '',
            topCustomers: matched[12] || '',
            topSuppliers: matched[13] || '',
            domesticRank: matched[14] || '行业前列',
            marketShare: matched[15] || '',
            domesticCompetitors: matched[16] || '',
            intlCompetitors: matched[17] || '',
            businessModel: matched[18] || '',
            riskAndCountermeasure: matched[19] || '',
            recommendReason: matched[20] || '通过自主导入审核',
            judge1: matched[21] || 90,
            judge2: matched[22] || 90,
            judge3: matched[23] || 90,
            avgScore: matched[24] || 90,
            comment1: matched[25] || '符合立项标准',
            comment2: matched[26] || '技术路线合理',
            comment3: matched[27] || '具备产业化潜力',
            isRecommended: isRec,
            category: '新一代信息技术',
          };
          p.aiReview = generateDefaultAiReview(p);
          newProjects.push(p);
        }
      }

      if (newProjects.length === 0) {
        throw new Error('未识别到有效的项目记录，请检查CSV格式');
      }

      if (onImportProjects) {
        onImportProjects(newProjects);
      }
      setUploadStatus('success');
      setStatusMessage(`成功解析并导入 ${newProjects.length} 个新项目！`);
    } catch (err: any) {
      setUploadStatus('error');
      setStatusMessage(err.message || 'CSV解析失败，请检查文件格式');
    }
  };

  const handleProcessUpload = () => {
    if (activeTab === 'list') {
      if (!selectedFile) {
        setUploadStatus('error');
        setStatusMessage('请先选择待导入的CSV清单文件');
        return;
      }
      setUploadStatus('parsing');
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseUploadedCSV(text);
      };
      reader.onerror = () => {
        setUploadStatus('error');
        setStatusMessage('文件读取错误');
      };
      reader.readAsText(selectedFile);
    } else {
      if (!projectName.trim() && !selectedFile) {
        setUploadStatus('error');
        setStatusMessage('请填写参赛项目名称或选择上传商业计划书/申报书文件');
        return;
      }
      setUploadStatus('parsing');
      setTimeout(() => {
        const newProj: Project = {
          id: `custom-${Date.now()}`,
          companyName: companyName.trim() || '申报企业',
          coreTeam: '项目创始团队及研发专家组',
          contact: contactName.trim() || '项目联系人',
          keywords: '战略性新兴产业',
          region: '重点科技园区',
          summary: projectIntro.slice(0, 100) || '自主申报的高新技术重点攻关项目',
          fundingStage: 'A轮',
          projectName: projectName.trim() || (selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : '新型科技攻关成果'),
          projectIntro: projectIntro || '项目专注于关键技术攻关与产业化落地，已形成首发样机并具备量产条件。',
          techInnovation: techInnovation || '核心技术路线拥有完全自主知识产权，相较传统方案在效率、成本与安全性上有显著提升。',
          techMaturity: '产品经过第三方实验室测试及环境适应性验证，技术就绪度达到工程化阶段。',
          marketAnalysis: '面向千亿级战略新兴产业市场，下游标杆客户替代需求强烈。',
          topCustomers: '战略合作伙伴3家，意向客户2家',
          topSuppliers: '国内核心零部件供应商已建立长效采购协议',
          domesticRank: '行业前列',
          marketShare: '12',
          domesticCompetitors: '国内少数同行处于原型验证阶段',
          intlCompetitors: '对标欧美传统厂商，具备性价比与交付敏捷度优势',
          businessModel: businessModel || '标准化产品销售与行业定制服务。',
          riskAndCountermeasure: '已建立多地冗余供应链及自主知识产权防护体系。',
          recommendReason: '技术方案扎实，团队执行力强，推荐优先立项。',
          judge1: 91,
          judge2: 89,
          judge3: 92,
          avgScore: 90.67,
          comment1: '立项指标明确，符合国家战略性新兴产业导向。',
          comment2: '核心自研技术壁垒突出，市场推广路线清晰。',
          comment3: '具备产业落地实力与成熟供应链协同机制。',
          isRecommended: '是',
          category: '新一代信息技术',
        };
        newProj.aiReview = generateDefaultAiReview(newProj);

        if (onAddProject) {
          onAddProject(newProj);
        }

        setUploadStatus('success');
        setStatusMessage('申报材料已成功归档并生成专家级评测结果！');
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-md max-w-2xl w-full p-6 md:p-8 shadow-xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              资料上传与项目导入
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              支持商业计划书、立项申报书或批量CSV项目清单导入
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => {
              setActiveTab('material');
              setUploadStatus('idle');
            }}
            className={`px-4 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer border ${
              activeTab === 'material'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            单个项目申报资料提交
          </button>
          <button
            onClick={() => {
              setActiveTab('list');
              setUploadStatus('idle');
            }}
            className={`px-4 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer border ${
              activeTab === 'list'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            批量项目清单导入 (CSV格式)
          </button>
        </div>

        {/* Form Body */}
        {activeTab === 'material' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  参赛项目名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="例如：具身智能工业机器人操作系统"
                  className="w-full px-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  申报企业名称
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="例如：智元智能科技有限公司"
                  className="w-full px-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  联系人 / 负责人
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="姓名及联系方式"
                  className="w-full px-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  商业计划书/申报书文件 (PDF / Word)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                参赛项目介绍
              </label>
              <textarea
                value={projectIntro}
                onChange={(e) => setProjectIntro(e.target.value)}
                placeholder="请概述项目的立项背景、应用场景与核心解决的产业难点..."
                rows={3}
                className="w-full p-3 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500 text-justify"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                产品技术创新点介绍
              </label>
              <textarea
                value={techInnovation}
                onChange={(e) => setTechInnovation(e.target.value)}
                placeholder="请论述算法突破、核心元器件自研或架构革新..."
                rows={2}
                className="w-full p-3 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden focus:bg-white focus:border-slate-500 text-justify"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-sm border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">CSV文件规范说明：</span>
              <p>
                请导入包含29列标准字段的火炬杯项目申报表（包含：企业名称、核心团队、联系人、项目名称、项目介绍、技术创新点、市场地位、专家打分、是否推荐等）。
              </p>
            </div>

            <div className="border border-dashed border-slate-300 rounded-sm p-6 text-center space-y-2">
              <label className="inline-block px-4 py-2 rounded-sm border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer">
                选择本地CSV文件
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-slate-500">
                {selectedFile ? `已选择: ${selectedFile.name}` : '未选择文件'}
              </p>
            </div>
          </div>
        )}

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-3 rounded-sm text-xs flex items-center gap-2 ${
              uploadStatus === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-red-50 text-red-800 border border-red-300'
            }`}
          >
            {uploadStatus === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            取消
          </button>
          <button
            onClick={handleProcessUpload}
            disabled={uploadStatus === 'parsing'}
            className="px-5 py-2 rounded-sm bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {uploadStatus === 'parsing' ? '正在处理...' : '确认并提交'}
          </button>
        </div>
      </div>
    </div>
  );
};
