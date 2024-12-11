'use client'

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, Observer);

interface DogBreed {
    id: string;
    name: string;
    description: string;
    image: string;
    size: 'small' | 'medium' | 'large';
}

const dogBreeds: DogBreed[] = [
    // Small Dog Breeds
    { id: 'basenji', name: 'Basenji', description: 'A small to medium-sized breed known for its quiet nature.', image: '/img/Breed/small/Basenji.png', size: 'small' },
    { id: 'beagle', name: 'Beagle', description: 'A friendly and curious breed, often used as a hunting dog.', image: '/img/Breed/small/Beagle.jpg', size: 'small' },
    { id: 'bichon-frise', name: 'Bichon Frise', description: 'A cheerful and playful breed with a fluffy coat.', image: '/img/Breed/small/BichonFrise.png', size: 'small' },
    { id: 'bolognese', name: 'Bolognese', description: 'A small, white dog breed known for its fluffy coat and playful personality.', image: '/img/Breed/small/Bolognese.jpg', size: 'small' },
    { id: 'cavalier-king-charles-spaniel', name: 'Cavalier King Charles Spaniel', description: 'A gentle and affectionate breed known for its sweet temperament.', image: '/img/Breed/small/CavalierKingCharlesSpaniel.jpg', size: 'small' },
    { id: 'chihuahua', name: 'Chihuahua', description: 'A tiny breed known for its big personality.', image: '/img/Breed/small/Chihuahua.jpg', size: 'small' },
    { id: 'dachshund', name: 'Dachshund', description: 'A long-bodied, short-legged breed known for its playful nature.', image: '/img/Breed/small/Dachshund.png', size: 'small' },
    { id: 'french-bulldog', name: 'French Bulldog', description: 'A popular breed known for its bat-like ears and friendly personality.', image: '/img/Breed/small/FrenchBulldog.jpg', size: 'small' },
    { id: 'italian-greyhound', name: 'Italian Greyhound', description: 'A small, slender breed known for its elegance and speed.', image: '/img/Breed/small/ItalianGreyhound.jpg', size: 'small' },
    { id: 'jack-russell-terrier', name: 'Jack Russell Terrier', description: 'A small, energetic breed known for its hunting instincts.', image: '/img/Breed/small/JackRussellTerrier.jpg', size: 'small' },
    { id: 'japanese-spitz', name: 'Japanese Spitz', description: 'A small, white breed known for its fluffy coat and playful personality.', image: '/img/Breed/small/JapaneseSpitz.jpg', size: 'small' },
    { id: 'lhasa-apso', name: 'Lhasa Apso', description: 'A small, long-haired breed known for its loyalty and independence.', image: '/img/Breed/small/LhasaApso.jpg', size: 'small' },
    { id: 'maltese', name: 'Maltese', description: 'A small, white breed known for its long, silky coat.', image: '/img/Breed/small/Maltese.png', size: 'small' },
    { id: 'manchester-terrier', name: 'Manchester Terrier', description: 'A small, sleek breed known for its intelligence and agility.', image: '/img/Breed/small/ManchesterTerrier.jpeg', size: 'small' },
    { id: 'miniature-schnauzer', name: 'Miniature Schnauzer', description: 'A small, wiry-haired breed known for its intelligence and loyalty.', image: '/img/Breed/small/MiniatureSchnauzer.jpg', size: 'small' },
    { id: 'papillon', name: 'Papillon', description: 'A small breed known for its large, butterfly-like ears.', image: '/img/Breed/small/Papillon.jpg', size: 'small' },
    { id: 'pekingese', name: 'Pekingese', description: 'A small, long-haired breed known for its independent nature.', image: '/img/Breed/small/Pekingese.jpg', size: 'small' },
    { id: 'pembroke-welsh-corgi', name: 'Pembroke Welsh Corgi', description: 'A small, herding breed known for its short legs and playful personality.', image: '/img/Breed/small/PembrokeWelshCorgi.jpg', size: 'small' },
    { id: 'pomeranian', name: 'Pomeranian', description: 'A small, fluffy breed known for its fox-like appearance.', image: '/img/Breed/small/Pomeranian.jpg', size: 'small' },
    { id: 'poodle-miniature', name: 'Poodle (Miniature)', description: 'A small, intelligent breed known for its curly coat.', image: '/img/Breed/small/Poodle.jpeg', size: 'small' },
    { id: 'pug', name: 'Pug', description: 'A small, wrinkly breed known for its playful nature.', image: '/img/Breed/small/Pug.jpg', size: 'small' },
    { id: 'shetland-sheepdog', name: 'Shetland Sheepdog', description: 'A small, herding breed known for its intelligence and loyalty.', image: '/img/Breed/small/ShetlandSheepdog.jpg', size: 'small' },
    { id: 'shiba-inu', name: 'Shiba Inu', description: 'A small, independent breed known for its spitz-like appearance.', image: '/img/Breed/small/ShibaInu.jpg', size: 'small' },
    { id: 'shih-tzu', name: 'Shih Tzu', description: 'A small, long-haired breed known for its gentle nature.', image: '/img/Breed/small/ShihTzu.jpg', size: 'small' },
    { id: 'welsh-terrier', name: 'Welsh Terrier', description: 'A small, energetic breed known for its hunting instincts.', image: '/img/Breed/small/WelshTerrier.jpg', size: 'small' },
    { id: 'yorkshire-terrier', name: 'Yorkshire Terrier', description: 'A small, long-haired breed known for its elegance and loyalty.', image: '/img/Breed/small/YorkshireTerrier.jpg', size: 'small' },

    // Medium Dog Breeds
    { id: 'basset-hound', name: 'Basset Hound', description: 'A short-legged breed known for its keen sense of smell.', image: '/img/Breed/medium/BassetHound.jpg', size: 'medium' },
    { id: 'border-collie', name: 'Border Collie', description: 'An intelligent and energetic herding dog.', image: '/img/Breed/medium/BorderCollie.jpg', size: 'medium' },
    { id: 'bull-terrier', name: 'Bull Terrier', description: 'A playful and robust breed with a distinctive egg-shaped head.', image: '/img/Breed/medium/BullTerrier.jpg', size: 'medium' },
    { id: 'bulldog', name: 'Bulldog', description: 'A muscular breed known for its calm and friendly demeanor.', image: '/img/Breed/medium/Bulldog.jpg', size: 'medium' },
    { id: 'chow-chow', name: 'Chow Chow', description: 'A distinctive breed known for its lion-like mane.', image: '/img/Breed/medium/ChowChow.jpg', size: 'medium' },
    { id: 'cocker-spaniel', name: 'Cocker Spaniel', description: 'A friendly and affectionate breed known for its playful nature.', image: '/img/Breed/medium/CockerSpaniel.jpg', size: 'medium' },
    { id: 'collie', name: 'Collie', description: 'An intelligent and loyal breed known for its herding instincts.', image: '/img/Breed/medium/Collie.jpg', size: 'medium' },
    { id: 'dalmatian', name: 'Dalmatian', description: 'A distinctive breed known for its spotted coat.', image: '/img/Breed/medium/Dalmatian.jpg', size: 'medium' },
    { id: 'drever', name: 'Drever', description: 'A small-medium sized hunting dog breed from Sweden.', image: '/img/Breed/medium/Drever.jpg', size: 'medium' },
    { id: 'mudi', name: 'Mudi', description: 'A medium-sized Hungarian herding dog breed.', image: '/img/Breed/medium/Mudi.jpg', size: 'medium' },
    { id: 'pitbull', name: 'Pitbull', description: 'A muscular breed known for its loyalty and protective nature.', image: '/img/Breed/medium/Pitbull.jpg', size: 'medium' },
    { id: 'samoyed', name: 'Samoyed', description: 'A fluffy breed known for its friendly and outgoing personality.', image: '/img/Breed/medium/Samoyed.jpg', size: 'medium' },
    { id: 'siberian-husky', name: 'Siberian Husky', description: 'A strong and athletic breed known for its endurance.', image: '/img/Breed/medium/SiberianHusky.jpg', size: 'medium' },
    { id: 'schnauzer', name: 'Schnauzer', description: 'A medium-sized breed known for its intelligence and loyalty.', image: '/img/Breed/medium/Schnauzer.jpg', size: 'medium' },
    { id: 'thai-bangkaew', name: 'Thai Bangkaew', description: 'A loyal and protective breed from Thailand.', image: '/img/Breed/medium/ThaiBangkaew.jpg', size: 'medium' },
    { id: 'thai-ridgeback', name: 'Thai Ridgeback', description: 'A distinctive breed known for its ridge of hair along its back.', image: '/img/Breed/medium/ThaiRidgeback.jpg', size: 'medium' },

    // Large Dog Breeds
    { id: 'afghan-hound', name: 'Afghan Hound', description: 'An elegant breed known for its long, silky coat.', image: '/img/Breed/large/AfghanHound.jpg', size: 'large' },
    { id: 'akita-inu', name: 'Akita Inu', description: 'A large and powerful breed known for its loyalty.', image: '/img/Breed/large/AkitaInu.jpg', size: 'large' },
    { id: 'alaskan-malamute', name: 'Alaskan Malamute', description: 'A strong, athletic breed built for endurance.', image: '/img/Breed/large/AlaskanMalamute.jpg', size: 'large' },
    { id: 'bernese-mountain-dog', name: 'Bernese Mountain Dog', description: 'A large, tri-colored breed known for its gentle nature.', image: '/img/Breed/large/BerneseMountainDog.jpg', size: 'large' },
    { id: 'borzoi', name: 'Borzoi', description: 'A tall, elegant breed known for its hunting instincts.', image: '/img/Breed/large/Borzoi.jpg', size: 'large' },
    { id: 'boxer', name: 'Boxer', description: 'A muscular breed known for its playful and loyal nature.', image: '/img/Breed/large/Boxer.jpg', size: 'large' },
    { id: 'doberman', name: 'Doberman', description: 'A large, muscular breed known for its intelligence and loyalty.', image: '/img/Breed/large/Doberman.jpg', size: 'large' },
    { id: 'german-shepherd', name: 'German Shepherd', description: 'A large, intelligent breed known for its loyalty and protective nature.', image: '/img/Breed/large/GermanShepherd.jpg', size: 'large' },
    { id: 'golden-retriever', name: 'Golden Retriever', description: 'A large, friendly breed known for its playful nature.', image: '/img/Breed/large/GoldenRetriever.jpg', size: 'large' },
    { id: 'great-dane', name: 'Great Dane', description: 'A large, gentle breed known for its imposing size.', image: '/img/Breed/large/GreatDane.jpg', size: 'large' },
    { id: 'greyhound', name: 'Greyhound', description: 'A large, slender breed known for its speed.', image: '/img/Breed/large/Greyhound.jpg', size: 'large' },
    { id: 'labrador-retriever', name: 'Labrador Retriever', description: 'A large, friendly breed known for its playful nature.', image: '/img/Breed/large/LabradorRetriever.jpg', size: 'large' },
    { id: 'landseer', name: 'Landseer', description: 'A large, Newfoundland-type dog breed.', image: '/img/Breed/large/Landseer.jpg', size: 'large' },
    { id: 'mastiff', name: 'Mastiff', description: 'A large, muscular breed known for its loyalty and protective nature.', image: '/img/Breed/large/Mastiff.jpg', size: 'large' },
    { id: 'newfoundland', name: 'Newfoundland', description: 'A large, gentle breed known for its water-loving nature.', image: '/img/Breed/large/Newfoundland.jpg', size: 'large' },
    { id: 'rottweiler', name: 'Rottweiler', description: 'A large, muscular breed known for its loyalty and protective nature.', image: '/img/Breed/large/Rottweiler.jpg', size: 'large' },
    { id: 'saint-bernard', name: 'Saint Bernard', description: 'A large, gentle breed known for its rescue work in the mountains.', image: '/img/Breed/large/SaintBernard.jpg', size: 'large' },
];

