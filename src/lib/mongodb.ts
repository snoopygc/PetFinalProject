import { MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false, // Disable SSL certificate validation
    tlsAllowInvalidCertificates: true, // Allow invalid certificates
}

let client
let clientPromise: Promise<MongoClient>

const connectToDatabase = async () => {
    try {
        console.log('Attempting to connect to MongoDB...')
        const client = new MongoClient(uri, options)
        await client.connect()
        console.log('Successfully connected to MongoDB')
        return client
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
        throw error
    }
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = connectToDatabase()
    }
    clientPromise = global._mongoClientPromise
} else {
    clientPromise = connectToDatabase()
}

export default clientPromise

