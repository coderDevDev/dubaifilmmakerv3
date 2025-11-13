'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (!cursorRef.current) return

      // Get all moving elements with friction
      const movingElements = document.querySelectorAll('.mooving-elements')
      
      movingElements.forEach((element) => {
        const htmlElement = element as HTMLElement
        const friction = parseFloat(htmlElement.getAttribute('data-friction') || '1')
        
        // Calculate lerp (linear interpolation) for smooth following
        const ease = 1 - friction / 10
        const currentX = parseFloat(htmlElement.style.left || '0')
        const currentY = parseFloat(htmlElement.style.top || '0')
        
        const newX = currentX + (mousePos.current.x - currentX) * ease
        const newY = currentY + (mousePos.current.y - currentY) * ease
        
        htmlElement.style.left = `${newX}px`
        htmlElement.style.top = `${newY}px`
        htmlElement.style.transform = 'translate(-50%, -50%)'
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    // Handle cursor visibility
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      
      // Show cursor text animations
      if (target.classList.contains('js-has-cursor-text')) {
        const cursorTextAnimated = target.querySelector('.cursor-text-animated') as HTMLElement
        if (cursorTextAnimated) {
          cursorTextAnimated.style.opacity = '1'
          cursorTextAnimated.style.visibility = 'visible'
        }
      }
      
      // Show cursor player animations
      if (target.classList.contains('js-has-cursor-player')) {
        const cursorPlayerAnimated = target.querySelector('.cursor-player-animated') as HTMLElement
        if (cursorPlayerAnimated) {
          cursorPlayerAnimated.style.opacity = '1'
          cursorPlayerAnimated.style.visibility = 'visible'
        }
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      
      if (target.classList.contains('js-has-cursor-text')) {
        const cursorTextAnimated = target.querySelector('.cursor-text-animated') as HTMLElement
        if (cursorTextAnimated) {
          cursorTextAnimated.style.opacity = '0'
          cursorTextAnimated.style.visibility = 'hidden'
        }
      }
      
      if (target.classList.contains('js-has-cursor-player')) {
        const cursorPlayerAnimated = target.querySelector('.cursor-player-animated') as HTMLElement
        if (cursorPlayerAnimated) {
          cursorPlayerAnimated.style.opacity = '0'
          cursorPlayerAnimated.style.visibility = 'hidden'
        }
      }
    }

    // Attach event listeners
    const attachListeners = () => {
      document.querySelectorAll('.js-has-cursor-text').forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
      
      document.querySelectorAll('.js-has-cursor-player').forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Initial attach and setup mutation observer for dynamic content
    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor-system">
      {/* Cursor system managed by CSS and data-friction attributes */}
    </div>
  )
}
