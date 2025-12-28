import Carousel from "./Carousel"

const Hero = () => {
  const slides = [
    { image: "/swiper/swiper1.jpg", caption: "Caption 1" },
    { image: "/swiper/swiper2.jpg", caption: "Caption 2" },
    { image: "/swiper/swiper3.jpg", caption: "Caption 3" },
  ]

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-6 lg:gap-8 mx-1.5 lg:mx-[clamp(6px,1vw+3rem,49px)]">
      {/* Hero Text Section */}
      <div className="flex-1 flex flex-col justify-center bg-brand-brown px-2.5 pt-9 pb-11 pl-7 rounded-[46px] max-w-full md:max-w-[799px]">
        <h2 className="mt-2 text-7xl text-brand-white font-bodoni font-normal optical-size-small">
          Forge Elidor
        </h2>
        <h1 className="text-[84px] text-brand-white font-sans font-black uppercase">
          Coutelier dans la Vallée de Munster
        </h1>
        <p className="mt-6 text-2xl text-brand-white font-sans font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet
          vestibulum mi consequat a. Mauris sollicitudin ligula sit amet elit bibendum, id consequat lorem hendrerit.
        </p>
        <div className="mt-9">
          <a
            href="#"
            className="inline-block text-brand-black no-underline font-sans font-medium bg-brand-light py-2.5 px-9 rounded-full text-2xl hover:bg-opacity-90 transition-all"
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
