'use client'

import { Toaster } from 'react-hot-toast'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { AuthProvider } from '@/components/admin/AuthProvider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </AuthProvider>
  )
}