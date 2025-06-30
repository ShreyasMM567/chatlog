import Image from 'next/image';
import Link from 'next/link';
import FloatingOrb from './FloatingOrb';
import CornerAccent from './CornerAccent';
import GlassContainer from './GlassContainer';
import { heroFloatingOrbs, heroCornerAccents, profileFloatingElements } from '../data/decorativeElements';

export default function HeroSection() {
    return (
        <div className="min-h-screen flex items-center justify-center px-8 py-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Floating Orbs */}
                {heroFloatingOrbs.map((orb, index) => (
                    <FloatingOrb 
                        key={`hero-orb-${index}`}
                        position={orb.position}
                        size={orb.size}
                        color={orb.color}
                        delay={orb.delay}
                    />
                ))}
                {/* Corner Accents */}
                {heroCornerAccents.map((accent, index) => (
                    <CornerAccent 
                        key={`hero-accent-${index}`}
                        position={accent.position}
                        size={accent.size}
                        color={accent.color}
                        borderStyle={accent.borderStyle}
                    />
                ))}
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Window */}
                <div className="space-y-8 px-2 relative">
                    {/* Decorative Line */}
                    <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent"></div>
                    <GlassContainer>
                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                                Software Developer
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                                Crafting innovative solutions through code. Passionate about building scalable applications and creating meaningful user experiences.
                            </p>
                        </div>
                    </GlassContainer>
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
                        <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden ring-4 ring-white/20 shadow-2xl backdrop-blur-sm bg-white/5 border border-white/10">
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
                        {profileFloatingElements.map((element, index) => (
                            <FloatingOrb 
                                key={`profile-orb-${index}`}
                                position={element.position}
                                size={element.size}
                                color={element.color}
                                delay={element.delay}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 