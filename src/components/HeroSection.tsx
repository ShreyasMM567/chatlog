import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="min-h-screen flex items-center justify-center px-8 py-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-6 h-6 bg-red-500/15 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-400/25 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-red-400/20 rounded-full animate-pulse delay-1500"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-purple-500/30 rounded-tl-lg"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-red-500/30 rounded-br-lg"></div>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
                
                {/* Left Window */}
                <div className="space-y-8 px-2 relative">
                    {/* Decorative Line */}
                    <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent"></div>
                    
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                            Software Developer
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                            Crafting innovative solutions through code. Passionate about building scalable applications and creating meaningful user experiences.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="/resume" 
                            className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-200 hover:scale-105 relative group"
                        >
                            <span className="relative z-10">Resume</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link 
                            href="/projects" 
                            className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-200 hover:scale-105 relative group"
                        >
                            <span className="relative z-10">View Projects</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center px-8 py-3 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white font-medium hover:bg-purple-600/30 transition-all duration-200 hover:scale-105 relative group"
                        >
                            <span className="relative z-10">Get in Touch</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-red-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                    </div>
                </div>

                {/* Right Window - Profile Section */}
                <div className="flex justify-center md:justify-end px-4 relative">
                    <div className="relative group">
                        {/* Decorative Ring */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                        
                        {/* Main Profile Image */}
                        <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden ring-4 ring-white/20 shadow-2xl backdrop-blur-sm">
                            <Image
                                src="/myphoto.png" // Replace with your actual image
                                alt="Shreyas M M - Software Developer"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                            {/* Gradient Overlay for Better Text Contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Floating Elements Around Profile */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500/40 rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-500/40 rounded-full animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 -right-4 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse delay-2000"></div>
                        <div className="absolute bottom-1/2 -left-4 w-2 h-2 bg-red-400/50 rounded-full animate-pulse delay-1500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 