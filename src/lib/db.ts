// import clientPromise from './mongodb'
// import { MongoServerError } from 'mongodb'

// export async function connectToDatabase() {
//     try {
//         const client = await clientPromise
//         const db = client.db('pet_diary')
//         return { db, client }
//     } catch (error) {
//         if (error instanceof MongoServerError) {
//             console.error('MongoDB Server Error:', error.code, error.message)
//             throw new Error(`Database connection error: ${error.message}`)
//         } else {
//             console.error('Failed to connect to the database', error)
//             throw new Error('Unable to connect to the database')
//         }
//     }
// }

// export async function findUser(email: string, password: string) {
//     try {
//         const { db } = await connectToDatabase()
//         return await db.collection('users').findOne({ email, password })
//     } catch (error) {
//         console.error('Error finding user:', error)
//         throw error
//     }
// }

// export async function createUser(userData: any) {
//     try {
//         const { db } = await connectToDatabase()
//         return await db.collection('users').insertOne(userData)
//     } catch (error) {
//         console.error('Error creating user:', error)
//         throw error
//     }
// }

