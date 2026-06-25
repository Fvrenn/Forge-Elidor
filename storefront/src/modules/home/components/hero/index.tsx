import Carousel from "./Carousel"

const Hero = () => {
  const slides = [
    { image: "/swiper/swiper1.jpg", caption: "Caption 1" },
    { image: "/swiper/swiper2.jpg", caption: "Caption 2" },
    { image: "/swiper/swiper3.jpg", caption: "Caption 3" },
  ]

  return (
    <div className="flex flex-col items-stretch gap-4 mx-1.5 md:flex-row md:gap-6 lg:gap-8 lg:mx-[clamp(6px,1vw+3rem,49px)]">
      {/* Hero Text Section */}
      <div className="flex-1 flex flex-col justify-center bg-brand-brown px-4 pt-6 pb-8 rounded-3xl max-w-full md:px-6 md:pt-8 md:pb-10 md:pl-7 md:rounded-[46px] md:max-w-[799px]">
        <h2 className="mb-3 text-4xl text-brand-white font-bodoni font-normal optical-size-small md:mb-5 md:text-6xl lg:text-7xl">
          Forge Elidor
        </h2>
        <h1 className="text-3xl text-brand-white font-sans font-black uppercase leading-tight md:text-5xl md:leading-snug lg:text-[84px] lg:leading-[95px]">
          Coutelier dans la Vallée de Munster
        </h1>
        <p className="mt-4 text-base text-brand-white font-sans font-normal md:mt-5 md:text-lg lg:mt-6 lg:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet
          vestibulum mi consequat a. Mauris sollicitudin ligula sit amet elit bibendum, id consequat lorem hendrerit.
        </p>
        <div className="mt-6 md:mt-8 lg:mt-9">
          <a
            href="/store"
            className="inline-block text-brand-black no-underline font-sans font-medium bg-brand-light py-2 px-6 rounded-full text-sm hover:bg-opacity-90 transition-all md:py-2.5 md:px-8 md:text-base lg:px-9"
          >
            Voir Plus
          </a>
        </div>
      </div>

      {/* Carousel Section */}
      <Carousel slides={slides} className="flex-1" />
    </div>
  )
}

export default Hero
