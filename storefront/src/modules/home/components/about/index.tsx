const About = () => {
  return (
    <div className="flex flex-col items-center px-6 mt-9 lg:flex-row lg:justify-between lg:items-center lg:mt-24 lg:px-12 xl:px-24">
      <div className="w-full lg:w-1/2">
        <h1 className="mb-3 text-3xl font-black font-sans text-brand-brown md:text-5xl">
          A propos de moi
        </h1>
        <p className="mb-5 text-sm font-sans text-brand-brown md:text-base lg:max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet
        </p>
        <p className="mb-8 text-sm font-sans text-brand-brown md:text-base xl:text-xl lg:mb-10 lg:max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet
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
