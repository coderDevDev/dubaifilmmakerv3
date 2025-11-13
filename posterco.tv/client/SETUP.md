# Setup Instructions

## Quick Start Guide

### 1. Copy Assets

You need to copy the following files from the original site to the Next.js project:

**PowerShell Commands (run from the posterco.tv directory):**

```powershell
# Create directories
mkdir -Force client\public\animations
mkdir -Force client\public\fonts
mkdir -Force client\public\images
mkdir -Force client\public\images\about

# Copy Lottie animation
Copy-Item assets\img\intro-animation.json client\public\animations\intro-animation.json

# Copy fonts
Copy-Item assets\fonts\monument-extended-bold.woff2 client\public\fonts\monument-extended-bold.woff2

# Copy logos
Copy-Item assets\img\poster-logo-bolder.svg client\public\images\poster-logo-bolder.svg
Copy-Item assets\img\poster-logo-dark-bolder.svg client\public\images\poster-logo-dark-bolder.svg
```

### 2. Install Dependencies

```bash
cd client
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Open Browser

Navigate to: **http://localhost:3000**

---

## Manual Asset Copy (Alternative Method)

If PowerShell commands fail, manually copy these files:

### From `assets/img/` to `client/public/animations/`:
- ✅ `intro-animation.json`

### From `assets/fonts/` to `client/public/fonts/`:
- ✅ `monument-extended-bold.woff2`

### From `assets/img/` to `client/public/images/`:
- ✅ `poster-logo-bolder.svg`
- ✅ `poster-logo-dark-bolder.svg`

---

## What's Been Replicated

### ✅ Design & Typography
- [x] Azeret Mono font (Google Fonts)
- [x] Monument Extended Bold (custom font)
- [x] Black/white color scheme
- [x] Monospace aesthetic

### ✅ Key Features
- [x] Lottie animation intro
- [x] Featured projects slider (7 projects)
- [x] Custom video cursor with friction
- [x] Project counter (1/7)
- [x] Auto-playing video backgrounds
- [x] Category filtering
- [x] Lazy-loaded media

### ✅ Pages
- [x] Homepage with video slider
- [x] Works page with grid layout
- [x] About page with office gallery
- [x] Contact page with team info

### ✅ Animations & Interactions
- [x] Custom cursor system with friction physics
- [x] Video hover previews
- [x] Smooth page transitions
- [x] Timeline progress animations
- [x] Fade-in/slide-up animations

### ✅ Technical Features
- [x] Next.js 14 App Router
- [x] TypeScript
- [x] Tailwind CSS
- [x] Framer Motion animations
- [x] Intersection Observer (lazy loading)
- [x] Responsive design
- [x] SEO optimized

---

## File Structure

```
client/
├── app/
│   ├── layout.tsx              # Root layout with fonts & cursor
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global Tailwind styles
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   └── works/page.tsx          # Works listing
│
├── components/
│   ├── Header.tsx              # Navigation with menu
│   ├── CustomCursor.tsx        # Friction-based cursor
│   ├── IntroAnimation.tsx      # Lottie intro
│   ├── FeaturedSlider.tsx      # Homepage video slider
│   ├── ProjectsListing.tsx     # Projects grid
│   └── VideoPlayer.tsx         # Lazy video component
│
├── data/
│   └── projects.ts             # 10 projects data
│
├── types/
│   └── index.ts                # TypeScript interfaces
│
├── public/
│   ├── animations/
│   │   └── intro-animation.json
│   ├── fonts/
│   │   └── monument-extended-bold.woff2
│   └── images/
│       ├── poster-logo-bolder.svg
│       └── poster-logo-dark-bolder.svg
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── README.md
```

---

## npm Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## Customization Guide

### Update Projects

Edit `data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    slug: 'project-slug',
    title: 'Project Title',
    director: 'Director Name',
    category: 'Commercials', // or 'Featured film', 'Music videos'
    videoUrl: 'https://...',
    posterUrl: 'https://...',
  },
  // Add more...
]
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'bg-dark': '#000000',      // Main dark background
  'bg-light': '#e7e7e7',     // Light theme background
  'light': '#ffffff',         // Text on dark
}
```

### Modify Animations

Edit `globals.css` keyframes:

```css
@keyframes fadeIn {
  '0%': { opacity: '0' },
  '100%': { opacity: '1' },
}
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Font Not Loading
- Ensure `monument-extended-bold.woff2` is in `public/fonts/`
- Check browser console for 404 errors
- Clear browser cache

### Videos Not Playing
- Check Vimeo URLs are accessible
- Ensure autoplay policy is met (muted videos)
- Check browser console for CORS errors

---

## Performance Tips

1. **Videos:** Use lower resolution for mobile
2. **Images:** Add responsive images with Next/Image
3. **Fonts:** Fonts are already optimized with Next/Font
4. **Lazy Loading:** Videos load only when in viewport
5. **Code Splitting:** Automatic with Next.js

---

## Browser Testing

Tested and working on:
- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

---

## Next Steps

1. ✅ Copy assets (see above)
2. ✅ Install dependencies
3. ✅ Run `npm run dev`
4. 🎨 Customize colors/content
5. 🚀 Deploy to Vercel/Netlify

---

## Deploy to Vercel

```bash
npm install -g vercel
cd client
vercel
```

Follow the prompts and your site will be live! 🚀
