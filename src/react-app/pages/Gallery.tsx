import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, Loader2, Eye, PenTool, Upload, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';

interface Submission {
    id: number;
    websiteUrl: string;
    email: string;
    createdAt: string;
    lovesCount: number;
    clicksCount: number;
    faviconImage: string | null;
}

const Gallery = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('/api/get-gallery');
                if (response.ok) {
                    const data = await response.json();
                    setSubmissions(data);
                }
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <PageLayout fullWidth>
            <div className="bg-white min-h-screen">
                {/* Header Section */}
                <div className="pt-0 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4"
                    >
                        Favicon Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        A curated collection of beautiful icons created by our community. Discover inspiration for your next project.
                    </motion.p>
                </div>

                {/* How it Works / Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PenTool className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">1. Create</h3>
                            <p className="text-sm text-gray-500">Design your perfect custom favicon with our <Link to="/" className="text-blue-600 hover:underline">free generator</Link>.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">2. Submit</h3>
                            <p className="text-sm text-gray-500">Download your files to unlock the submission form and join the queue.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">3. Showcase</h3>
                            <p className="text-sm text-gray-500">Your site appears instantly, gaining visibility and collecting love from the community.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Gallery Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-gray-500 text-lg">
                                No submissions yet. <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">Be the first to add yours!</Link>
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                            {submissions.map((item, index) => (
                                <GalleryCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="pb-24 text-center">
                    <Link
                        to="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-black transition-all transform hover:-translate-y-1"
                    >
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span>Generate Favicon</span>
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
};

const GalleryCard = ({ item, index }: { item: Submission; index: number }) => {
    // Use stored image if available, otherwise fallback to Google
    const faviconUrl = item.faviconImage || `https://www.google.com/s2/favicons?sz=64&domain_url=${item.websiteUrl}`;

    // Clean URL for display
    const displayUrl = item.websiteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');


    const [loves, setLoves] = useState(item.lovesCount || 0);
    const [clicks, setClicks] = useState(item.clicksCount || 0);
    const [isLoved, setIsLoved] = useState(false);
    const [isLoving, setIsLoving] = useState(false);

    useEffect(() => {
        // Check local storage for loved state
        const lovedItems = JSON.parse(localStorage.getItem('loved_favicons') || '[]');
        if (lovedItems.includes(item.id)) {
            setIsLoved(true);
        }
    }, [item.id]);

    const handleLove = async () => {
        if (isLoved || isLoving) return;

        setIsLoving(true);
        // Optimistic update
        setLoves(prev => prev + 1);
        setIsLoved(true);

        // Update local storage
        const lovedItems = JSON.parse(localStorage.getItem('loved_favicons') || '[]');
        localStorage.setItem('loved_favicons', JSON.stringify([...lovedItems, item.id]));

        try {
            await fetch('/api/love-favicon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id })
            });
        } catch (error) {
            console.error('Failed to love favicon:', error);
            // Revert on error
            setLoves(prev => prev - 1);
            setIsLoved(false);
        } finally {
            setIsLoving(false);
        }
    };

    const handleClick = async () => {
        // Check local storage for clicked state
        const clickedItems = JSON.parse(localStorage.getItem('clicked_favicons') || '[]');
        if (!clickedItems.includes(item.id)) {
            // Optimistic update
            setClicks(prev => prev + 1);
            // Update local storage
            localStorage.setItem('clicked_favicons', JSON.stringify([...clickedItems, item.id]));

            try {
                await fetch('/api/track-click', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: item.id })
                });
            } catch (error) {
                console.error('Failed to track click:', error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            <a
                href={item.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="block aspect-[4/3] bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden group-hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    src={faviconUrl}
                    alt={`Favicon for ${displayUrl}`}
                    className="w-16 h-16 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${displayUrl.charAt(0)}&background=random&size=64`;
                    }}
                />
            </a>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 truncate pr-2 text-base" title={displayUrl}>
                        {displayUrl}
                    </h3>
                    <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClick}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1 -mr-2 -mt-1 rounded-full hover:bg-blue-50"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-4">

                    <div className="flex items-center gap-1.5 text-gray-400 mr-auto">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-medium">{clicks}</span>
                    </div>
                    <button
                        onClick={handleLove}
                        disabled={isLoved || isLoving}
                        className={`flex items-center gap-1.5 transition-colors group/heart ${isLoved ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                    >
                        <Heart className={`w-4 h-4 transition-all ${isLoved ? 'fill-pink-500' : 'group-hover/heart:fill-pink-500'}`} />
                        <span className="text-xs font-medium">{loves}</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Gallery;
