import type { PageAccueil } from "@lib/data/page-accueil"

const About = ({ contenu }: { contenu: PageAccueil["aPropos"] }) => {
  return (
    <div className="flex flex-col items-center px-6 mt-9 lg:flex-row lg:justify-between lg:items-center lg:mt-16 lg:px-12 xl:px-24">
      <div className="w-full lg:w-1/2">
        <h1 className="mb-3 text-3xl font-black font-sans text-brand-brown md:text-5xl">
          {contenu.titre}
        </h1>
        <p className="mb-5 text-sm font-sans text-brand-brown md:text-base lg:max-w-3xl">
          {contenu.accroche}
        </p>
        {/* whitespace-pre-line keeps the line breaks typed in Sanity */}
        <p className="mb-8 text-sm font-sans text-brand-brown whitespace-pre-line md:text-base xl:text-xl lg:mb-10 lg:max-w-3xl">
          {contenu.texte}
        </p>
      </div>
      <div className="w-full flex justify-center items-center lg:block lg:w-5/12">
        <img
          src={contenu.image}
          alt={contenu.titre}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

export default About
