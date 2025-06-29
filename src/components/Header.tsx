import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-4 sticky top-0 z-50 shadow-lg rounded-b-2xl mt-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-2xl font-semibold text-white tracking-tight">Shreyas M M</span>
                </div>

                <div className="hidden md:flex items-center space-x-1">
                    <Link 
                        href="/" 
                        className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                    >
                        <span className="relative z-10">Home</span>
                        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-red-600 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                    <Link 
                        href="/about" 
                        className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                    >
                        <span className="relative z-10">About</span>
                        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-red-600 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                    <Link 
                        href="/projects" 
                        className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                    >
                        <span className="relative z-10">Projects</span>
                        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-red-600 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                    <Link 
                        href="/contact" 
                        className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                    >
                        <span className="relative z-10">Contact</span>
                        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-red-600 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                </div>

                <div className="md:hidden">
                    <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 group">
                        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <svg className="relative w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu (hidden by default) */}
            <div className="md:hidden hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link 
                        href="/" 
                        className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium hover:bg-white/5 rounded-lg"
                    >
                        Home
                    </Link>
                    <Link 
                        href="/about" 
                        className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium hover:bg-white/5 rounded-lg"
                    >
                        About
                    </Link>
                    <Link 
                        href="/projects" 
                        className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium hover:bg-white/5 rounded-lg"
                    >
                        Projects
                    </Link>
                    <Link 
                        href="/contact" 
                        className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium hover:bg-white/5 rounded-lg"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}