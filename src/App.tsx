import React, { useState } from 'react';
import { Project, ProjectAiReview } from './types/project';
import { CurrentView } from './types/navigation';
import { INITIAL_PROJECTS, generateDefaultAiReview } from './data/torchCupProjects';
import { HomePage, DEFAULT_REVIEW_MODEL } from './components/HomePage';
import type { ReviewModel } from './components/HomePage';
import { TorchCupIntroPage } from './components/TorchCupIntroPage';
import { ProjectListPage } from './components/ProjectListPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AiReviewModal } from './components/AiReviewModal';
import { UploadModal } from './components/UploadModal';

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  
  // Projects dataset state (initialized with the 18 real records from CSV)
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('新一代信息技术');
  const [selectedProject, setSelectedProject] = useState<Project | null>(INITIAL_PROJECTS[0]);
  const [reviewModel, setReviewModel] = useState<ReviewModel>(DEFAULT_REVIEW_MODEL);

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'material' | 'list'>('material');
  const [isAiReviewOpen, setIsAiReviewOpen] = useState(false);
  const [aiReviewTargetProject, setAiReviewTargetProject] = useState<Project | null>(null);

  // Navigation handlers
  const handleNavigate = (view: CurrentView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-detail');
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

  // 「启动AI评审控制台」:回到首页,并选中火炬杯评审模型
  const handleLaunchReviewConsole = () => {
    setReviewModel(DEFAULT_REVIEW_MODEL);
    handleNavigate('home');
  };

  const handleAddProject = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
    setSelectedProject(newProj);
  };

  const handleImportProjects = (newProjects: Project[]) => {
    setProjects((prev) => [...newProjects, ...prev]);
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

        {currentView === 'torch-intro' && (
          <TorchCupIntroPage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            onLaunchReviewConsole={handleLaunchReviewConsole}
            projectCount={projects.length}
          />
        )}

        {currentView === 'project-list' && (
          <ProjectListPage
            projects={projects}
            selectedCategory={selectedCategory}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            onSelectProject={handleSelectProject}
            onOpenAiReviewForProject={(proj) => handleOpenAiReview(proj)}
          />
        )}

        {currentView === 'project-detail' && selectedProject && (
          <ProjectDetailPage
            project={selectedProject}
            onNavigate={handleNavigate}
            onUpdateProjectAiReview={handleUpdateProjectAiReview}
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
        onImportProjects={handleImportProjects}
        onTriggerAiReview={(name) => {
          setIsUploadOpen(false);
          handleOpenAiReview(selectedProject);
        }}
      />
    </div>
  );
}
