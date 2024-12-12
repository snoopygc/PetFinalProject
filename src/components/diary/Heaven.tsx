import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Pet {
  id: number
  name: string
  image: string
}

interface HeavenProps {
  pet: Pet
}

export default function Heaven({ pet }: HeavenProps) {
  return (
    <Card className="bg-gradient-to-b from-blue-200 to-white">
      <CardHeader>
        <CardTitle>{pet.name}&apos;s Heaven</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Image src={pet.image} alt={pet.name} width={200} height={200} className="rounded-full mb-4" />
        <p className="text-center">
          {pet.name} is now in a beautiful place, full of love and happiness.
          Their memory will always be cherished in our hearts.
        </p>
      </CardContent>
    </Card>
  )
}

