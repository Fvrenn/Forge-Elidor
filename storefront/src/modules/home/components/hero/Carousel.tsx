"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface Slide {
    image: string
    caption: string
}

interface CarouselProps {
    slides: Slide[]
    autoPlayInterval?: number
    className?: string
}

const Carousel = ({ slides, autoPlayInterval = 6000, className = "" }: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Navigation handlers
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
    }, [slides.length])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
    }, [slides.length])

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index)
    }, [])

    // Auto-slide functionality
    useEffect(() => {
        if (isHovered) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            return
        }

        intervalRef.current = setInterval(nextSlide, autoPlayInterval)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isHovered, nextSlide, autoPlayInterval])

    // Touch/Swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const minSwipeDistance = 50

        if (distance > minSwipeDistance) {
            nextSlide()
        }

        if (distance < -minSwipeDistance) {
            prevSlide()
        }

        setTouchStart(0)
        setTouchEnd(0)
    }

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            prevSlide()
        } else if (e.key === "ArrowRight") {
            nextSlide()
        }
    }

    return (
        <div
            className={`relative flex flex-col justify-center ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Carousel d'images"
            tabIndex={0}
        >
            {/* Swiper Container */}
            <div className="relative w-full h-full overflow-hidden">
                <div
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${currentSlide * -100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-full box-border"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} sur ${slides.length}`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.caption}
                                className="w-full h-[454px] md:h-full object-cover object-center rounded-[53px]"
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    ))}
                </div>

                {/* Controls Container */}
                <div className="flex flex-col-reverse items-center absolute bottom-9 right-6 h-[65%] md:h-[72%]">
                    {/* Navigation Buttons */}
                    <div className="inline-flex flex-col gap-1.5">
                        <button
                            onClick={prevSlide}
                            className="bg-white border-none py-3.5 px-1.5 cursor-pointer rounded-full hover:bg-opacity-90 transition-all"
                            aria-label="Slide précédente"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M8 6L12 2L16 6" />
                                <path d="M12 2V22" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-transparent border-2 border-white text-white py-3.5 px-1.5 cursor-pointer rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
                            aria-label="Slide suivante"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M8 18L12 22L16 18" />
                                <path d="M12 2V22" />
                            </svg>
                        </button>
                    </div>

                    {/* Pagination */}
                    <div className="flex gap-1.5 flex-col my-auto" role="tablist" aria-label="Pagination du carousel">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-8 w-2 rounded-full cursor-pointer transition-all ${index === currentSlide ? "bg-white" : "bg-black bg-opacity-50 hover:bg-opacity-70"
                                    }`}
                                role="tab"
                                aria-selected={index === currentSlide}
                                aria-label={`Aller à la slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Voir Plus Button */}
            <a href="#" className="p-0 absolute top-0 right-0">
                <div className="absolute top-6 right-5 z-10 w-30 h-30">
                    <img
                        src="/swiper/rond-voire-plus.svg"
                        alt=""
                        className="absolute top-0 w-full h-full animate-spin-slow"
                        style={{ animationDuration: "15s" }}
                    />
                    <img
                        src="/swiper/arrow.svg"
                        alt="Voir plus"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 transition-transform duration-300 hover:-translate-x-[35%] hover:-translate-y-1/2"
                    />
                </div>
            </a>
        </div>
    )
}

export default Carousel
