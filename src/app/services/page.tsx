"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicGh0cnMiLCJhIjoiY200a3JzNmNwMHF5MjJscHRzNHN0aGptZiJ9.pRmC1vCjW1B3Ol4lAF47HA';

// Service data structure (same as previous code)
const servicesData = {
    'Bang Phlat': [
        { id: '1', name: 'Thonburi Small Animal Hospital', type: 'Hospital', address: '62/161-162 Borommaratchachonnani Rd, Khwaeng Bang Phlat, Khet Bang Phlat, Bangkok 10700', lat: 13.7782, lng: 100.4678, tel: '02-886-6251', openingHours: '24/7' },

        { id: '2', name: 'Pet Space Animal Hospital', type: 'Hospital', address: '49 Charan Sanitwong Rd, Khwaeng Bang Phlat, Khet Bang Phlat, Bangkok 10700', lat: 13.7729, lng: 100.4747, tel: '02-434-2798', openingHours: 'Mon-Sun: 9AM-9PM' },
        
        { id: '3', name: 'Petsville', type: 'Shop', address: '62/237 Borommaratchachonnani Rd, Khwaeng Bang Phlat, Khet Bang Phlat, Bangkok 10700', lat: 13.7784, lng: 100.4676, tel: '02-433-7600', openingHours: 'Mon-Sun: 10AM-8PM' },
    ],
    'Thawi Watthana': [
        { id: '4', name: 'Thawi Watthana Animal Hospital', type: 'Hospital', address: '29/8 Moo 6, Borommaratchachonnani Rd, Thawi Watthana, Bangkok 10170', lat: 13.7768, lng: 100.3550, tel: '02-885-5454', openingHours: 'Mon-Sat: 9AM-8PM, Sun: 9AM-5PM' },
        { id: '5', name: 'Pet Focus', type: 'Clinic', address: '99/8 Moo 13, Borommaratchachonnani Rd, Sala Thammasop, Thawi Watthana, Bangkok 10170', lat: 13.7745, lng: 100.3572, tel: '02-888-5533', openingHours: 'Mon-Sat: 10AM-8PM, Sun: 10AM-6PM' },
        { id: '6', name: 'Pawsome Pet Shop', type: 'Shop', address: '170 Moo 3, Phutthamonthon Sai 2 Rd, Sala Thammasop, Thawi Watthana, Bangkok 10170', lat: 13.7790, lng: 100.3595, tel: '02-889-3366', openingHours: 'Daily: 9AM-9PM' },
    ],
    'Bang Rak': [
        { id: '7', name: 'Bang Rak Pet Clinic', type: 'Clinic', address: '111 Silom Rd', lat: 13.7246, lng: 100.5252, tel: '02-789-0123', openingHours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM' },
        { id: '8', name: 'Silom Pet Grooming', type: 'Grooming', address: '222 Suriwong Rd', lat: 13.7238, lng: 100.5230, tel: '02-890-1234', openingHours: 'Tue-Sun: 9AM-6PM, Closed on Mondays' },
        { id: '9', name: 'Bang Rak Animal Hospital', type: 'Hospital', address: '333 Charoen Krung Rd', lat: 13.7271, lng: 100.5156, tel: '02-901-2345', openingHours: '24/7' },
    ],
    'Phra Nakhon': [
        { id: '10', name: 'Royal Pet Clinic', type: 'Clinic', address: '444 Phra Sumen Rd', lat: 13.7614, lng: 100.4972, tel: '02-012-3456', openingHours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-4PM' },
        { id: '11', name: 'Khao San Pet Shop', type: 'Shop', address: '555 Rambuttri Rd', lat: 13.7589, lng: 100.4954, tel: '02-123-4567', openingHours: 'Daily: 10AM-10PM' },
        { id: '12', name: 'Rattanakosin Pet Hotel', type: 'Hotel', address: '666 Maha Chai Rd', lat: 13.7516, lng: 100.5016, tel: '02-234-5678', openingHours: '24/7' },
    ],
    'Bang Khen': [
        { id: '13', name: 'Bang Khen Veterinary Hospital', type: 'Hospital', address: '777 Phahonyothin Rd', lat: 13.8468, lng: 100.5825, tel: '02-345-6789', openingHours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM' },
        { id: '14', name: 'Soi Dog Training Center', type: 'Training', address: '888 Kamphaeng Phet 6 Rd', lat: 13.8520, lng: 100.5730, tel: '02-456-7890', openingHours: 'Mon-Fri: 10AM-6PM, Sat: 10AM-3PM, Closed on Sundays' },
        { id: '15', name: 'Laksi Pet Supplies', type: 'Shop', address: '999 Chaeng Watthana Rd', lat: 13.8879, lng: 100.5681, tel: '02-567-8901', openingHours: 'Daily: 9AM-9PM' },
    ],
    'Lad Krabang': [
        { id: '16', name: 'Lad Krabang Pet Hospital', type: 'Hospital', address: '101 Lad Krabang Rd', lat: 13.7280, lng: 100.7520, tel: '02-678-9012', openingHours: '24/7' },
        { id: '17', name: 'Airport Pet Hotel', type: 'Hotel', address: '202 Romklao Rd', lat: 13.7210, lng: 100.7470, tel: '02-789-0123', openingHours: '24/7' },
        { id: '18', name: 'Suvarnabhumi Pet Clinic', type: 'Clinic', address: '303 On Nut Rd', lat: 13.7320, lng: 100.7580, tel: '02-890-1234', openingHours: 'Mon-Sat: 9AM-6PM, Closed on Sundays' },
    ],
    'Pom Prap Sattru Phai': [
        { id: '19', name: 'Bobae Pet Shop', type: 'Shop', address: '404 Krung Kasem Rd', lat: 13.7520, lng: 100.5130, tel: '02-901-2345', openingHours: 'Mon-Sat: 8AM-7PM, Sun: 9AM-5PM' },
        { id: '20', name: 'Nang Loeng Animal Clinic', type: 'Clinic', address: '505 Nakhon Sawan Rd', lat: 13.7580, lng: 100.5080, tel: '02-012-3456', openingHours: 'Mon-Fri: 9AM-7PM, Sat: 9AM-3PM, Closed on Sundays' },
        { id: '21', name: 'Pom Prap Pet Grooming', type: 'Grooming', address: '606 Lan Luang Rd', lat: 13.7540, lng: 100.5060, tel: '02-123-4567', openingHours: 'Tue-Sun: 10AM-8PM, Closed on Mondays' },
    ],
    'Phaya Thai': [
        { id: '22', name: 'Victory Monument Vet', type: 'Clinic', address: '707 Phaya Thai Rd', lat: 13.7650, lng: 100.5370, tel: '02-234-5678', openingHours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-4PM' },
        { id: '23', name: 'Ratchathewi Pet Hospital', type: 'Hospital', address: '808 Petchaburi Rd', lat: 13.7510, lng: 100.5320, tel: '02-345-6789', openingHours: '24/7' },
        { id: '24', name: 'Soi Ari Pet Supplies', type: 'Shop', address: '909 Ari Samphan Soi 5', lat: 13.7790, lng: 100.5450, tel: '02-456-7890', openingHours: 'Daily: 9AM-9PM' },
    ],
    'Bang Sue': [
        { id: '25', name: 'Tao Poon Pet Clinic', type: 'Clinic', address: '1010 Pracha Rat Sai 2 Rd', lat: 13.8020, lng: 100.5280, tel: '02-567-8901', openingHours: 'Mon-Fri: 9AM-7PM, Sat: 9AM-5PM, Closed on Sundays' },
        { id: '26', name: 'Bang Sue Grand Station Pet Hotel', type: 'Hotel', address: '1111 Kamphaeng Phet 2 Rd', lat: 13.8030, lng: 100.5400, tel: '02-678-9012', openingHours: '24/7' },
        { id: '27', name: 'Wong Sawang Animal Hospital', type: 'Hospital', address: '1212 Rim Khlong Prapa Rd', lat: 13.8270, lng: 100.5340, tel: '02-789-0123', openingHours: '24/7' },
    ],
    'Samphanthawong': [
        { id: '28', name: 'Yaowarat Pet Shop', type: 'Shop', address: '1313 Yaowarat Rd', lat: 13.7410, lng: 100.5110, tel: '02-890-1234', openingHours: 'Daily: 10AM-10PM' },
        { id: '29', name: 'Talad Noi Veterinary Clinic', type: 'Clinic', address: '1414 Charoen Krung Rd', lat: 13.7370, lng: 100.5140, tel: '02-901-2345', openingHours: 'Mon-Sat: 9AM-6PM, Closed on Sundays' },
        { id: '30', name: 'Ratchawong Pet Grooming', type: 'Grooming', address: '1515 Song Wat Rd', lat: 13.7390, lng: 100.5070, tel: '02-012-3456', openingHours: 'Tue-Sun: 10AM-7PM, Closed on Mondays' },
    ],
    'Pathum Wan': [
        { id: '31', name: 'Siam Paragon Pet Hospital', type: 'Hospital', address: '1616 Rama I Rd', lat: 13.7460, lng: 100.5340, tel: '02-123-4567', openingHours: '24/7' },
        { id: '32', name: 'Chulalongkorn Vet Clinic', type: 'Clinic', address: '1717 Phaya Thai Rd', lat: 13.7420, lng: 100.5300, tel: '02-234-5678', openingHours: 'Mon-Fri: 8AM-8PM, Sat: 9AM-5PM, Closed on Sundays' },
        { id: '33', name: 'Ratchadamri Pet Hotel', type: 'Hotel', address: '1818 Ratchadamri Rd', lat: 13.7440, lng: 100.5390, tel: '02-345-6789', openingHours: '24/7' },
    ],
    'Watthana': [
        { id: '34', name: 'Watthana Veterinary Hospital', type: 'Hospital', address: '123 Sukhumvit 71 Rd', lat: 13.7172, lng: 100.5942, tel: '02-456-7890', openingHours: '24/7' },
        { id: '35', name: 'Thong Lo Pet Clinic', type: 'Clinic', address: '456 Sukhumvit 55 Rd', lat: 13.7372, lng: 100.5825, tel: '02-567-8901', openingHours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM' },
        { id: '36', name: 'Ekkamai Pet Supplies', type: 'Shop', address: '789 Sukhumvit 63 Rd', lat: 13.7255, lng: 100.5859, tel: '02-678-9012', openingHours: 'Daily: 10AM-9PM' },
    ],
    'Lat Phrao': [
        { id: '37', name: 'Lat Phrao Animal Hospital', type: 'Hospital', address: '101 Lat Phrao Rd', lat: 13.8166, lng: 100.5951, tel: '02-789-0123', openingHours: '24/7' },
        { id: '38', name: 'Chokchai 4 Pet Clinic', type: 'Clinic', address: '202 Lat Phrao 53', lat: 13.8084, lng: 100.5944, tel: '02-890-1234', openingHours: 'Mon-Sat: 10AM-8PM, Sun: 10AM-5PM' },
        { id: '39', name: 'Wang Hin Pet Shop', type: 'Shop', address: '303 Lat Phrao 101', lat: 13.7989, lng: 100.6364, tel: '02-901-2345', openingHours: 'Daily: 9AM-8PM' },
    ],
    'Phra Khanong': [
        { id: '40', name: 'On Nut Pet Hospital', type: 'Hospital', address: '404 Sukhumvit 77 Rd', lat: 13.7066, lng: 100.6019, tel: '02-012-3456', openingHours: '24/7' },
        { id: '41', name: 'Phra Khanong Vet Clinic', type: 'Clinic', address: '505 Sukhumvit 71 Rd', lat: 13.7142, lng: 100.5945, tel: '02-123-4567', openingHours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-5PM' },
        { id: '42', name: 'Udomsuk Pet Grooming', type: 'Grooming', address: '606 Sukhumvit 103 Rd', lat: 13.6799, lng: 100.6144, tel: '02-234-5678', openingHours: 'Tue-Sun: 10AM-8PM, Closed on Mondays' },
    ],
    'Suan Luang': [
        { id: '43', name: 'Suan Luang Animal Hospital', type: 'Hospital', address: '707 Phatthanakan Rd', lat: 13.7324, lng: 100.6425, tel: '02-345-6789', openingHours: '24/7' },
        { id: '44', name: 'Pattanakarn Pet Clinic', type: 'Clinic', address: '808 Phatthanakan 41', lat: 13.7385, lng: 100.6330, tel: '02-456-7890', openingHours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM' },
        { id: '45', name: 'Suan Luang Pet Supplies', type: 'Shop', address: '909 Phatthanakan 35', lat: 13.7399, lng: 100.6268, tel: '02-567-8901', openingHours: 'Daily: 9AM-9PM' },
    ],
};

const ServicePage = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('Bang Phlat');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedService, setSelectedService] = useState(null);
    const mapContainer = useRef(null);
    const map = useRef(null);

    const serviceTypes = ['All', 'Hospital', 'Clinic', 'Shop', 'Hotel', 'Grooming', 'Training'];

    const filteredServices = selectedType === 'All'
        ? servicesData[selectedDistrict]
        : servicesData[selectedDistrict]?.filter(service => service.type === selectedType);

    // Initialize map and markers
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [100.5018, 13.7563], // Bangkok center
            zoom: 10
        });

        // Add zoom and rotation controls
        map.current.addControl(new mapboxgl.NavigationControl());
    }, []);

    // Update markers when district or type changes
    useEffect(() => {
        if (!map.current) return;

        // Remove existing markers
        const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
        while (existingMarkers.length > 0) {
            existingMarkers[0].remove();
        }

        // Add new markers
        filteredServices?.forEach(service => {
            const marker = new mapboxgl.Marker()
                .setLngLat([service.lng, service.lat])
                .addTo(map.current);

            // Add click event to marker
            marker.getElement().addEventListener('click', () => {
                // Center and zoom to the selected service
                map.current.flyTo({
                    center: [service.lng, service.lat],
                    zoom: 15
                });
                setSelectedService(service);
            });
        });

        // If there are services, fly to the first one
        if (filteredServices && filteredServices.length > 0) {
            const firstService = filteredServices[0];
            map.current.flyTo({
                center: [firstService.lng, firstService.lat],
                zoom: 12
            });
        }
    }, [selectedDistrict, selectedType, filteredServices]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Pet Services in Bangkok</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left sidebar - District selection */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Districts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {Object.keys(servicesData).map(district => (
                                    <button
                                        key={district}
                                        onClick={() => setSelectedDistrict(district)}
                                        className={`w-full text-left px-4 py-2 rounded ${selectedDistrict === district
                                                ? 'bg-blue-500 text-white'
                                                : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        {district}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Map Container */}
                    <Card>
                        <CardContent className="p-0">
                            <div 
                                ref={mapContainer} 
                                className="w-full h-[500px]"
                            />
                        </CardContent>
                    </Card>

                    {/* Service type filter */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Filter by Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {serviceTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-4 py-2 rounded ${selectedType === type
                                                ? 'bg-blue-500 text-white'
                                                : 'border border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Service listings */}
                    <div className="space-y-4">
                        {filteredServices?.map(service => (
                            <Card 
                                key={service.id}
                                onClick={() => {
                                    // Center map on clicked service
                                    map.current.flyTo({
                                        center: [service.lng, service.lat],
                                        zoom: 15
                                    });
                                    setSelectedService(service);
                                }}
                                className={`cursor-pointer ${selectedService?.id === service.id 
                                    ? 'border-2 border-blue-500' 
                                    : 'hover:bg-gray-50'}`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                                            <p className="text-blue-600 mb-4">{service.type}</p>

                                            <div className="space-y-2 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{service.address}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{service.tel}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{service.openingHours}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
