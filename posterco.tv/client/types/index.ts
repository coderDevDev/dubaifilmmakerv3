export interface Project {
  slug: string
  title: string
  director: string
  category: string
  videoUrl: string
  posterUrl: string
  description?: string
}

export interface CursorState {
  x: number
  y: number
  type: 'default' | 'text' | 'video' | 'arrow'
  text?: string
}
