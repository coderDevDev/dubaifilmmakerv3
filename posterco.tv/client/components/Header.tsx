'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Homepage', href: '/', slug: 'homepage' },
  { name: 'Works', href: '/works', slug: 'works' },
  { name: 'About', href: '/about', slug: 'about' },
  { name: 'Contact', href: '/contact', slug: 'contact' },
]

const categories = [
  { name: 'all', label: 'all', slug: '*' },
  { name: 'featured-film', label: 'Featured film', slug: 'featured-film' },
  { name: 'commercials', label: 'Commercials', slug: 'commercials' },
  { name: 'music-videos', label: 'Music videos', slug: 'music-videos' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isLightTheme = pathname === '/about' || pathname === '/contact'

  return (
    <header className="header fixed top-0 left-0 w-full z-40 p-4 md:p-6">
      <div className="header__nav flex justify-between items-center">
        <Link href="/" className="logo-link">
          <Image
            className="header__logo"
            src={isLightTheme ? '/images/poster-logo-bolder.svg' : '/images/poster-logo-dark-bolder.svg'}
            alt="Poster"
            width={120}
            height={32}
            priority
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn--menu z-50 relative"
        >
          <span>{menuOpen ? 'close.' : 'menu.'}</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="header__navigations-wrapper fixed inset-0 bg-bg-dark/95 backdrop-blur-sm flex items-center justify-center z-30"
          >
            <nav className="header__subnav">
              <ul className="space-y-6 text-center">
                {navigation.map((item) => (
                  <li key={item.slug} data-slug={item.slug}>
                    <Link
                      href={item.href}
                      className={`text-3xl md:text-5xl font-bold transition-smooth hover:text-gray-400 ${
                        pathname === item.href ? 'text-white' : 'text-gray-500'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {(pathname === '/' || pathname === '/works') && (
                <div className="projects-nav mt-12">
                  <ul className="list list--cat flex flex-wrap justify-center gap-4 text-sm md:text-base">
                    {categories.map((cat) => (
                      <li key={cat.name}>
                        <a
                          href={`#works`}
                          className="js-filter-cat hover:underline transition-smooth"
                          data-cat={cat.slug}
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
