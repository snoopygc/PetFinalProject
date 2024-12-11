'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import BreedInfo from '@/components/BreedInfo'

const breeds = {
    small: [
        { name: 'บาเซนจิ', englishName: 'Basenji', image: 'Basenji.png' },
        { name: 'บีเกิ้ล', englishName: 'Beagle', image: 'Beagle.jpg' },
        // ... (include all small breeds)
    ],
    medium: [
        { name: 'แบสเซ็ต ฮาวด์', englishName: 'Basset Hound', image: 'BassetHound.jpg' },
        { name: 'บอร์เดอร์ คอลลี่', englishName: 'Border Collie', image: 'BorderCollie.jpg' },
        // ... (include all medium breeds)
    ],
    large: [
        { name: 'อัฟกัน ฮาวด์', englishName: 'Afghan Hound', image: 'AfghanHound.jpg' },
        { name: 'อะกิตะ อินุ', englishName: 'Akita Inu', image: 'AkitaInu.jpg' },
        // ... (include all large breeds)
    ],
}

export default function BreedPage() {
    const params = useParams()
    const size = params.size as 'small' | 'medium' | 'large'
    const breedParam = params.breed as string

    const breed = breeds[size].find(b => b.englishName.toLowerCase().replace(/ /g, '-') === breedParam)

    if (!breed) {
        return <div>Breed not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 sm:h-96">
                    <Image
                        src={`/breeds/${breed.image}`}
                        alt={breed.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{breed.name}</h1>
                    <p className="text-xl text-gray-600 mb-6">{breed.englishName}</p>
                    <BreedInfo breedId={breedParam} />
                </div>
            </div>
        </div>
    )
}

