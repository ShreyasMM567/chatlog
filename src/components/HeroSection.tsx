import Image from 'next/image';
import Link from 'next/link';
import GlassContainer from './GlassContainer';
import Typewriter from './Typewriter';

export default function HeroSection() {
    return (
        <div className="min-h-screen flex items-center justify-center px-8 py-8 relative">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Window */}
                <div className="space-y-8 px-2 relative">
                    <GlassContainer>
                        <div className="space-y-6 text-center flex flex-col items-center">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight flex flex-col items-center text-center">
                                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">I am</span>
                                <Typewriter
                                    words={["Software Developer", "Cloud Engineer", ".NET Developer", "DevOps Enthusiast"]}
                                />
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg mt-2 mx-auto">
                                Crafting innovative solutions through code. Passionate about building scalable applications and creating meaningful user experiences.
                            </p>
                        </div>
                    </GlassContainer>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
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
                        <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden">
                            <Image
                                src="/myphoto.png"
                                alt="Shreyas M M - Software Developer"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 