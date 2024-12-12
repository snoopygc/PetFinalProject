'use client'

import { useEffect, useRef, useState } from 'react'
import fitty from 'fitty'

export default function PetNameDisplay({ name }: { name: string }) {
    const dinerRef = useRef<HTMLHeadingElement>(null)
    const counterRef = useRef<HTMLDivElement>(null)
    const [dishes, setDishes] = useState<Array<{ emoji: string; offset: number; delay: number; id: number }>>([])
    const [finished, setFinished] = useState(0)

    const menu = ['🍔', '🌭', '🍕', '🍗', '🌮', '🍔']
    const noms = ['nom', 'nom!', 'nom!!', 'nommm', 'nommy']

    useEffect(() => {
        const duplicatedMenu = [...menu, ...menu]
            .sort(() => 0.5 - Math.random())
            .concat(['🐝'])
            .map((menuItem, i) => ({
                emoji: menuItem,
                offset: 33.33 + (Math.random() * 33.33),
                delay: (i * 200) + Math.random() * 100,
                id: i
            }))

        setDishes(duplicatedMenu)

        if (dinerRef.current) {
            const fitInstance = fitty(dinerRef.current, {
                minSize: 24 // Reduced from 32
            })

            fitInstance.element.addEventListener('fit', jelly)
        }

        const timer = setTimeout(() => {
            setDishes(prev => prev.map(dish => ({ ...dish, dropped: true })))
        }, 500)

        return () => {
            clearTimeout(timer)
            if (dinerRef.current) {
                dinerRef.current.removeEventListener('fit', jelly)
            }
        }
    }, [])

    const jelly = (e: any) => {
        if (dinerRef.current) {
            dinerRef.current.animate(
                [
                    { transform: `scale(${1 / e.detail.scaleFactor})` },
                    { transform: 'scale(1.1)' },
                    { transform: 'scale(.9)' },
                    { transform: 'scale(1.05)' },
                    { transform: 'scale(.98)' },
                    { transform: 'scale(1)' }
                ],
                { duration: 500 }
            )
        }
    }

    const nom = (index: number) => {
        const nommer = document.getElementById(`nommer-${index}`)
        const rotation = -20 + (Math.random() * 40)
        const scale = .75 + (Math.random() * .5)

        if (nommer) {
            nommer.animate(
                [
                    { opacity: 0, transform: `scale(${.25 * scale}) rotateZ(${rotation}deg) translateY(0)` },
                    { opacity: 1, transform: `scale(${scale}) rotateZ(${rotation}deg) translateY(-.5em)` }
                ],
                { duration: 250 }
            )
        }

        if (dinerRef.current) {
            dinerRef.current.animate(
                [
                    { transform: 'scaleY(1)' },
                    { transform: `scaleY(${.7 + (Math.random() * .2)})` },
                    { transform: 'scaleY(1)' }
                ],
                { duration: 100 }
            )
        }
    }

    const burb = (id: number) => {
        setDishes(prev => prev.map(dish =>
            dish.id === id ? { ...dish, opacity: 0 } : dish
        ))

        setFinished(prev => {
            const newFinished = prev + 1
            if (newFinished === dishes.length) {
                if (dinerRef.current) {
                    fitty(dinerRef.current, { minSize: 24 }) // Reduced from 32
                }
            } else {
                nom(id)
            }
            return newFinished
        })
    }

    return (
        <div className="relative h-40 max-w-[28em] text-center mx-auto p-3"> {/* Reduced height from 48 to 40, width from 30em to 28em, padding from 4 to 3 */}
            <div ref={counterRef} className="relative pt-[15vh] mb-1 border-b-2 border-dashed border-[#d2d6dd]"> {/* Reduced pt from 20vh to 15vh, mb from 2 to 1 */}
                <div>
                    <h1
                        ref={dinerRef}
                        className="relative text-center m-0 leading-[0.625] z-[2] origin-bottom-center font-['American_Typewriter','Rockwell_Extra_Bold','Book_Antiqua',Georgia,serif] text-2xl" // Reduced from 3xl to 2xl
                    >
                        {name}
                    </h1>
                </div>

                {dishes.map((dish) => (
                    <div key={dish.id}>
                        <div
                            aria-hidden="true"
                            className="absolute w-[1em] h-[1em] mt-[-0.75em] ml-[-0.5em] text-lg top-0 transform -translate-y-12 transition-transform duration-750 ease-in z-[1]" // Reduced from xl to lg
                            style={{
                                left: `${dish.offset}%`,
                                transitionDelay: `${dish.delay}ms`,
                                transform: dish.dropped ? 'translateY(30vh)' : 'translateY(-3em)',
                                opacity: dish.opacity === 0 ? 0 : 1
                            }}
                            onTransitionEnd={() => burb(dish.id)}
                        >
                            {dish.emoji}
                        </div>
                        <div
                            id={`nommer-${dish.id}`}
                            aria-hidden="true"
                            className="absolute bottom-3 ml-[-1em] text-[rgba(0,0,0,0.5)] text-lg origin-bottom-center opacity-0" // Reduced from 4 to 3
                            style={{ left: `${dish.offset}%` }}
                        >
                            {noms[Math.floor(Math.random() * noms.length)]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

