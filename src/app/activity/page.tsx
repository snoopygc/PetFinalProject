'use client'

import { useState } from 'react'

const activities = [
    'Walking',
    'Swimming',
    'Playing tug-of-war',
    'Eating snacks',
    'Sleeping'
]

export default function ActivityPage() {
    const [activity, setActivity] = useState('')

    const suggestActivity = () => {
        const randomIndex = Math.floor(Math.random() * activities.length)
        setActivity(activities[randomIndex])
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Activity Suggester</h1>
            <button onClick={suggestActivity} className="bg-blue-500 text-white p-2 rounded">
                Suggest Activity
            </button>
            {activity && (
                <p className="mt-4 text-xl">Suggested activity: {activity}</p>
            )}
        </div>
    )
}

