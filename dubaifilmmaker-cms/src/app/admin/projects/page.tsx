'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

type Project = Database['public']['Tables']['projects']['Row']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      toast.error('Failed to load projects')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast.success('Project deleted successfully')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete project')
      console.error(error)
    }
  }

  async function togglePublish(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_published: !currentStatus })
        .eq('id', id)

      if (error) throw error
      
      toast.success(currentStatus ? 'Project unpublished' : 'Project published')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to update project')
      console.error(error)
    }
  }

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.data_cat === filter)

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.data_cat).filter(Boolean)))]

  if (loading) {
    return <div className="text-center py-12">Loading projects...</div>
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="mt-2 text-slate-600">
            Manage your portfolio projects
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Project
          </Link>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white shadow-sm border border-slate-200 overflow-hidden rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {project.poster_image && (
                      <img
                        src={project.poster_image}
                        alt={project.title}
                        className="h-10 w-16 object-cover rounded mr-3"
                      />
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {project.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {project.data_cat}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => togglePublish(project.id, project.is_published)}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.is_published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.is_published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects found. Create your first project!
          </div>
        )}
      </div>
    </div>
  )
}