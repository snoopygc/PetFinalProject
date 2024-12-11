'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MemberProfile() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/member/login')
        } else if (session?.user) {
            setName(session.user.name || '')
            setEmail(session.user.email || '')
        }
    }, [session, status, router])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            })
            if (res.ok) {
                const data = await res.json()
                console.log(data.message)
                // Optionally, update the session here
            } else {
                const errorData = await res.json()
                console.error('Failed to update profile:', errorData.error)
            }
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">User Profile</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleUpdate} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex justify-center">
                                    <Image
                                        src={session?.user?.image || '/placeholder.svg?height=100&width=100'}
                                        alt="Profile"
                                        width={100}
                                        height={100}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
                                </div>
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Password"
                                        value="********"
                                        readOnly
                                    />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center px-2"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                <div className="relative">
                                    <button className="bg-blue-500 text-white rounded-md px-2 py-1">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}