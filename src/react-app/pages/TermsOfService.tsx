import PageLayout from '@/react-app/components/PageLayout';

export default function TermsOfService() {
    return (
        <PageLayout title="Terms of Service">
            <div className="space-y-6">
                <p className="text-sm text-gray-500">Last updated: December 4, 2025</p>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using favicon.love ("the Service"), you accept and agree to be bound by the terms
                        and provision of this agreement.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Service</h2>
                    <p>
                        favicon.love is a free tool provided "as is". You are free to use the generated favicons for both
                        personal and commercial projects without attribution (though attribution is appreciated).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
                    <p>
                        You retain all rights to the images you upload and the favicons you generate. We claim no ownership
                        over your content. Since processing is done locally, we do not even have access to your content.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimer of Warranties</h2>
                    <p>
                        The Service is provided on an "as is" and "as available" basis. We do not warrant that the service
                        will be uninterrupted, timely, secure, or error-free. We are not responsible for any data loss or
                        damage resulting from the use of the generated files.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                    <p>
                        In no event shall favicon.love be liable for any direct, indirect, incidental, special, consequential,
                        or exemplary damages resulting from the use or the inability to use the service.
                    </p>
                </section>
            </div>
        </PageLayout>
    );
}
