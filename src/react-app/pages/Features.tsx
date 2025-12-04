import PageLayout from '@/react-app/components/PageLayout';

export default function Features() {
    return (
        <PageLayout title="Features">
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Client-Side Processing</h2>
                    <p>
                        Your privacy is our priority. Unlike other favicon generators, favicon.love processes all images directly in your browser.
                        Your original files never leave your device, ensuring maximum security and speed.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Cropping</h2>
                    <p>
                        Our intelligent cropping tool helps you select the perfect area of your image for a favicon.
                        With a 1:1 aspect ratio lock and intuitive controls, you can ensure your icon looks great at any size.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Multi-Format Export</h2>
                    <p>
                        Generate all the necessary files for modern web compatibility in a single click:
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>ICO:</strong> The standard format for legacy browser support.</li>
                        <li><strong>PNG:</strong> High-quality format for modern browsers and devices (16x16, 32x32, 192x192, 512x512).</li>
                        <li><strong>SVG:</strong> Scalable vector graphics for crisp display on any screen resolution.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Instant Preview</h2>
                    <p>
                        See exactly how your favicon will look in a browser tab, bookmarks bar, and mobile home screen before you download.
                        Our live preview updates instantly as you make changes.
                    </p>
                </section>
            </div>
        </PageLayout>
    );
}
