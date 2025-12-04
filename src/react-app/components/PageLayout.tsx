import { Link } from 'react-router';
import Footer from './Footer';

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/faviconlove.png" alt="Logo" className="h-8 w-auto" />
                        <span className="font-bold text-gray-900 text-lg">favicon.love</span>
                    </Link>
                    <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Back to Generator
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
                <div className="prose prose-lg max-w-none text-gray-600">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