export default function DogBreedsPage() {
    const params = useParams();
    const initialSize = params.size as 'small' | 'medium' | 'large' | 'all';
    const [selectedSize, setSelectedSize] = useState<'all' | 'small' | 'medium' | 'large'>(initialSize);
    const mainRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const main = mainRef.current;
            const items = itemsRef.current;

            items.forEach((item, index) => {
                if (item) {
                    const txt = item.querySelector('.txt');
                    const thumb = item.querySelector('.thumb');
                    const img = thumb?.querySelector('img');
                    const overlay = item.querySelector('.overlay');
                    const hit = item.querySelector('.hit');

                    gsap.fromTo(img, { xPercent: -18 }, {
                        scrollTrigger: {
                            trigger: item,
                            start: '0 100%',
                            end: '100% 0',
                            horizontal: true,
                            scrub: 0
                        },
                        xPercent: 0,
                        ease: 'none'
                    });

                    item.onpointerenter = (e) => {
                        gsap.to(overlay, { opacity: 0.5 });
                        gsap.to(img, { duration: 0.3, scale: 1.2, overwrite: 'auto', ease: 'back' });
                        gsap.to(item.querySelector('h2'), { color: 'rgb(160,180,225)' });
                        gsap.to(item.querySelector('.item-info'), { opacity: 0.6 });
                        gsap.to([thumb, txt], { ease: 'power3', yPercent: [-6], overwrite: 'auto' });
                    };

                    item.onpointermove = (e) => {
                        const xp = gsap.utils.interpolate(-40, 20, (e as MouseEvent).offsetX / 500);
                        const yp = gsap.utils.interpolate(-40, 40, (e as MouseEvent).offsetY / 400);
                        gsap.to(overlay, { duration: 0.7, ease: 'power2', x: xp * 4, y: yp * 4 });
                        gsap.to([hit, thumb], { duration: 0.7, ease: 'power2', x: xp, y: yp });
                        gsap.to([img], { duration: 0.7, ease: 'power2', x: -xp / 1.3, y: -yp / 1.3 });
                        gsap.to(txt, { duration: 0.7, x: xp, y: yp });
                    };

                    item.onpointerleave = (e) => {
                        gsap.to(overlay, { opacity: 0, x: 0, y: 0, overwrite: 'auto' });
                        gsap.to(img, { duration: 0.3, scale: 1, x: 0, y: 0, overwrite: 'auto' });
                        gsap.to(item.querySelector('h2'), { color: 'rgb(255,255,255)' });
                        gsap.to(item.querySelector('.item-info'), { opacity: 0.2 });
                        gsap.to([hit, thumb, txt], { duration: 0.7, x: 0, y: 0, yPercent: 0, ease: 'elastic.out(0.8)', overwrite: 'auto' });
                    };
                }
            });

            gsap.timeline()
                .to(main, { opacity: 1 })
                .from('.item', { x: window.innerWidth, skewX: 20, stagger: 0.2, duration: 1, ease: 'elastic.out(0.3)' }, 0.4)
                .from('.txt', { x: window.innerWidth, stagger: 0.2, duration: 1, ease: 'elastic.out(0.2)' }, 0.44)
                .set(main, { pointerEvents: 'auto' }, 1);

            gsap.set('.item', { transformOrigin: '50% 0' });
        }
    }, [selectedSize]);

    const filteredBreeds = selectedSize === 'all'
        ? [...dogBreeds].sort((a, b) => a.name.localeCompare(b.name))
        : dogBreeds.filter(breed => breed.size === selectedSize);

    return (
        <div className="min-h-screen bg-[#191814] text-white font-poppins">
            <div className="w-full bg-[#191814] p-4 md:p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    Dog Breeds
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                    A Guide to Adorable Companions
                </h2>
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <p className="text-lg md:text-xl leading-relaxed">
                        Explore our comprehensive collection of dog breeds, from small and cuddly companions to large and majestic guardians. Each breed offers unique characteristics and personalities, perfect for various lifestyles and preferences. Whether you're looking for a playful family pet, a loyal companion, or a working dog, you'll find a breed that matches your needs and captures your heart.
                    </p>
                </div>
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        className={`px-4 py-2 rounded-lg ${selectedSize === 'all' ? 'bg-white text-[#191814]' : 'bg-[#191814] text-white border border-white'}`}
                        onClick={() => setSelectedSize('all')}
                    >
                        All Breeds
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${selectedSize === 'small' ? 'bg-white text-[#191814]' : 'bg-[#191814] text-white border border-white'}`}
                        onClick={() => setSelectedSize('small')}
                    >
                        Small Breeds
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${selectedSize === 'medium' ? 'bg-white text-[#191814]' : 'bg-[#191814] text-white border border-white'}`}
                        onClick={() => setSelectedSize('medium')}
                    >
                        Medium Breeds
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${selectedSize === 'large' ? 'bg-white text-[#191814]' : 'bg-[#191814] text-white border border-white'}`}
                        onClick={() => setSelectedSize('large')}
                    >
                        Large Breeds
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <main ref={mainRef} className="flex items-center flex-row opacity-0 w-max">
                    {filteredBreeds.map((breed, index) => (
                        <div key={breed.id} ref={(el) => (itemsRef.current[index] = el)} className="item w-[500px] h-[400px] m-[50px] block relative">
                            <div className="thumb w-[500px] h-[250px] overflow-hidden pointer-events-none">
                                <Image src={breed.image} alt={breed.name} width={750} height={250} objectFit="cover" />
                                <div className="overlay absolute top-[-75px] left-0 w-[500px] h-[500px] bg-radial-gradient opacity-0 mix-blend-overlay"></div>
                            </div>
                            <div className="txt pointer-events-auto">
                                <h2 className="item-head text-2xl font-bold mb-2">{breed.name}</h2>
                                <div className="item-info opacity-20 tracking-wide mb-4">{breed.description}</div>
                                <Link href={`/breeds/${breed.size}/${breed.id}`} passHref>
                                    <button className="learn-more mt-10 px-6 py-3 bg-white text-[#191814] border-none rounded-lg text-lg font-bold cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-black relative z-20 pointer-events-auto">
                                        Learn More
                                    </button>
                                </Link>
                            </div>
                            <div className="hit bg-transparent w-[540px] h-[340px] absolute top-[-20px] left-[-20px]"></div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}

