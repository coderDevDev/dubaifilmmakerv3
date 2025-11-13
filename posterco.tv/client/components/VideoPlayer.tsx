'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
}

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  muted = true,
  loop = true,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && videoRef.current && !loaded) {
      videoRef.current.src = src
      videoRef.current.load()
      setLoaded(true)
    }
  }, [inView, src, loaded])

  useEffect(() => {
    if (videoRef.current) {
      if (inView && autoPlay) {
        videoRef.current.play().catch(() => {
          // Autoplay was prevented
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [inView, autoPlay])

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      <video
        ref={videoRef}
        className={`js-video lazy-media w-full h-full object-cover ${loaded ? 'loaded' : ''}`}
        poster={poster}
        playsInline
        muted={muted}
        loop={loop}
        preload="metadata"
      />
    </div>
  )
}
