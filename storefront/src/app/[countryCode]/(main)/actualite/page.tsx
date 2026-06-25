import { sanityClient, urlFor } from '@lib/sanity'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualité | Forge Elidor',
  description: "Suivez l'actualité et les activités de la Forge Elidor.",
}

type Actualite = {
  _id: string
  titre: string
  date: string
  image?: any
  texte?: string
}

async function getActualites(): Promise<Actualite[]> {
  return sanityClient.fetch(`
    *[_type == "actualite"] | order(date desc) {
      _id, titre, date, image, texte
    }
  `)
}

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return date
  }
}

export default async function ActualitePage() {
  const actualites = await getActualites()

  return (
    <div>
      {/* Banner */}
      <div className="w-full h-60 relative md:mb-16 overflow-hidden">
        <Image
          src="/galerie-page/Bunka_1.webp"
          alt="Actualité Forge Elidor"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 max-w-[1400px] mx-auto w-full h-full">
          <nav className="flex items-center text-brand-light/90 text-xs md:text-sm uppercase tracking-widest font-medium mb-4">
            <span>Forge Elidor</span>
            <span className="mx-3 opacity-40">/</span>
            <span className="text-white">Actualité</span>
          </nav>
          <h1 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] drop-shadow-2xl">
            Actualité
          </h1>
        </div>
      </div>

      <div className="content-container py-10 md:py-12">
        {actualites.length === 0 ? (
          <p className="text-brand-brown font-serif text-center py-20">
            Aucune actualité pour le moment. Revenez bientôt !
          </p>
        ) : (
          <div className="flex flex-col gap-12 md:gap-20 max-w-5xl mx-auto">
            {actualites.map((item, index) => (
              <article
                key={item._id}
                className={`flex flex-col gap-6 md:gap-10 md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {item.image && (
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={urlFor(item.image).width(900).url()}
                        alt={item.titre}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className={`flex flex-col gap-3 md:gap-4 ${item.image ? 'md:w-1/2' : 'w-full'}`}>
                  <time className="font-sans text-brand-brown text-xs md:text-sm uppercase tracking-widest">
                    {formatDate(item.date)}
                  </time>
                  <h2 className="font-bodoni text-brand-darkGray text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">
                    {item.titre}
                  </h2>
                  <hr className="bg-brand-brown h-0.5 w-16 border-0" />
                  {item.texte && (
                    <p className="font-sans text-brand-brown text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                      {item.texte}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
