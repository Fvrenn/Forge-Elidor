
import Image from "next/image"

const FeaturedSection = () => {
  return (
    <section className="w-full">
      <div className="relative w-full h-[clamp(254px,34vw,652px)] mt-[35px] lg:mt-[clamp(79px,7vw,120px)]">
        <Image
          src="/featured-banner.png"
          alt="Couteaux forgés pour durer"
          fill
          className="object-cover object-center rounded-[clamp(24px,2vw,45px)]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[70%] text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-center text-3xl md:text-5xl lg:text-7xl font-bold mb-4 drop-shadow-md">
              Des couteaux forgés pour durer, conçus pour exceller.
            </h1>
            <div className="mt-[clamp(15px,2vw,29px)]">
              <h6 className="font-lora text-[clamp(21px,2.9vw,44px)] font-light text-white text-center drop-shadow-sm">
                Joel Matter
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
