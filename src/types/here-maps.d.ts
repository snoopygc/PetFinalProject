declare namespace H {
    namespace service {
        class Platform {
            constructor(options: { apikey: string });
            createDefaultLayers(): any;
        }
    }

    namespace Map {
        type PixelRatio = number;
        type Center = { lat: number; lng: number };
    }

    class Map {
        constructor(
            element: HTMLElement,
            layer: any,
            options?: {
                zoom?: number;
                center?: { lat: number; lng: number };
                pixelRatio?: number;
            }
        );
        dispose(): void;
        removeObjects(objects: any[]): void;
        getObjects(): any[];
        addObject(object: any): void;
        setCenter(center: { lat: number; lng: number }): void;
        getViewPort(): { resize(): void };
    }

    namespace mapevents {
        class MapEvents {
            constructor(map: H.Map);
        }
        class Behavior {
            constructor(events: MapEvents);
        }
    }

    namespace map {
        class Marker {
            constructor(coords: { lat: number; lng: number });
        }
    }
}

