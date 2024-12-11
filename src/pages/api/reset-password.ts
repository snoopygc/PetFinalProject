import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { email, code, newPassword } = req.body

        const client = await clientPromise
        const db = client.db()

        const user = await db.collection('users').findOne({
            email,
            resetCode: code,
            resetCodeExpires: { $gt: new Date() }
        })

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset code' })
        }

        const hashedPassword = await hash(newPassword, 12)

        await db.collection('users').updateOne(
            { email },
            {
                $set: { password: hashedPassword },
                $unset: { resetCode: "", resetCodeExpires: "" }
            }
        )

        res.status(200).json({ message: 'Password reset successful' })
    } catch (error) {
        console.error('Reset password error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

