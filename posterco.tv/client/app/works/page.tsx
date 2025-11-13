'use client'

import ProjectsListing from '@/components/ProjectsListing'
import { projects } from '@/data/projects'

export default function WorksPage() {
  return (
    <div className="template-projects">
      <div className="page-inner-content">
        <h1 className="hidden">Works</h1>
        <ProjectsListing projects={projects} />
      </div>
    </div>
  )
}
