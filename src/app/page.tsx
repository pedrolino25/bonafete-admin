'use client'
import { Navbar } from '@/components/navigation/Navbar'

export default function Home() {
  return (
    <Navbar>
      <main>
        <div className="p-4">
          <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:w-full gap-6"></div>
        </div>
      </main>
    </Navbar>
  )
}
