'use client'

import { login } from './actions'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('error')
  const [toast, setToast] = useState<string | null>(null)

  // Show error message in a toast when there's an error query parameter
  useEffect(() => {
    if (errorMessage) {
      setToast(errorMessage)
      // Automatically hide toast after 3 seconds
      const timeout = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timeout)
    }
  }, [errorMessage])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Toast Notification */}
      {toast && (
        <div className="absolute top-5 w-96 max-w-full px-4 py-2 text-white bg-red-500 rounded-md shadow-lg">
          {toast}
        </div>
      )}

      {/* Login Form */}
      <form className="flex flex-col items-center gap-4 bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-semibold">Legasi Law Firm Login</h1>
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Tulis email disini"
            className="border p-2 rounded-md"
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Tulis password disini"
            className="border p-2 rounded-md"
          />
        </div>
        <button
          formAction={login}
          className="bg-[#c5a07a] text-white py-2 px-6 rounded-md hover:bg-[#b38e6a] transition"
        >
          LOGIN
        </button>
      </form>
    </div>
  )
}
