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

    switch (req.method) {
        case 'POST': {
            try {
                const { petId, date, content, photos, audio } = req.body

                const newEntry = {
                    userId,
                    petId,
                    date,
                    content,
                    photos,
                    audio,
                }

                const result = await db.collection('diaryEntries').insertOne(newEntry)

                res.status(201).json({ message: 'Diary entry created', entryId: result.insertedId })
            } catch (error) {
                console.error('Error creating diary entry:', error)
                res.status(500).json({ message: 'Internal Server Error' })
            }
            break
        }

        case 'GET': {
            try {
                const entries = await db.collection('diaryEntries').find({ userId }).toArray()
                res.status(200).json(entries)
            } catch (error) {
                console.error('Error fetching diary entries:', error)
                res.status(500).json({ message: 'Internal Server Error' })
            }
            break
        }

        default:
            res.status(405).end() // Method Not Allowed
    }
}

