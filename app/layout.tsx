import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/lib/auth-context'
import { UserNav } from '@/components/user-nav'
import { ModeToggle } from '@/components/mode-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TODO List Management System',
  description: 'Manage your tasks efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
              <header className="border-b">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                  <h1 className="text-2xl font-bold">TODO App</h1>
                  <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <UserNav user={null} />
                  </div>
                </div>
              </header>
              <main className="flex-grow">
                {children}
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}