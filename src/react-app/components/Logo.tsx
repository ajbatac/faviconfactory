import { Link, useLocation } from 'react-router';

interface LogoProps {
    className?: string; // For the img element
    showText?: boolean;
    textClassName?: string;
    linkClassName?: string;
}

export default function Logo({
    className = "h-8 w-auto",
    showText = true,
    textClassName = "font-bold text-gray-900 text-lg",
    linkClassName = "flex items-center gap-2"
}: LogoProps) {
    const location = useLocation();

    const handleClick = (e: React.MouseEvent) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (location.pathname === '/') {
            e.preventDefault();
        }
    };

    return (
        <Link to="/" onClick={handleClick} className={linkClassName}>
            <img src="/faviconlove.png" alt="favicon.love logo" className={className} />
            {showText && <span className={textClassName}>favicon.love</span>}
        </Link>
    );
}
