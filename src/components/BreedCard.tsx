import Image from 'next/image'
import Link from 'next/link'

interface BreedCardProps {
    name: string
    englishName: string
    image: string
    size: string
}

export default function BreedCard({ name, englishName, image, size }: BreedCardProps) {
    return (
        <Link href={`/breeds/${size}/${englishName.toLowerCase().replace(/ /g, '-')}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                    <Image
                        src={`/breeds/${image}`}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-sm text-gray-600">{englishName}</p>
                </div>
            </div>
        </Link>
    )
}

