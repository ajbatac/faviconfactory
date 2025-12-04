import PageLayout from '@/react-app/components/PageLayout';

export default function PrivacyPolicy() {
    return (
        <PageLayout title="Privacy Policy">
            <div className="space-y-6">
                <p className="text-sm text-gray-500">Last updated: December 4, 2025</p>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
                    <p>
                        At favicon.love, we take your privacy seriously. This Privacy Policy explains how we handle your data
                        when you use our favicon generation service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Client-Side Processing</h2>
                    <p>
                        <strong>We do not upload your images to any server.</strong> All image processing happens locally
                        within your web browser using JavaScript. Your original images and the generated favicons never leave
                        your device.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Collection</h2>
                    <p>
                        Since we do not host a backend for image processing, we do not collect, store, or share any of the
                        images you process. We do not use cookies for tracking personal information.
                    </p>
                    <p className="mt-2">
                        We may use standard analytics tools (like Google Analytics) to track aggregate usage statistics
                        (e.g., number of visitors, page views) to help us improve the service. This data is anonymized
                        and does not contain any personal information or image data.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
                    <p>
                        Our website is hosted on standard web hosting infrastructure. While we do not collect data ourselves,
                        hosting providers may collect standard server logs (IP addresses, request times) for security and
                        operational purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                        the new Privacy Policy on this page.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us via our
                        <a href="/contact-support" className="text-blue-600 hover:underline ml-1">support page</a>.
                    </p>
                </section>
            </div>
        </PageLayout>
    );
}
