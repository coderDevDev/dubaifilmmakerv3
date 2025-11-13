'use client'

import { useState, useEffect } from 'react'
import IntroAnimation from '@/components/IntroAnimation'
import FeaturedSlider from '@/components/FeaturedSlider'
import ProjectsListing from '@/components/ProjectsListing'
import { projects } from '@/data/projects'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // Hide intro after animation completes
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="template-homepage">
      {showIntro && <IntroAnimation />}
      
      <div className="page-inner-content">
        <div className="homepage-inner-wrapper">
          <h1 className="hidden">Poster</h1>

          <FeaturedSlider projects={projects.slice(0, 7)} />
          
          <ProjectsListing projects={projects} />
        </div>
      </div>
    </div>
  )
}
