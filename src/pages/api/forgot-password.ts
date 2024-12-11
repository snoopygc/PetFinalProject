import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { randomBytes } from 'crypto'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { email } = req.body

        const client = await clientPromise
        const db = client.db()

        const user = await db.collection('users').findOne({ email })

        if (!user) {
            // Don't reveal whether a user account exists
            return res.status(200).json({ message: 'If an account exists for that email, a password reset code has been sent.' })
        }

        const resetCode = randomBytes(4).toString('hex') // Generate a 8-character hex code
        const resetCodeExpires = new Date(Date.now() + 3600000) // 1 hour from now

        await db.collection('users').updateOne(
            { email },
            { $set: { resetCode, resetCodeExpires } }
        )

        // Send email with reset code
        const transporter = nodemailer.createTransport({
            // Configure your email service here
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail({
            from: '"PetPet Diary" <noreply@petpetdiary.com>',
            to: email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${resetCode}. This code will expire in 1 hour.`,
            html: `<p>Your password reset code is: <strong>${resetCode}</strong></p><p>This code will expire in 1 hour.</p>`,
        })

        res.status(200).json({ message: 'If an account exists for that email, a password reset code has been sent.' })
    } catch (error) {
        console.error('Forgot password error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

