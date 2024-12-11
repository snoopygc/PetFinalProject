import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingButton from '@/components/FloatingButton'
import { SessionProvider } from '@/components/SessionProvider'

export const metadata = {
  title: 'Pet Diary',
  description: 'A diary for your beloved pets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <SessionProvider>
        <Navbar />
        <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          {children}
        </main>
        <FloatingButton />
        </SessionProvider>
      </body>
    </html>
  )
}

