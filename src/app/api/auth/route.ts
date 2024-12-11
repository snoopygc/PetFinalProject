import { NextResponse } from 'next/server'
import { findUser, createUser } from '@/lib/db'
import { MongoServerError } from 'mongodb'

export async function POST(request: Request) {
    try {
        const { email, password, isSignUp, petData } = await request.json()

        if (isSignUp) {
            // Handle sign up
            const newUser = await createUser({ email, password, petData })
            return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
        } else {
            // Handle sign in
            const user = await findUser(email, password)
            if (user) {
                return NextResponse.json({ message: 'Login successful' }, { status: 200 })
            } else {
                return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
            }
        }
    } catch (error) {
        console.error('Authentication error:', error)
        if (error instanceof MongoServerError) {
            return NextResponse.json({ message: `Database error: ${error.message}` }, { status: 500 })
        } else if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: 'An unexpected error occurred during authentication' }, { status: 500 })
        }
    }
}

