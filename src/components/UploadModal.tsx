import React, { useState, useRef } from 'react';
import { Project } from '../types/project';
import { X, CheckCircle2, AlertCircle, FileSpreadsheet, FolderOpen } from 'lucide-react';
import { generateDefaultAiReview } from '../data/torchCupProjects';

/** 用户为某一项选中的内容:可能是单个文件,也可能是整个文件夹 */
type PickedSource = { kind: 'file' | 'folder'; name: string; files: File[] } | null;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'material' | 'list';
  onAddProject?: (project: Project) => void;
  onTriggerAiReview?: (projectName: string, docText: string) => void;
}

export const UploadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialType = 'material',
  onAddProject,
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

  // 「批量项目清单导入」要用户选两样东西:项目清单(csv/excel 文件或文件夹)、商业计划书文件夹
  const [listSource, setListSource] = useState<PickedSource>(null);
  const [planSource, setPlanSource] = useState<PickedSource>(null);
  const listFileInputRef = useRef<HTMLInputElement>(null);
  const listFolderInputRef = useRef<HTMLInputElement>(null);
  const planFolderInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  /** 从 input 的 FileList 判断用户选的是文件还是文件夹 —— 目录选择会带上 webkitRelativePath */
  const readPickedSource = (input: HTMLInputElement): PickedSource => {
    const files = Array.from(input.files || []);
    if (!files.length) return null;
    const relPath = (files[0] as File & { webkitRelativePath?: string }).webkitRelativePath;
    return relPath
      ? { kind: 'folder', name: relPath.split('/')[0], files }
      : { kind: 'file', name: files[0].name, files };
  };

  const handleListPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = readPickedSource(e.target);
    if (picked) {
      setListSource(picked);
      setUploadStatus('idle');
      setStatusMessage('');
    }
    // 清空 value,否则连续选同一个文件/文件夹不会再触发 change
    e.target.value = '';
  };

  const handlePlanPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = readPickedSource(e.target);
    if (picked) {
      setPlanSource(picked);
      setUploadStatus('idle');
      setStatusMessage('');
    }
    e.target.value = '';
  };

  /** webkitdirectory 不在 React 的类型定义里,只能挂到真实 DOM 上。
      Chrome / Edge / Safari / Firefox 均支持这个目录选择属性 */
  const attachFolderPicker = (
    node: HTMLInputElement | null,
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    ref.current = node;
    if (node) {
      node.setAttribute('webkitdirectory', '');
      node.setAttribute('directory', '');
    }
  };

  const handleProcessUpload = () => {
    // demo:这里不做真实的文件读取与解析,选好东西提交即可,回一个回执
    if (activeTab === 'list') {
      if (!listSource) {
        setUploadStatus('error');
        setStatusMessage('请先选择项目清单（csv / excel 文件，或存放清单的文件夹）');
        return;
      }
      setUploadStatus('parsing');
      setTimeout(() => {
        setUploadStatus('success');
        setStatusMessage(
          `已接收清单「${listSource.name}」` +
            (listSource.kind === 'folder' ? `，共 ${listSource.files.length} 个文件` : '') +
            (planSource ? `；商业计划书文件夹「${planSource.name}」` : '')
        );
      }, 600);
      return;
    }
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
              支持商业计划书、立项申报书，或批量导入项目清单
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
            批量项目清单导入
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
            {/* 1. 项目清单 */}
            <div className="rounded-sm border border-slate-200 p-4 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-xs font-bold text-slate-800">
                  1. 选择项目清单 <span className="text-red-500">*</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  csv / excel 文件，或存放清单的文件夹
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => listFileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                  <span>选择文件</span>
                </button>
                <button
                  type="button"
                  onClick={() => listFolderInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>选择文件夹</span>
                </button>

                <span className="text-xs text-slate-500 min-w-0 truncate">
                  {listSource
                    ? `${listSource.kind === 'folder' ? '文件夹' : '文件'}：${listSource.name}` +
                      (listSource.kind === 'folder' ? `（${listSource.files.length} 个文件）` : '')
                    : '未选择'}
                </span>
              </div>

              <input
                ref={listFileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleListPick}
                className="hidden"
              />
              <input
                ref={(node) => attachFolderPicker(node, listFolderInputRef)}
                type="file"
                multiple
                onChange={handleListPick}
                className="hidden"
              />
            </div>

            {/* 2. 商业计划书文件夹 */}
            <div className="rounded-sm border border-slate-200 p-4 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-xs font-bold text-slate-800">
                  2. 选择项目商业计划书文件夹
                </span>
                <span className="text-[11px] text-slate-400">申报项目的资料文件夹</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => planFolderInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>选择文件夹</span>
                </button>

                <span className="text-xs text-slate-500 min-w-0 truncate">
                  {planSource
                    ? `文件夹：${planSource.name}（${planSource.files.length} 个文件）`
                    : '未选择'}
                </span>
              </div>

              <input
                ref={(node) => attachFolderPicker(node, planFolderInputRef)}
                type="file"
                multiple
                onChange={handlePlanPick}
                className="hidden"
              />
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
