import Script from 'next/script'

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <Script
                src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
                strategy="beforeInteractive"
            />
            {children}
        </section>
    )
}

