# Posterco.tv - Next.js + Tailwind CSS

A complete Next.js migration of the posterco.tv website with all original features including custom cursor, Lottie animations, video slider, and friction-based interactions.

## Features

✨ **All Original Features Replicated:**
- 🎨 Custom Typography (Azeret Mono + Monument Extended Bold)
- 🎬 Lottie Animation Intro
- 🖱️ Custom Friction-based Cursor System
- 📹 Featured Projects Video Slider with Auto-play
- 🎯 Category Filtering (Featured Film, Commercials, Music Videos)
- ⚡ Lazy Loading for Images and Videos
- 📱 Fully Responsive Design
- 🎭 Smooth Animations with Framer Motion
- 🌓 Light/Dark Theme Support (About & Contact pages)
- 🎥 Vimeo Video Integration

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Video:** React Player + Intersection Observer
- **Lottie:** lottie-react

## Installation

1. **Install dependencies:**
```bash
cd client
npm install
```

2. **Copy required assets:**
   - Copy `intro-animation.json` from `../assets/img/` to `public/animations/`
   - Copy `monument-extended-bold.woff2` from `../assets/fonts/` to `public/fonts/`
   - Copy logo SVGs from `../assets/img/` to `public/images/`

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
client/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Homepage with slider
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── works/
│       └── page.tsx        # Works listing page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── CustomCursor.tsx    # Friction-based cursor
│   ├── IntroAnimation.tsx  # Lottie intro
│   ├── FeaturedSlider.tsx  # Homepage video slider
│   ├── ProjectsListing.tsx # Projects grid
│   └── VideoPlayer.tsx     # Lazy-loaded video component
├── data/
│   └── projects.ts         # Projects data
├── types/
│   └── index.ts            # TypeScript types
├── public/
│   ├── animations/         # Lottie JSON files
│   ├── fonts/              # Custom fonts
│   └── images/             # Logo and assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Key Components

### CustomCursor
- Friction-based smooth following
- Multiple states: default, text, video, arrow
- Spring physics animation

### FeaturedSlider
- 7 featured projects
- Auto-play with progress bar
- Manual navigation
- Synchronized video playback

### VideoPlayer
- Intersection Observer for lazy loading
- Auto-play on viewport entry
- Responsive with poster images
- Optimized for performance

### IntroAnimation
- Lottie-based logo reveal
- Timeline progress indicator
- Auto-dismisses after completion

## Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'bg-dark': '#000000',
  'bg-light': '#e7e7e7',
  'light': '#ffffff',
}
```

### Fonts
Add font files to `public/fonts/` and update `app/layout.tsx`

### Projects
Edit `data/projects.ts` to add/remove projects

## Performance Optimizations

- ✅ Lazy loading for videos and images
- ✅ Intersection Observer API
- ✅ Next.js Image optimization
- ✅ Code splitting
- ✅ Minified production build
- ✅ Font optimization with Next/Font

## Build for Production

```bash
npm run build
npm start
```

## Features Comparison

| Feature | Original | Next.js Version |
|---------|----------|-----------------|
| Lottie Intro | ✅ | ✅ |
| Custom Cursor | ✅ | ✅ |
| Video Slider | ✅ | ✅ |
| Lazy Loading | ✅ | ✅ |
| Category Filter | ✅ | ✅ |
| Responsive | ✅ | ✅ |
| Custom Fonts | ✅ | ✅ |
| Animations | CSS/JS | Framer Motion |
| Routing | Navigo.js | Next.js Router |
| Performance | Good | Excellent |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a migration/replication of posterco.tv for educational purposes.
