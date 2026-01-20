import Image from "next/image"

const FeaturedSection = () => {
  return (
    <section className="w-full">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[652px] mt-8 lg:mt-16">
        <Image
          src="/a-propos/baniere.jpg"
          alt="Couteaux forgés pour durer"
          fill
          className="object-cover object-center rounded-3xl lg:rounded-[45px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[80%] text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-center text-3xl md:text-5xl lg:text-7xl font-bold mb-4 drop-shadow-md">
              Des couteaux forgés pour durer, conçus pour exceller.
            </h1>
            <div className="mt-4 lg:mt-8">
              <h6 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light text-white text-center drop-shadow-sm">
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
