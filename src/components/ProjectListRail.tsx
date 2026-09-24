import React from 'react';
import { PanelLeft } from 'lucide-react';
import { Project } from '../types/project';

interface Props {
  /** 当前筛选条件下的**全部**项目(不分页) —— 窄栏要能滚,位置对齐才做得成 */
  projects: Project[];
  selectedProjectId: string;
  /** 栏内切换项目:只换右侧详情,左栏保持折叠 */
  onSelectProject: (project: Project) => void;
  /** 展开回完整的项目列表页 */
  onExpand: () => void;
}

/**
 * 项目列表收窄后的形态:只保留项目名称,点击切换右侧详情,不必退回列表页。
 *
 * 本组件是 ProjectBrowser 里 <aside> 的**填充内容**,不自带定位:宽度与出现/消失
 * 由外层那个始终存在的 <aside> 负责,才能得到连续的收窄动效。
 *
 * 这里显示筛选结果的全部而非当页:窄栏的滚动位置要能被 ProjectBrowser 调成
 * 「点中的项目落在它原来那一行的高度上」,内容比容器矮就没得滚,对齐做不成。
 *
 * 窄屏下它整块隐藏,仍走「返回项目列表」的原有路径。
 */
export const ProjectListRail: React.FC<Props> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onExpand,
}) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4 py-4 border-b border-slate-200 shrink-0 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">
            项目列表
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            共 {projects.length} 个项目
          </p>
        </div>
        <button
          onClick={onExpand}
          title="展开完整列表"
          className="shrink-0 p-1.5 rounded-sm border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <PanelLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ProjectBrowser 会在这个滚动容器上做位置对齐:读它的 scrollTop、
         给内层写 paddingTop/paddingBottom。改动它之前先看 syncRailScroll */}
      <div data-rail-scroll className="flex-1 min-h-0 overflow-y-auto px-3">
        <div data-rail-inner className="py-3 space-y-2">
          {projects.length === 0 ? (
            <p className="px-1.5 py-6 text-[11px] text-slate-400 leading-relaxed">
              当前筛选条件下没有项目
            </p>
          ) : (
            projects.map((project) => {
              const isActive = project.id === selectedProjectId;
              return (
                <button
                  key={project.id}
                  data-project-id={project.id}
                  onClick={() => onSelectProject(project)}
                  title={project.projectName}
                  className={`w-full text-left px-3.5 py-3.5 rounded-sm border transition-colors cursor-pointer ${
                    isActive
                      ? 'border-blue-300 bg-blue-50 text-blue-800 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="block text-xs line-clamp-2 leading-relaxed">
                    {project.projectName}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
