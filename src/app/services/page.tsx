'use client'

import { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

// Define the structure for a service
interface Service {
    id: string
    name: string
    type: string
    address: string
    lat: number
    lng: number
}

// Define the structure for map centers
interface MapCenters {
    [key: string]: { lat: number; lng: number }
}

// Mock data for services in Bang Phlat and Thawi Watthana
const services: Record<string, Service[]> = {
    'Bang Phlat': [
        { id: '1', name: 'Pet Hospital A', type: 'Hospital', address: '123 Bang Phlat Rd', lat: 13.7934, lng: 100.4851 },
        { id: '2', name: 'Grooming Salon B', type: 'Grooming', address: '456 Bang Phlat Soi 5', lat: 13.7912, lng: 100.4872 },
        { id: '3', name: 'Pet Shop C', type: 'Shop', address: '789 Bang Phlat Main St', lat: 13.7956, lng: 100.4890 },
    ],
    'Thawi Watthana': [
        { id: '4', name: 'Vet Clinic D', type: 'Clinic', address: '321 Thawi Watthana Rd', lat: 13.7768, lng: 100.3550 },
        { id: '5', name: 'Pet-Friendly Hotel E', type: 'Hotel', address: '654 Thawi Watthana Soi 10', lat: 13.7745, lng: 100.3572 },
        { id: '6', name: 'Training Center F', type: 'Training', address: '987 Thawi Watthana Main St', lat: 13.7790, lng: 100.3595 },
    ],
}

const districts = ['Bang Phlat', 'Thawi Watthana'] as const
type District = typeof districts[number]

const mapCenter: MapCenters = {
    'Bang Phlat': { lat: 13.7934, lng: 100.4851 },
    'Thawi Watthana': { lat: 13.7768, lng: 100.3550 },
}

export default function ServicesPage() {
    const [selectedDistrict, setSelectedDistrict] = useState<District>('Bang Phlat')
    const mapRef = useRef<HTMLDivElement>(null)
    const map = useRef<H.Map | null>(null)
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const [mapError, setMapError] = useState<string | null>(null)

    useEffect(() => {
        if (!window.H || !mapRef.current || map.current) return

        const initMap = () => {
            try {
                // Initialize HERE Map
                const platform = new H.service.Platform({
                    apikey: '573CgJzdDc19mqroe7DY3OPsGck51GwFcIWTUAJrrkE'
                })

                const defaultLayers = platform.createDefaultLayers()

                if (mapRef.current) {
                    // Create map instance
                    map.current = new H.Map(
                        mapRef.current,
                        defaultLayers.vector.normal.map,
                        {
                            center: mapCenter[selectedDistrict],
                            zoom: 14,
                            pixelRatio: window.devicePixelRatio || 1
                        }
                    )

                    // Enable map interaction (pan, zoom, pinch-to-zoom)
                    new H.mapevents.Behavior(new H.mapevents.MapEvents(map.current))

                    // Add a resize listener to make sure the map occupies the whole container
                    window.addEventListener('resize', () => map.current?.getViewPort().resize())
                    setIsMapLoaded(true)
                } else {
                    setMapError('Failed to initialize the map. Map container not found.')
                }
            } catch (error) {
                console.error('Error initializing map:', error)
                setMapError('Failed to initialize the map. Please check your WebGL support.')
            }
        }

        // Attempt to initialize the map after a short delay
        setTimeout(initMap, 100)

        // Clean up function
        return () => {
            if (map.current) {
                map.current.dispose()
                map.current = null
            }
        }
    }, [selectedDistrict])

    useEffect(() => {
        if (!map.current || !isMapLoaded) return

        // Clear existing objects on the map
        map.current.removeObjects(map.current.getObjects())

        // Add markers for the selected district
        services[selectedDistrict].forEach(service => {
            const marker = new H.map.Marker({ lat: service.lat, lng: service.lng })
            map.current?.addObject(marker)
        })

        // Set the map's center to the selected district
        map.current.setCenter(mapCenter[selectedDistrict])
    }, [selectedDistrict, isMapLoaded])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Pet Services in Bangkok</h1>

            <div className="mb-4">
                <Select
                    onValueChange={(value: string) => setSelectedDistrict(value as District)}
                    defaultValue={selectedDistrict}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                    <SelectContent>
                        {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                                {district}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Map</CardTitle>
                        <CardDescription>Pet services in {selectedDistrict}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {mapError ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{mapError}</AlertDescription>
                            </Alert>
                        ) : (
                            <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Services List</CardTitle>
                        <CardDescription>Available pet services in {selectedDistrict}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {services[selectedDistrict].map((service) => (
                                <li key={service.id} className="border-b pb-2">
                                    <h3 className="font-semibold">{service.name}</h3>
                                    <p className="text-sm text-gray-600">{service.type}</p>
                                    <p className="text-sm">{service.address}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

