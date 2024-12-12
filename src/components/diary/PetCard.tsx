'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AudioPlayer from './AudioPlayer'
import Heaven from './Heaven'
import { InteractiveBook } from './InteractiveBook'
import PhotoAlbum from './PhotoAlbum'

interface Pet {
  id: number
  name: string
  type: string
  breed: string
  birthDate: string
  color: string
  weight: number
  image: string
  audio?: string
  isInHeaven: boolean
}

interface PetCardProps {
  pet: Pet
  onUpdateHeaven: (id: number) => void
  onUpdatePet: (updatedPet: Pet) => void
}

export default function PetCard({ pet, onUpdateHeaven, onUpdatePet }: PetCardProps) {
  const [bookPages, setBookPages] = useState([
    <div key="cover" className="text-center p-2 bg-gradient-to-b from-[#F0BB78] to-[#FFF0DC] h-full flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-8 text-[#543A14]">{pet.name}'s Diary</h1>
      <div className="rounded-full overflow-hidden w-32 h-32 mx-auto border-4 border-[#543A14]">
        <Image src={pet.image} alt={pet.name} width={128} height={128} className="object-cover" />
      </div>
    </div>,
    <div key="info" className="text-center p-4 bg-gradient-to-b from-[#FADA7A] to-[#FFF0DC] h-full flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">About {pet.name}</h2>
      <div className="grid grid-cols-2 gap-2 text-sm text-[#543A14]">
        <p><strong>Type:</strong> {pet.type}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Birth Date:</strong> {pet.birthDate}</p>
        <p><strong>Color:</strong> {pet.color}</p>
        <p><strong>Weight:</strong> {pet.weight} kg</p>
      </div>
    </div>,
    <div key="user-photos" className="text-center p-2 bg-gradient-to-b from-[#F0BB78] to-[#FFF0DC] h-full flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">My Photos</h2>
      <p className="text-sm mb-2 text-[#543A14]">Add your photos here!</p>
      <div className="grid grid-cols-2 gap-2"></div>
    </div>,
    null,
    <div key="audio" className="text-center p-2 bg-gradient-to-b from-[#FADA7A] to-[#FFF0DC] h-full flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">My Voice</h2>
      {pet.audio ? (
        <AudioPlayer audioSrc={pet.audio} />
      ) : (
        <p className="text-sm text-[#543A14]">No audio added yet.</p>
      )}
    </div>,
    null,
    <div key="photos" className="text-center p-2 bg-gradient-to-b from-[#F0BB78] to-[#FFF0DC] h-full flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">Photo Album</h2>
      <PhotoAlbum petId={pet.id} />
    </div>
  ]);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState(pet);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [photoUploadPage, setPhotoUploadPage] = useState<number>(2);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlayedAutomatically, setAudioPlayedAutomatically] = useState(false);

  useEffect(() => {
    if (pet.audio && !audioPlayedAutomatically) {
      const audio = new Audio(pet.audio);
      audio.play();
      setAudioPlayedAutomatically(true);
    }
  }, [pet.audio, audioPlayedAutomatically]);

  const handleAddContent = () => {
    if (selectedPage !== null && selectedPage >= 2) {
      const newContent = prompt("Enter new content for the page:");
      if (newContent) {
        setBookPages(prevPages => {
          const newPages = [...prevPages];
          newPages[selectedPage] = (
            <div key={`custom-${selectedPage}`} className="text-center p-2 bg-gradient-to-b from-[#F0BB78] to-[#FFF0DC] h-full flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">Custom Page</h2>
              <p className="text-sm text-[#543A14]">{newContent}</p>
            </div>
          );
          return newPages;
        });
      }
      setSelectedPage(null);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdatePet(editedPet);
      setBookPages(prevPages => {
        const newPages = [...prevPages];
        newPages[1] = (
          <div key="info" className="text-center p-4 bg-gradient-to-b from-[#FADA7A] to-[#FFF0DC] h-full flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">About {editedPet.name}</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-[#543A14]">
              <p><strong>Type:</strong> {editedPet.type}</p>
              <p><strong>Breed:</strong> {editedPet.breed}</p>
              <p><strong>Birth Date:</strong> {editedPet.birthDate}</p>
              <p><strong>Color:</strong> {editedPet.color}</p>
              <p><strong>Weight:</strong> {editedPet.weight} kg</p>
            </div>
          </div>
        );
        return newPages;
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPet(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedPhotos(Array.from(files));
    }
  };

  const handleConfirmPhotoUpload = () => {
    selectedPhotos.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result as string;
        setBookPages(prevPages => {
          const newPages = [...prevPages];
          const pageToUpdate = photoUploadPage;
          const existingPhotos = newPages[pageToUpdate]?.props?.children[2]?.props?.children || [];
          newPages[pageToUpdate] = (
            <div key={`photos-${pageToUpdate}`} className="text-center p-2 bg-gradient-to-b from-[#F0BB78] to-[#FFF0DC] h-full flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">My Photos</h2>
              <div className="grid grid-cols-2 gap-2">
                {existingPhotos}
                <Image src={newImage} alt={`User added photo ${index + 1}`} width={100} height={100} className="rounded-lg mx-auto mt-2" />
              </div>
            </div>
          );
          return newPages;
        });
      };
      reader.readAsDataURL(file);
    });
    setSelectedPhotos([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAudio(file);
    }
  };

  const handleConfirmAudioUpload = () => {
    if (selectedAudio) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAudio = reader.result as string;
        setBookPages(prevPages => {
          const newPages = [...prevPages];
          newPages[4] = (
            <div key="audio" className="text-center p-2 bg-gradient-to-b from-[#FADA7A] to-[#FFF0DC] h-full flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4 text-[#543A14]">My Voice</h2>
              <AudioPlayer audioSrc={newAudio} />
            </div>
          );
          return newPages;
        });
        setEditedPet(prev => ({ ...prev, audio: newAudio }));
      };
      reader.readAsDataURL(selectedAudio);
      setSelectedAudio(null);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    // This function can be used for any additional logic when a page is clicked
    console.log(`Page ${pageIndex} clicked`);
  };

  if (pet.isInHeaven) {
    return <Heaven pet={pet} />
  }

  return (
    <Card className="bg-[#FFF0DC] border-2 border-[#543A14]">
      <CardHeader>
        <CardTitle className="text-[#543A14] text-2xl">{pet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <InteractiveBook pages={bookPages} onPageClick={handlePageClick} />
        <Button 
          onClick={() => {
            if (pet.audio) {
              const audio = new Audio(pet.audio);
              audio.play();
            }
          }}
          className="mt-4 mb-4 bg-[#F0BB78] text-[#543A14] hover:bg-[#FADA7A]"
          disabled={!pet.audio}
        >
          Play Pet Sound
        </Button>
        <audio ref={audioRef} src={editedPet.audio} style={{ display: 'none' }} />
        <div className="mt-4 flex items-center justify-between space-x-4">
          <Select onValueChange={(value) => setSelectedPage(Number(value))}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select a page" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {bookPages.map((_, index) => (
                <SelectItem key={index} value={index.toString()} disabled={index < 2} className="py-2">
                  Page {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleAddContent} 
            disabled={selectedPage === null || selectedPage < 2}
            className="bg-[#F0BB78] text-[#543A14] hover:bg-[#FADA7A]"
          >
            Add Content
          </Button>
        </div>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm" 
                id="photo-upload"
                multiple
                ref={fileInputRef}
              />
            </div>
            <Select value={photoUploadPage.toString()} onValueChange={(value) => setPhotoUploadPage(Number(value))}>
              <SelectTrigger className="w-[120px] bg-white">
                <SelectValue placeholder="Upload to" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {bookPages.map((_, index) => (
                  <SelectItem key={index} value={index.toString()} disabled={index < 2} className="py-2">
                    Page {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleConfirmPhotoUpload} 
            disabled={selectedPhotos.length === 0}
            className="bg-[#F0BB78] text-[#543A14] hover:bg-[#FADA7A]"
          >
            Upload Photos
          </Button>
        </div>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input 
                type="file" 
                accept="audio/*" 
                onChange={handleAudioUpload} 
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm" 
                id="audio-upload"
              />
            </div>
          </div>
          <Button 
            onClick={handleConfirmAudioUpload} 
            disabled={!selectedAudio}
            className="bg-[#F0BB78] text-[#543A14] hover:bg-[#FADA7A]"
          >
            Upload Audio
          </Button>
        </div>
        {isEditing ? (
          <div className="mt-4 space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" value={editedPet.type} onChange={handleInputChange} />
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" name="breed" value={editedPet.breed} onChange={handleInputChange} />
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input id="birthDate" name="birthDate" type="date" value={editedPet.birthDate} onChange={handleInputChange} />
            <Label htmlFor="color">Color</Label>
            <Input id="color" name="color" value={editedPet.color} onChange={handleInputChange} />
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" name="weight" type="number" value={editedPet.weight} onChange={handleInputChange} />
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => onUpdateHeaven(pet.id)} 
          className="border-[#543A14] text-[#543A14] hover:bg-[#F0BB78]"
        >
          Heaven
        </Button>
        <Button 
          onClick={handleEditToggle} 
          className="bg-[#F0BB78] text-[#543A14] hover:bg-[#FADA7A]"
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </CardFooter>
    </Card>
  )
}

