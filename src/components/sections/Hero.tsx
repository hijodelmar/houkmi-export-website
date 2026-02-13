import Image from "next/image";
import HeroBackground from "./HeroBackground";

export default function Hero({ lang, dict }: { lang: string; dict: any }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* First Image - Rendered on Server for instant LCP */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1546470427-227dd47b9e4f"
                    alt="Fresh ripe tomatoes"
                    fill
                    priority
                    loading="eager"
                    className="object-cover object-center"
                    sizes="100vw"
                    quality={90}
                />
            </div>

            {/* Client-side Background Carousel (Handles transitions after first image) */}
            <HeroBackground />

            {/* Server-rendered Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                <div className="flex flex-col items-center opacity-100 translate-y-0 transition-all duration-1000">
                    <h1 className="text-5xl md:text-8xl font-[900] mb-8 text-white drop-shadow-2xl leading-[1.1] uppercase tracking-tight max-w-5xl">
                        {dict.Hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl font-bold uppercase tracking-[0.2em] drop-shadow-lg">
                        {dict.Hero.subtitle}
                    </p>
                </div>
            </div>


            {/* Static CSS Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white/80 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
