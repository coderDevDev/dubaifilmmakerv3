'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { 
  PhotoIcon, 
  VideoCameraIcon, 
  TrashIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline'

type MediaFile = {
  id: string
  file_name: string
  file_url: string
  file_type: 'image' | 'video'
  file_size?: number
  created_at: string
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    file_name: '',
    file_url: '',
    file_type: 'image' as 'image' | 'video'
  })

  useEffect(() => {
    loadMedia()
  }, [])

  async function loadMedia() {
    setLoading(true)
    try {
      let query = supabase.from('media_files').select('*').order('created_at', { ascending: false })
      
      const { data, error } = await query
      if (error) throw error
      setMediaFiles(data || [])
    } catch (error) {
      console.error(error)
      toast.error('Failed to load media')
    } finally {
      setLoading(false)
    }
  }

  async function addMedia() {
    if (!uploadData.file_name || !uploadData.file_url) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const { error } = await supabase.from('media_files').insert([uploadData])
      if (error) throw error

      toast.success('Media added successfully!')
      setShowUploadForm(false)
      setUploadData({ file_name: '', file_url: '', file_type: 'image' })
      loadMedia()
    } catch (error) {
      console.error(error)
      toast.error('Failed to add media')
    }
  }

  async function deleteMedia(id: string) {
    if (!confirm('Are you sure you want to delete this media file?')) return

    try {
      const { error } = await supabase.from('media_files').delete().eq('id', id)
      if (error) throw error

      toast.success('Media deleted!')
      loadMedia()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete media')
    }
  }

  const filteredMedia = mediaFiles
    .filter(m => filter === 'all' || m.file_type === filter)
    .filter(m => m.file_name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Media Library</h1>
          <p className="mt-2 text-slate-600">Manage your images and videos</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowUpTrayIcon className="h-5 w-5" />
          Add Media
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Add New Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">File Name</label>
              <input
                value={uploadData.file_name}
                onChange={e => setUploadData({...uploadData, file_name: e.target.value})}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., project-thumbnail.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">File URL</label>
              <input
                value={uploadData.file_url}
                onChange={e => setUploadData({...uploadData, file_url: e.target.value})}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://res.cloudinary.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">File Type</label>
              <select
                value={uploadData.file_type}
                onChange={e => setUploadData({...uploadData, file_type: e.target.value as 'image' | 'video'})}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={addMedia} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Media
              </button>
              <button onClick={() => setShowUploadForm(false)} className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
            All
          </button>
          <button onClick={() => setFilter('image')} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${filter === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
            <PhotoIcon className="h-4 w-4" /> Images
          </button>
          <button onClick={() => setFilter('video')} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${filter === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
            <VideoCameraIcon className="h-4 w-4" /> Videos
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-12">Loading media...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <PhotoIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No media files found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map(media => (
            <div key={media.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-slate-100 relative">
                {media.file_type === 'image' ? (
                  <img src={media.file_url} alt={media.file_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <VideoCameraIcon className="h-12 w-12 text-slate-400" />
                  </div>
                )}
                <button
                  onClick={() => deleteMedia(media.id)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-900 truncate">{media.file_name}</p>
                <p className="text-xs text-slate-500 mt-1">{media.file_type}</p>
                <input
                  type="text"
                  value={media.file_url}
                  readOnly
                  onClick={e => {
                    e.currentTarget.select()
                    navigator.clipboard.writeText(media.file_url)
                    toast.success('URL copied!')
                  }}
                  className="mt-2 text-xs w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded cursor-pointer hover:bg-slate-100"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}