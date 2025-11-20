'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const officeImages = [
  '/images/about/office-1.jpg',
  '/images/about/office-2.jpg',
  '/images/about/office-3.jpg',
  '/images/about/office-4.jpg',
]

export default function AboutPage() {
  const [videoPopupOpen, setVideoPopupOpen] = useState(false)

  return (
    <div className="template-about body-light">
      <div className="page-inner-content px-4 md:px-8">
        <h1 className="hidden">About</h1>

        <div className="about-inner-wrapper max-w-6xl mx-auto py-20">
          <div className="content-wrapper mb-16">
            <div className="box box--about text-base md:text-lg leading-relaxed max-w-3xl mb-8">
              <p className="mb-4">
                Located in the heart of Paris, our offices are dedicated to audiovisual production, 
                where the expertise and commitment of our teams enable us to bring a wide variety of 
                projects to life: multi-platform advertisements, digital content, music videos, 
                feature films, documentaries, and live performance recordings.
              </p>
              <p className="mb-4">
                Every project is a unique journey for us. We strive to assemble the most suitable 
                team to meet our clients' specific expectations, combining in-house talent with 
                freelance experts. With an approach that is both meticulous and human-centered, 
                we ensure impeccable quality at every stage.
              </p>
              <p>
                Beyond production, we oversee the entire creative process. From preproduction to 
                final delivery, we adapt to the unique characteristics of each project to offer 
                personalized and attentive support.
              </p>
            </div>

            <button
              // onClick={() => setVideoPopupOpen(true)}
              className="player-link js-open-popin-video flex items-center gap-2 btn hover:bg-bg-dark hover:text-light transition-smooth"
            >
              <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                <path
                  d="M7.25 4.56699C7.58333 4.75944 7.58333 5.24056 7.25 5.43301L1.25 8.89711C0.916667 9.08956 0.500001 8.849 0.500001 8.4641L0.500001 1.5359C0.500001 1.151 0.916668 0.910436 1.25 1.10289L7.25 4.56699Z"
                  stroke="currentColor"
                />
              </svg>
              view Poster reel 2025
            </button>
          </div>

          <ul className="list list--about-images grid grid-cols-1 md:grid-cols-2 gap-8">
            {officeImages.map((img, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  className="pic w-full h-auto"
                  src={img}
                  alt={`Office ${index + 1}`}
                  width={800}
                  height={600}
                />
              </motion.li>
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {videoPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="popin popin-video js-popin-video fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setVideoPopupOpen(false)}
            >
              <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                <div className="video-infos mb-4">
                  <h2 className="text-2xl font-monument">Poster reel 2025</h2>
                </div>
                <button
                  onClick={() => setVideoPopupOpen(false)}
                  className="lnk lnk--through popin-close js-close-popin-video absolute top-0 right-0 text-white"
                >
                  close
                </button>
                <div className="box--video__wrapper video-wrapper js-player fit-cover">
                  <video
                    src="https://player.vimeo.com/progressive_redirect/playback/1037524789/rendition/1080p/file.mp4?loc=external&oauth2_token_id=1774001646&signature=912fcae972afe8fe4920f8b76e89921da82f7018a5dfdc50e539d7733d7caefc"
                    controls
                    autoPlay
                    playsInline
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
