import PageLayout from '@/react-app/components/PageLayout';
import { Mail } from 'lucide-react';

export default function ContactSupport() {
    return (
        <PageLayout title="Contact Support">
            <div className="max-w-2xl">
                <p className="text-xl text-gray-600 mb-8">
                    Have questions, suggestions, or found a bug? We'd love to hear from you.
                </p>

                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-4">
                            The best way to reach us is via email. We typically respond within 24-48 hours.
                        </p>
                        <a
                            href="mailto:support@favicon.love"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            support@favicon.love
                        </a>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-gray-900">Is this tool really free?</h3>
                            <p className="text-gray-600">Yes, favicon.love is 100% free for both personal and commercial use.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Why isn't my animated favicon working?</h3>
                            <p className="text-gray-600">
                                Animated favicons (SVG) are supported in most modern browsers but not all (e.g., Safari).
                                Make sure you've included the fallback .ico or .png files in your HTML.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
