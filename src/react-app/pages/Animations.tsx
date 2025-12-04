import PageLayout from '@/react-app/components/PageLayout';

export default function Animations() {
    return (
        <PageLayout title="Animated Favicons">
            <p className="text-xl text-gray-600 mb-12">
                Stand out in the browser tab with eye-catching SVG animations.
                Supported by modern browsers, animated favicons are a great way to grab user attention.
            </p>

            <div className="space-y-12">
                <section className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pulse Animation</h2>
                        <p className="mb-4">
                            A subtle "heartbeat" effect that scales your icon up and down.
                            Great for notifications, live status indicators, or just adding a bit of life to your brand.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Customizable speed (Slow, Medium, Fast)</li>
                            <li>Smooth easing functions</li>
                            <li>Works with any image shape</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-lg animate-pulse shadow-lg"></div>
                    </div>
                </section>

                <section className="flex flex-col md:flex-row-reverse gap-8 items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Rotation Animation</h2>
                        <p className="mb-4">
                            A continuous rotation effect. Perfect for loading states, processing indicators,
                            or circular logos that look great in motion.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Adjustable rotation speed</li>
                            <li>Linear or eased timing</li>
                            <li>Perfect for circular icons</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full animate-spin shadow-lg"></div>
                    </div>
                </section>

                <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mt-12">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Browser Support Note</h3>
                    <p className="text-blue-800">
                        Animated favicons (SVG) are supported in most modern browsers like Chrome, Firefox, and Edge.
                        For browsers that don't support animation (like Safari), we automatically generate a static fallback image
                        so your site always looks professional.
                    </p>
                </section>
            </div>
        </PageLayout>
    );
}
