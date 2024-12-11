'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ResetPassword() {
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')

        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code, newPassword }),
            })

            const data = await res.json()

            if (res.ok) {
                setMessage('Password reset successful. You can now log in with your new password.')
                setTimeout(() => router.push('/member/login'), 3000)
            } else {
                setMessage(data.message || 'An error occurred')
            }
        } catch (error) {
            console.error('Reset password error:', error)
            setMessage('An unexpected error occurred')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
                </div>
                {message && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{message}</span>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="reset-code" className="sr-only">
                                Reset Code
                            </label>
                            <input
                                id="reset-code"
                                name="code"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Reset Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="new-password" className="sr-only">
                                New Password
                            </label>
                            <input
                                id="new-password"
                                name="newPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link href="/member/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

