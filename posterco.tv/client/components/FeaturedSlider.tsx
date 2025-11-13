'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/types'

interface FeaturedSliderProps {
  projects: Project[]
}

export default function FeaturedSlider({ projects }: FeaturedSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mainVideosRef = useRef<(HTMLVideoElement | null)[]>([])
  const cursorVideosRef = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeIndex])

  useEffect(() => {
    // Show/hide videos based on active index
    mainVideosRef.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.style.opacity = '1'
          video.style.visibility = 'visible'
          video.play().catch(() => {})
        } else {
          video.style.opacity = '0'
          video.style.visibility = 'hidden'
          video.pause()
        }
      }
    })

    cursorVideosRef.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.style.opacity = '1'
          video.style.visibility = 'visible'
          video.play().catch(() => {})
        } else {
          video.style.opacity = '0'
          video.style.visibility = 'hidden'
          video.pause()
        }
      }
    })
  }, [activeIndex])

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setProgress(0)

    let progressValue = 0
    intervalRef.current = setInterval(() => {
      progressValue += 2
      setProgress(progressValue)

      if (progressValue >= 100) {
        handleNext()
      }
    }, 100)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleProjectChange = (index: number) => {
    setActiveIndex(index)
    startAutoPlay()
  }

  return (
    <div className="box box--home relative min-h-screen flex items-center">
      <div className="box--home__info absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 max-w-md">
        <div className="box--home__info__counter text-sm mb-4 font-bold">
          <span>{activeIndex + 1}</span>/{projects.length}
        </div>

        <ul className="list list--home js-has-cursor-player space-y-3 md:space-y-6">
          {/* Cursor Player Videos */}
          <div className="cursor-player-animated js-cursor-player-animated pointer-events-none hidden md:block">
            <div className="mooving-elements players-wrapper is-player" data-friction="7">
              {projects.map((project, index) => (
                <video
                  key={`cursor-${index}`}
                  ref={(el) => { cursorVideosRef.current[index] = el }}
                  className="js-video player-animated-player absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  src={project.videoUrl.replace('1080p', '720p')}
                  playsInline
                  loop
                  muted
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    visibility: index === 0 ? 'visible' : 'hidden'
                  }}
                />
              ))}
            </div>
          </div>

          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={`${index === activeIndex ? 'is-active' : ''} transition-opacity duration-300`}
              style={{ opacity: index === activeIndex ? 1 : 0.3 }}
            >
              <a
                href={`/works/${project.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleProjectChange(index)
                }}
                className="js-change-video text-left w-full block transition-smooth hover:opacity-100"
              >
                <h2 className="text-xl md:text-2xl lg:text-4xl font-monument mb-1 md:mb-2">{project.title}</h2>
                <p className="text-xs md:text-sm lg:text-base opacity-70">{project.director}</p>
                <p className="text-xs md:text-sm lg:text-base opacity-70">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>

        <div className="box--home__timeline mt-6 md:mt-8 w-full h-0.5 md:h-1 bg-gray-800">
          <span
            className="is-animated block h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <a
        href={`/works/${projects[activeIndex].slug}`}
        data-navigo
        className="box--home__link js-has-cursor-text block w-full h-screen"
        onClick={(e) => e.preventDefault()}
      >
        <div className="box--home__wrapper video-wrapper absolute inset-0">
          {/* All 7 Main Videos Preloaded */}
          {projects.map((project, index) => (
            <video
              key={`main-${index}`}
              ref={(el) => { mainVideosRef.current[index] = el }}
              className="js-main-video absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              src={project.videoUrl}
              muted
              playsInline
              loop
              style={{
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? 'visible' : 'hidden'
              }}
            />
          ))}
        </div>

        {/* Cursor Text Animated */}
        <div className="cursor-text-animated js-cursor-text-animated pointer-events-none">
          <div className="mooving-elements is-arrow" data-friction="1">
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.72366 3.91174H7.0685L5.14349 3.8482L6.53777 4.99985L8.40882 6.65189L7.19444 7.72412L5.3234 6.07209L4.01007 4.83306L4.07303 6.50892L4.06404 8.02593L2.3819 6.54069L2.39989 2.42649L7.04152 2.42649L8.72366 3.91174Z" fill="white"/>
            </svg>
          </div>
          <div className="mooving-elements shift cursor-main-text" data-friction="5">
            open {projects[activeIndex].title}
          </div>
        </div>
      </a>

      <div className="box--home__buttons-mobile md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
        <Link href={`/works/${projects[activeIndex].slug}`} className="mobile-link btn text-sm px-3 py-2">
          view project
        </Link>
        <div className="arrows flex gap-2">
          <button onClick={handlePrev} className="arrow-prev btn px-2 py-2 text-sm">←</button>
          <button onClick={handleNext} className="arrow-next btn px-2 py-2 text-sm">→</button>
        </div>
      </div>
    </div>
  )
}
