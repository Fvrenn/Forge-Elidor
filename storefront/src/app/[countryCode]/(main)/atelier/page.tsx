import Image from "next/image"

export default function AtelierPage() {
    return (
        <div>
            {/* Hero Section */}
            <div className="content-container mt-6 md:mt-11">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-16">
                    {/* Main Image - Mobile: full width, Desktop: left side */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <img
                            src="/atelier/enclume-portrait.png"
                            alt="Artisan au travail"
                            className="w-full max-h-96 md:max-h-[500px] lg:max-h-none h-auto object-cover rounded-lg lg:rounded-none"
                        />
                    </div>

                    {/* Text Content - Mobile: stacked, Desktop: right side */}
                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full lg:w-1/2">
                        <div>
                            <h1 className="font-bodoni text-brand-darkGray text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                                BIENVENUE À LA FORGE ELIDOR, OÙ CRÉATIVITÉ ET ARTISANAT FUSIONNENT
                            </h1>
                        </div>
                        <hr className="bg-brand-brown h-0.5 md:h-1 w-full" />

                        {/* Text and small image */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
                            <p className="font-sans text-brand-brown text-sm sm:text-base md:text-lg leading-relaxed">
                                Depuis notre atelier niché au cœur de la tradition, nous façonnons des couteaux d'exception
                                alliant savoir-faire ancestral et innovation contemporaine. Chaque pièce raconte une histoire,
                                celle de la passion du métal et du travail minutieux de l'artisan.
                            </p>
                            <div className="w-full md:w-auto md:flex-shrink-0">
                                <img
                                    src="/atelier/337172116_754890079628502_203618414433016844_n 1.png"
                                    alt="Détail couteau"
                                    className="w-full md:w-60 lg:w-80 h-auto object-cover rounded-lg md:rounded-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Width Image */}
                <div className="mt-8 md:mt-12 lg:mt-16">
                    <img
                        src="/atelier/atelier1.png"
                        alt="Atelier"
                        className="w-full h-auto object-cover rounded-lg lg:rounded-none"
                    />
                </div>

                {/* Second Section - Text and Image */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-8 mt-8 md:mt-12 lg:mt-16">
                    {/* Text Content - Mobile first */}
                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full lg:max-w-xl">
                        <h1 className="font-bodoni text-brand-darkGray text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                            BIENVENUE À LA FORGE ELIDOR, OÙ CRÉATIVITÉ ET ARTISANAT FUSIONNENT
                        </h1>
                        <div className="flex flex-col gap-3 md:gap-4">
                            <p className="font-sans text-brand-brown text-sm sm:text-base md:text-lg leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor scelerisque justo et laoreet. Nullam dictum, quam vel interdum pharetra, ante elit pretium nibh, quis ornare
                            </p>
                            <p className="font-sans text-brand-brown text-sm sm:text-base md:text-lg leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor scelerisque justo et laoreet. Nullam dictum, quam vel interdum pharetra, ante elit pretium nibh, quis ornare
                            </p>
                        </div>
                    </div>

                    {/* Vertical Divider - Hidden on mobile */}
                    <div className="hidden lg:block w-0.5 md:w-1 my-2 bg-brand-brown flex-shrink-0"></div>

                    {/* Image */}
                    <div className="w-full lg:flex-1">
                        <img
                            src="/atelier/ponceuse.png"
                            alt="Ponceuse"
                            className="w-full h-auto object-cover rounded-lg lg:rounded-none"
                        />
                    </div>
                </div>
            </div>

            {/* Green Section - Call to Action */}
            <div className="bg-brand-green mt-8 md:mt-12 lg:mt-16 flex flex-col items-center py-8 md:py-12 lg:py-16 px-4">
                <div className="mb-8 md:mb-12 lg:mb-20">
                    <h1 className="font-bodoni text-brand-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium max-w-3xl text-center leading-tight px-4">
                        Lorem ipsum dolor sitLorem ipsum dolor
                    </h1>
                </div>
                <div className="w-full max-w-6xl px-4">
                    <img
                        src="/atelier/outils.png"
                        alt="Outils"
                        className="w-full h-auto object-cover rounded-lg lg:rounded-none"
                    />
                </div>
            </div>
        </div>
    )
}
