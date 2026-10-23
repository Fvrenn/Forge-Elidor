import Image from "next/image"
import type { PageAccueil } from "@lib/data/page-accueil"

const FeaturedSection = ({ contenu }: { contenu: PageAccueil["banniere"] }) => {
  return (
    <section className="w-full">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[652px] mt-8 lg:mt-16">
        <Image
          src={contenu.image}
          alt={contenu.titre}
          fill
          className="object-cover object-center rounded-3xl lg:rounded-[45px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[80%] text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-center text-3xl md:text-5xl lg:text-7xl font-bold mb-4 drop-shadow-md">
              {contenu.titre}
            </h1>
            <div className="mt-4 lg:mt-8">
              <h6 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light text-white text-center drop-shadow-sm">
                {contenu.signature}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
