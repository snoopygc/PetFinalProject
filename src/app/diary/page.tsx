'use client'

import { useState, useEffect } from 'react'

export default function DiaryPage() {
    const [pet, setPet] = useState(null)

    useEffect(() => {
        // Fetch pet data from MongoDB
        // For now, we'll use mock data
        setPet({
            name: 'Buddy',
            type: 'Dog',
            birthdate: '2020-01-01',
            photos: [
                '/placeholder.svg?height=200&width=200',
                '/placeholder.svg?height=200&width=200&text=Park',
                '/placeholder.svg?height=200&width=200&text=Beach',
            ],
            diaryEntries: [
                { date: '2023-06-01', content: "Today was a great day! We went to the park and I made new friends.", photo: '/placeholder.svg?height=150&width=150&text=Park' },
                { date: '2023-06-02', content: "I learned a new trick today - rolling over! My human was so proud.", photo: '/placeholder.svg?height=150&width=150&text=Trick' },
                { date: '2023-06-03', content: "Went to the vet for my annual checkup. I was brave!", photo: '/placeholder.svg?height=150&width=150&text=Vet' },
            ]
        })
    }, [])

    if (!pet) return <div>Loading...</div>

    const bookPages = [
        <div key="cover" style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{pet.name}'s Diary</h1>
            <img src={pet.photos[0]} alt={pet.name} style={{ width: '150px', height: '150px', margin: '1rem auto', borderRadius: '50%' }} />
            <p>Open to see my adventures!</p>
        </div>,
        null, // Blank page
        ...pet.diaryEntries.flatMap(entry => [
            <div key={entry.date} style={{ textAlign: 'center', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>{entry.date}</h2>
                <img src={entry.photo} alt={entry.date} style={{ width: '150px', height: '150px', margin: '1rem auto', borderRadius: '8px' }} />
                <p>{entry.content}</p>
            </div>,
            null // Blank page after each entry
        ])
    ]

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">{pet.name}'s Diary</h1>
        </div>
    )
}

