import React, { useState } from 'react';
import { Project, ProjectAiReview } from './types/project';
import { CurrentView } from './types/navigation';
import { INITIAL_PROJECTS, generateDefaultAiReview } from './data/torchCupProjects';
import { HomePage, DEFAULT_REVIEW_MODEL } from './components/HomePage';
import type { ReviewModel } from './components/HomePage';
import { TorchCupIntroPage } from './components/TorchCupIntroPage';
import { ChunHuiIntroPage } from './components/ChunHuiIntroPage';
import { ChunHuiListPage } from './components/ChunHuiListPage';
import { ChunHuiDetailPage } from './components/ChunHuiDetailPage';
import { ProjectBrowser } from './components/ProjectBrowser';
import { ProjectBrowserTopBar } from './components/ProjectBrowserTopBar';
import { ProjectListPage } from './components/ProjectListPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ChunHuiBrowserTopBar } from './components/ChunHuiBrowserTopBar';
import { AiReviewModal } from './components/AiReviewModal';
import { UploadModal } from './components/UploadModal';
import { useProjectListState } from './hooks/useProjectListState';
import { useChunHuiListState } from './hooks/useChunHuiListState';
import { CHUNHUI_DETAIL_SAMPLE } from './data/chunhuiProjects';

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  
  // Projects dataset state (initialized with the 18 real records from CSV)
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('新一代信息技术');
  const [selectedProject, setSelectedProject] = useState<Project | null>(INITIAL_PROJECTS[0]);
  const [reviewModel, setReviewModel] = useState<ReviewModel>(DEFAULT_REVIEW_MODEL);

  // 筛选 / 排序 / 分页:项目列表页与详情页左侧项目栏共用
  const listState = useProjectListState(projects, selectedCategory);

  // 春晖杯的搜索 / 排序:列表页与它的左侧项目栏共用(不分页、不筛选)
  const chunHuiListState = useChunHuiListState();

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'material' | 'list'>('material');
  const [isAiReviewOpen, setIsAiReviewOpen] = useState(false);
  const [aiReviewTargetProject, setAiReviewTargetProject] = useState<Project | null>(null);

  // Navigation handlers
  // 离开详情页时左栏自动展开 —— 折叠状态由 currentView 推导,不再单独存一份
  const handleNavigate = (view: CurrentView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  // 赛道变化回到第 1 页,否则会停在一个已不存在的空页上
  const handleChangeCategory = (cat: string) => {
    setSelectedCategory(cat);
    listState.setCurrentPage(1);
  };

  // 从项目列表进入详情:左栏保持在原位收窄成窄栏,只有右侧详情内容切换
  const handleOpenProjectDetail = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    setSelectedProject(project);
    setCurrentView('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 窄栏内切换项目:仅换详情内容,左栏保持折叠
  const handleSelectProjectFromRail = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenUpload = (type: 'material' | 'list' = 'material') => {
    setUploadType(type);
    setIsUploadOpen(true);
  };

  const handleOpenAiReview = (projectOrQuery?: Project | string | null) => {
    if (typeof projectOrQuery === 'object' && projectOrQuery !== null) {
      setAiReviewTargetProject(projectOrQuery);
    } else {
      setAiReviewTargetProject(selectedProject || projects[0]);
    }
    setIsAiReviewOpen(true);
  };

  // 「启动AI评审控制台」:回到首页,并选中大赛类项目评审模型
  const handleLaunchReviewConsole = () => {
    setReviewModel(DEFAULT_REVIEW_MODEL);
    handleNavigate('home');
  };

  const handleAddProject = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
    setSelectedProject(newProj);
  };

  const handleUpdateProjectAiReview = (projectId: string, review: ProjectAiReview) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, aiReview: review } : p))
    );
    if (selectedProject?.id === projectId) {
      setSelectedProject((prev) => (prev ? { ...prev, aiReview: review } : null));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Main Content Area - Left bar removed from all pages */}
      <main className="flex-1 pb-12 w-full">
        {/* Render View based on current state */}
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenUpload={handleOpenUpload}
            onOpenAiReview={(query) => handleOpenAiReview(selectedProject)}
            reviewModel={reviewModel}
            onSelectReviewModel={setReviewModel}
          />
        )}

        {currentView === 'chunhui-intro' && (
          <ChunHuiIntroPage
            onNavigate={handleNavigate}
            onLaunchReviewConsole={handleLaunchReviewConsole}
          />
        )}

        {/* 春晖杯:与火炬杯共用同一个 ProjectBrowser 外壳 —— 折叠动效、
            位置对齐、窄屏回退都是同一套代码,不是各写一份 */}
        {(currentView === 'chunhui-list' || currentView === 'chunhui-detail') && (
          <ProjectBrowser
            collapsed={currentView === 'chunhui-detail'}
            topBar={
              <ChunHuiBrowserTopBar
                onNavigate={handleNavigate}
                count={chunHuiListState.filteredProjects.length}
              />
            }
            railItems={chunHuiListState.filteredProjects.map((p) => ({ id: p.id, name: p.name }))}
            selectedProjectId={CHUNHUI_DETAIL_SAMPLE.id}
            onExpand={() => handleNavigate('chunhui-list')}
            onSelectFromRail={() => handleNavigate('chunhui-detail')}
            onOpenDetail={() => handleNavigate('chunhui-detail')}
            listView={(openDetail) => (
              <ChunHuiListPage listState={chunHuiListState} onSelectProject={openDetail} />
            )}
            detailView={<ChunHuiDetailPage />}
          />
        )}

        {currentView === 'torch-intro' && (
          <TorchCupIntroPage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            onLaunchReviewConsole={handleLaunchReviewConsole}
            projectCount={projects.length}
          />
        )}

        {/* 火炬杯:项目列表与详情是同一个外壳的两个状态。在两者之间切换时外壳不卸载,
            左栏才能从整页连续收窄成窄栏,而不是整页换掉 */}
        {(currentView === 'project-list' || currentView === 'project-detail') && (
          <ProjectBrowser
            collapsed={currentView === 'project-detail'}
            topBar={
              <ProjectBrowserTopBar
                collapsed={currentView === 'project-detail'}
                projects={projects}
                selectedCategory={selectedCategory}
                selectedProject={selectedProject}
                onNavigate={handleNavigate}
                onChangeCategory={handleChangeCategory}
              />
            }
            railItems={listState.filteredProjects.map((p) => ({ id: p.id, name: p.projectName }))}
            selectedProjectId={selectedProject?.id}
            onExpand={() => handleNavigate('project-list')}
            onSelectFromRail={(id) => handleSelectProjectFromRail(id)}
            onOpenDetail={(id) => handleOpenProjectDetail(id)}
            listView={(openDetail) => (
              <ProjectListPage
                projects={projects}
                listState={listState}
                onSelectCategory={handleSelectCategory}
                onSelectProject={(p) => openDetail(p.id)}
              />
            )}
            detailView={
              selectedProject ? (
                <ProjectDetailPage
                  key={selectedProject.id}
                  project={selectedProject}
                  onUpdateProjectAiReview={handleUpdateProjectAiReview}
                />
              ) : null
            }
          />
        )}
      </main>

      {/* AI Review Modal */}
      <AiReviewModal
        isOpen={isAiReviewOpen}
        onClose={() => setIsAiReviewOpen(false)}
        projects={projects}
        initialProject={aiReviewTargetProject}
        onSelectProjectDetail={(p) => {
          setSelectedProject(p);
          setCurrentView('project-detail');
        }}
      />

      {/* Upload Modal (Material or Project List CSV) */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        initialType={uploadType}
        onAddProject={handleAddProject}
        onTriggerAiReview={(name) => {
          setIsUploadOpen(false);
          handleOpenAiReview(selectedProject);
        }}
      />
    </div>
  );
}
