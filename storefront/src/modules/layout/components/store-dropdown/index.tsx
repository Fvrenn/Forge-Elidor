"use client"

import { useState, Fragment } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Transition } from "@headlessui/react"

const StoreDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)

    const categories = [
        {
            label: "Couteau Santoku",
            href: "/galerie?categorie=couteau-santoku",
            icon: "/nav/santoku.svg",
            iconHover: "/nav/santoku-hover.svg",
        },
        {
            label: "Couteau Bunka",
            href: "/galerie?categorie=couteau-bunka",
            icon: "/nav/bunka.svg",
            iconHover: "/nav/bunka-hover.svg",
        },

        {
            label: "Couteau Petty",
            href: "/galerie?categorie=couteau-petty",
            icon: "/nav/petty.svg",
            iconHover: "/nav/petty-hover.svg",
        },
        {
            label: "Couteau Office",
            href: "/galerie?categorie=couteau-office",
            icon: "/nav/office.svg",
            iconHover: "/nav/office-hover.svg",
        },
        {
            label: "Couteau Nakiri",
            href: "/galerie?categorie=couteau-nakiri",
            icon: "/nav/nakiri.svg",
            iconHover: "/nav/nakiri-hover.svg",
        },
        {
            label: "Économe",
            href: "/galerie?categorie=econome",
            icon: "/nav/econome.svg",
            iconHover: "/nav/econome-hover.svg",
        },
        {
            label: "Couteau de chef",
            href: "/galerie?categorie=couteau-de-chef",
            icon: "/nav/gyuto.svg",
            iconHover: "/nav/gyuto-hover.svg",
        },
        {
            label: "Couteau à pain",
            href: "/galerie?categorie=couteau-a-pain",
            icon: "/nav/pain.svg",
            iconHover: "/nav/pain-hover.svg",
        },
    ]

    return (
        <div
            className="h-full"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="flex items-center h-full">
                <LocalizedClientLink
                    className="hover:text-ui-fg-base font-serif font-normal small:text-base h-full flex items-center transition-colors duration-200 border-b-2 border-transparent hover:border-brand-dark"
                    href="/galerie"
                >
                    Galerie couteaux
                    <svg
                        aria-hidden="true"
                        className={`w-3 h-3 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="4 10 8 4"
                    >
                        <path
                            stroke="currentColor"
                            strokeWidth="1"
                            d="m4 10 4 4 4-4"
                        ></path>
                    </svg>
                </LocalizedClientLink>
            </div>

            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="absolute top-full left-0 w-full bg-[#FFFFF6] border-b border-ui-border-base z-50 overflow-hidden shadow-xl">
                    <ul className="list-none py-6 content-container">
                        <div className="flex h-full">
                            <li className="flex-none whitespace-nowrap mt-2">
                                <LocalizedClientLink
                                    href="/galerie"
                                    className="flex items-center gap-x-3 text-brand-dark font-serif text-base group/all transition-colors duration-200 hover:opacity-80 border-b border-brand-accent pb-2 "
                                >
                                    Voir toute la galerie
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 transition-transform duration-200 group-hover/all:translate-x-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 17 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            d="M.000162 8H15.3335m0 0-6.08131 6m6.08131-6L9.2522 2"
                                        ></path>
                                    </svg>
                                </LocalizedClientLink>
                            </li>
                            <div className="h-28 w-px bg-brand-accent ml-7 self-center" />
                            <div className="flex ml-7 mt-2 justify-between w-full">
                                <div className="grid grid-cols-4 gap-x-8 gap-y-4 w-full">
                                    {categories.map((cat) => (
                                        <li key={cat.label}>
                                            <LocalizedClientLink
                                                href={cat.href}
                                                className="flex items-center gap-x-[10px] text-black hover:text-brand-dark transition-colors duration-200 group/item"
                                            >
                                                <span className="bg-brand-accent rounded-[100px] w-[100px] h-[55px] flex items-center justify-center transition-all duration-300 relative shrink-0 group-hover/item:bg-brand-dark group-hover/item:scale-105 group-hover/item:shadow-md">
                                                    <img
                                                        src={cat.icon}
                                                        alt=""
                                                        className="w-[70px] h-11 absolute transition-all duration-300 group-hover/item:opacity-0 group-hover/item:invisible"
                                                    />
                                                    <img
                                                        src={cat.iconHover}
                                                        alt=""
                                                        className="w-[70px] h-11 absolute opacity-0 invisible transition-all duration-300 group-hover/item:opacity-100 group-hover/item:visible"
                                                    />
                                                </span>
                                                <span className="font-serif text-base">{cat.label}</span>
                                            </LocalizedClientLink>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </ul>
                </div>
            </Transition>
        </div>
    )
}

export default StoreDropdown
