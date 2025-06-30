import Image from 'next/image';
import FloatingOrb from './FloatingOrb';
import GlassContainer from './GlassContainer';
import { aboutFloatingOrbs } from '../data/decorativeElements';

export default function AboutSection() {
    return (
        <section className="py-16 px-8 relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {aboutFloatingOrbs.map((orb, index) => (
                    <FloatingOrb 
                        key={`about-orb-${index}`}
                        position={orb.position}
                        size={orb.size}
                        color={orb.color}
                        delay={orb.delay}
                    />
                ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto rounded-full"></div>
                </div>

                {/* Full Width Short Image */}
                <div className="w-full h-48 md:h-56 mb-12 relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-1">
                    <div className="w-full h-full relative overflow-hidden rounded-xl">
                        <Image
                            src="/myphoto.png" // You can replace this with a different image for the banner
                            alt="About Me Banner"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-red-500/20"></div>
                    </div>
                </div>

                {/* About Paragraph */}
                <div className="max-w-4xl mx-auto text-center">
                    <GlassContainer>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            I'm a passionate software developer with a deep love for creating innovative solutions that make a difference. 
                            With expertise in modern web technologies and a keen eye for user experience, I specialize in building scalable 
                            applications that combine functionality with elegant design. My journey in tech has been driven by curiosity 
                            and a commitment to continuous learning, always staying ahead of industry trends and best practices.
                        </p>
                    </GlassContainer>
                </div>
            </div>
        </section>
    );
} 