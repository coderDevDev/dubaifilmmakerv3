'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import VideoPlayer from './VideoPlayer'
import { Project } from '@/types'

interface ProjectsListingProps {
  projects: Project[]
}

export default function ProjectsListing({ projects }: ProjectsListingProps) {
  const [activeCategory, setActiveCategory] = useState('*')

  const filteredProjects = activeCategory === '*' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().replace(' ', '-') === activeCategory)

  return (
    <div className="bloc-projects-listing py-20">
      <ul id="works" className="list list--works grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="box box--work"
            data-cat={project.category.toLowerCase().replace(' ', '-')}
          >
            <Link
              href={`/works/${project.slug}`}
              className="box--work__link js-has-cursor-text block group"
            >
              <div className="box--work__info mb-4">
                <h2 className="text-xl md:text-2xl font-monument mb-2 group-hover:opacity-70 transition-smooth">
                  {project.title}
                </h2>
                <p className="text-sm opacity-70">{project.director}</p>
                <p className="text-sm opacity-70">{project.category}</p>
              </div>

              <div className="box--work__video video-wrapper has-poster relative overflow-hidden">
                <VideoPlayer
                  src={project.videoUrl}
                  poster={project.posterUrl}
                  muted
                  loop
                />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
