import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import clientPromise from '@/lib/mongodb'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(401).json({ error: 'Not authenticated' })
    }

    if (req.method === 'POST') {
        try {
            const { name, email } = req.body
            const client = await clientPromise
            const users = client.db().collection('users')

            const result = await users.updateOne(
                { email: session.user?.email },
                { $set: { name, email } }
            )

            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Profile updated successfully' })
            } else {
                res.status(404).json({ error: 'User not found' })
            }
        } catch (error) {
            console.error('Failed to update profile:', error)
            res.status(500).json({ error: 'Failed to update profile' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

