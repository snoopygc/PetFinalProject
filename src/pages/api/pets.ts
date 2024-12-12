import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const client = await clientPromise
    const db = client.db()
    const userId = new ObjectId(session.user.id)

    if (req.method === 'GET') {
        try {
            const pets = await db.collection('pets').find({ userId }).toArray()
            res.status(200).json(pets)
        } catch (error) {
            console.error('Error fetching pets:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        }
    } else {
        res.status(405).end() // Method Not Allowed
    }
}

