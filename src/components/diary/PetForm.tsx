'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession } from 'next-auth/react'

interface PetProps {
  id: string;
  name: string;
  type: string;
  breed: string;
  birthDate: string;
  color: string;
  weight: number;
  image: string;
  audio?: string;
  isInHeaven: boolean;
  userId: string;
}

interface PetFormProps {
  onAddPet: (pet: Omit<PetProps, 'id' | 'isInHeaven' | 'userId'>) => void
  onCancel: () => void
  onSaveDiaryEntry: (newEntry: any) => void
  userId: string
}

export default function PetForm({ onAddPet, onCancel, onSaveDiaryEntry, userId }: PetFormProps) {
  const [pet, setPet] = useState({
    name: '',
    type: '',
    breed: '',
    birthDate: '',
    color: '',
    weight: 0,
    image: '',
    audio: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddPet({ ...pet, userId })
    setPet({ name: '', type: '', breed: '', birthDate: '', color: '', weight: 0, image: '', audio: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPet({ ...pet, [e.target.name]: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={pet.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select name="type" value={pet.type} onValueChange={(value) => setPet({ ...pet, type: value })}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select pet type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="dog">Dog</SelectItem>
            <SelectItem value="cat">Cat</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="breed">Breed</Label>
        <Input id="breed" name="breed" value={pet.breed} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="birthDate">Birth Date</Label>
        <Input id="birthDate" name="birthDate" type="date" value={pet.birthDate} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input id="color" name="color" value={pet.color} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input id="weight" name="weight" type="number" value={pet.weight} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="image">Pet Image</Label>
        <Input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} required />
      </div>
      <div>
        <Label htmlFor="audio">Pet Sound (optional)</Label>
        <Input id="audio" name="audio" type="file" accept="audio/*" onChange={handleFileChange} />
      </div>
      <div className="flex justify-between">
        <Button type="submit" className="bg-[#F0BB78] text-[#543A14] hover:bg-[#FADA7A]">Add Pet</Button>
        <Button type="button" variant="outline" onClick={onCancel} className="border-[#543A14] text-[#543A14] hover:bg-[#F0BB78]">Cancel</Button>
      </div>
    </form>
  )
}

