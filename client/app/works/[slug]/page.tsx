'use client'

import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import VideoPlayer from '@/components/VideoPlayer'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="template-project">
      <div className="page-inner-content px-4 md:px-8">
        <div className="max-w-6xl mx-auto py-20">
          <div className="project-header mb-12">
            <h1 className="text-4xl md:text-6xl font-monument mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 text-lg opacity-70">
              <p>{project.director}</p>
              <span>•</span>
              <p>{project.category}</p>
            </div>
          </div>

          <div className="project-video mb-12">
            <VideoPlayer
              src={project.videoUrl}
              poster={project.posterUrl}
              autoPlay
              muted={false}
              loop={false}
            />
          </div>

          {project.description && (
            <div className="project-description max-w-3xl">
              <p className="text-lg leading-relaxed">{project.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
