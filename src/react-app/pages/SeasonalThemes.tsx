import PageLayout from '@/react-app/components/PageLayout';

export default function SeasonalThemes() {
    return (
        <PageLayout title="Seasonal Themes">
            <p className="text-xl text-gray-600 mb-12">
                Keep your website fresh and engaging all year round with our one-click seasonal themes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="text-4xl mb-4">❄️</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Winter Wonderland</h3>
                    <p className="text-gray-600">
                        Add a touch of frost and snow to your favicon. Perfect for the holiday season or winter months.
                        The effect adds a subtle snowy overlay that works with any logo.
                    </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="text-4xl mb-4">❤️</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Valentine's Day</h3>
                    <p className="text-gray-600">
                        Spread the love with our Valentine theme. Adds heart accents and a warm, romantic tint to your icon.
                        Ideal for February promotions.
                    </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="text-4xl mb-4">🎃</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Halloween Spooktacular</h3>
                    <p className="text-gray-600">
                        Get spooky with our Halloween theme. Adds pumpkin orange tones and subtle cobweb effects
                        to get your site ready for trick-or-treaters.
                    </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Celebration</h3>
                    <p className="text-gray-600">
                        Celebrate milestones, anniversaries, or new years with the Celebration theme.
                        Adds confetti and vibrant colors to your brand mark.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
