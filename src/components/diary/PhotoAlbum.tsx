'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PhotoAlbumProps {
  petId: number
}

export default function PhotoAlbum({ petId }: PhotoAlbumProps) {
  const [photos, setPhotos] = useState<string[]>([])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos([...photos, reader.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Photo Album</h3>
      <Input type="file" accept="image/*" onChange={handlePhotoUpload} className="mb-4" />
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo, index) => (
          <Image key={index} src={photo} alt={`Pet photo ${index + 1}`} width={150} height={150} className="rounded-lg" />
        ))}
      </div>
    </div>
  )
}

