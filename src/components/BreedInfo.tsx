import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface BreedData {
    name: string;
    about: string;
    age: string;
    color: string;
    size: string;
    weight: string;
    height: string;
    history: string;
    exercise: string;
    habit: string;
    health: string;
    training: string;
    nutrition: string;
}

interface BreedInfoProps {
    breedId: string;
}

export default function BreedInfo({ breedId }: BreedInfoProps) {
    const [breedData, setBreedData] = useState<BreedData | null>(null);

    useEffect(() => {
        const docRef = doc(db, "breed", breedId);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setBreedData(docSnap.data() as BreedData);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, [breedId]);

    if (!breedData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Breed Information about {breedData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>About:</strong> {breedData.about}</p>
                <p><strong>Age:</strong> {breedData.age}</p>
                <p><strong>Color:</strong> {breedData.color}</p>
                <p><strong>Size:</strong> {breedData.size}</p>
                <p><strong>Weight:</strong> {breedData.weight}</p>
                <p><strong>Height:</strong> {breedData.height}</p>
                <p><strong>History:</strong> {breedData.history}</p>
                <p><strong>Exercise:</strong> {breedData.exercise}</p>
                <p><strong>Habit:</strong> {breedData.habit}</p>
                <p><strong>Health:</strong> {breedData.health}</p>
                <p><strong>Training:</strong> {breedData.training}</p>
                <p><strong>Nutrition:</strong> {breedData.nutrition}</p>
            </div>
        </div>
    );
}

