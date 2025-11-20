import { Suspense } from 'react'

async function DashboardStats() {
  // This would fetch real data from Supabase
  const stats = {
    totalProjects: 7,
    featuredProjects: 3,
    totalViews: 1250,
    lastUpdated: new Date().toISOString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Projects
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.totalProjects}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">★</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Featured
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.featuredProjects}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">👁</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Views
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.totalViews}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">📅</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Last Updated
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  Today
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/projects/new"
              className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
            >
              ➕ Add New Project
            </a>
            <a
              href="/admin/content"
              className="block w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
            >
              📝 Edit Page Content
            </a>
            <a
              href="/admin/media"
              className="block w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100"
            >
              📸 Manage Media
            </a>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Project "Moving Forward" updated
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              New media file uploaded
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              About page content modified
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}