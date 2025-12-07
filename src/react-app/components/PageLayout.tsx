import { Link } from 'react-router';
import { Wand2 } from 'lucide-react';
import Footer from './Footer';

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    fullWidth?: boolean;
}

import Logo from './Logo';

export default function PageLayout({ children, title, fullWidth = false }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Logo showText={false} />
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:shadow-md active:scale-95"
                    >
                        <Wand2 className="w-4 h-4 text-yellow-400" />
                        <span>Favicon Generator</span>
                    </Link>
                </div>
            </header>

            <main className={`${fullWidth ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                {title && <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>}
                <div className="prose prose-lg max-w-none text-gray-600">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
