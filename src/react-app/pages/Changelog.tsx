import PageLayout from '@/react-app/components/PageLayout';
import { Rss } from 'lucide-react';

export default function Changelog() {
    return (
        <PageLayout title="Changelog">
            <div className="mb-8 flex justify-between items-center bg-gray-50 p-4 rounded-lg -mt-4 border border-gray-100">
                <p className="text-sm text-gray-500 m-0">
                    Stay up to date with the latest improvements and features.
                </p>
                <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors no-underline">
                    <Rss className="w-4 h-4" />
                    Subscribe
                </a>
            </div>

            <div className="space-y-16 max-w-3xl border-l border-gray-200 pl-8 ml-4 md:ml-0 relative py-2">
                {/* Entry: v1.1.0 */}
                <div className="relative">
                    <div className="absolute -left-[41px] bg-blue-600 rounded-full w-5 h-5 border-4 border-white top-1"></div>
                    <time className="block text-sm text-gray-500 mb-2 font-mono">December 6, 2025</time>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-0">v1.1.0 — Visual Refinements & Mobile Polish</h2>

                    <div className="space-y-6">
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-0">Enhanced UI Experience</h3>
                            <p className="mt-0">
                                We've cleaned up the interface significantly. Heavy borders have been removed in favor of better spacing and cleaner lines, giving the entire application a more modern and breathable feel.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-0">Mobile Improvements</h3>
                            <p className="mt-0">
                                Creating favicons on the go is now easier than ever. We've optimized the Image Cropper and its controls specifically for mobile devices, ensuring a smooth experience whether you're on a phone or tablet.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-0">Quality of Life</h3>
                            <p className="mt-0">
                                We've updated our core engine to the latest secure versions for better performance. We also resolved several display issues and polished the interactions for a snappier feel.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Entry: v1.0.0 */}
                <div className="relative">
                    <div className="absolute -left-[41px] bg-gray-200 rounded-full w-5 h-5 border-4 border-white top-1"></div>
                    <time className="block text-sm text-gray-500 mb-2 font-mono">November 20, 2024</time>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-0">v1.0.0 — Initial Release</h2>
                    <p className="text-gray-600 mt-0">
                        FavIconFactory is live! Generate professional, pixel-perfect favicons entirely in your browser without uploading your files. Features include smart cropping, seasonal effects, and automated format generation.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
