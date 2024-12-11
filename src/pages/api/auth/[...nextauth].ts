import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials')
                }

                try {
                    const client = await clientPromise
                    const users = client.db().collection('users')
                    const user = await users.findOne({ email: credentials.email })

                    if (!user) {
                        throw new Error('No user found')
                    }

                    const isPasswordValid = await compare(credentials.password, user.password)

                    if (!isPasswordValid) {
                        throw new Error('Invalid password')
                    }

                    return { id: user._id.toString(), email: user.email, name: user.name }
                } catch (error) {
                    console.error('Authentication error:', error)
                    throw new Error('Authentication failed due to a server error')
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/member/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id
            }
            return session
        }
    },
    debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)

