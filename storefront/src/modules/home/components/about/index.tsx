const About = () => {
  return (
    <div className="flex flex-col items-center px-6 mt-9 lg:flex-row lg:justify-between lg:items-center lg:mt-16 lg:px-12 xl:px-24">
      <div className="w-full lg:w-1/2">
        <h1 className="mb-3 text-3xl font-black font-sans text-brand-brown md:text-5xl">
          A propos de moi
        </h1>
        <p className="mb-5 text-sm font-sans text-brand-brown md:text-base lg:max-w-3xl">
          Un bon tranchant, une lame équilibrée, un manche ergonomique… et le couteau devient le prolongement de votre main.
        </p>
        <p className="mb-8 text-sm font-sans text-brand-brown md:text-base xl:text-xl lg:mb-10 lg:max-w-3xl">
          Moi, c’est Joël. Je suis artisan coutelier depuis 2010 et amateur de bonne lames depuis l’âge de 6 ans.<br />

          Après avoir fabriqué des couteaux de chasse, des couteaux outdoor et des couteaux pliants, je me suis découvert une véritable passion pour les couteaux de cuisine. Pourquoi la cuisine ? Tout simplement parce que j’aime émincer des oignons, découper de la viande ou du poisson, et utiliser un couteau au quotidien pour le mettre à l’épreuve.<br />

          J’aime les couteaux qui servent chaque jour, ce sont de véritables outils, des outils indispensables.<br />

          Ici, pas de couteaux fabriqués en série : chaque pièce est unique. De la pointe jusqu’au bout du manche, en passant par l’étui en bois, tout est réalisé de manière artisanale. Alors oubliez les couteaux industriels sans âme, dont le tranchant ne tient souvent pas une semaine, et entrez dans l’univers du couteau de cuisine artisanal.<br />
        </p>
      </div>
      <div className="w-full flex justify-center items-center lg:block lg:w-5/12">
        <img
          src="/a-propos/img-about.png"
          alt="illustration-1"
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

export default About
