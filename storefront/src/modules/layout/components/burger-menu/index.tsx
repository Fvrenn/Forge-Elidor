"use client"

import { useState, Fragment } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Transition, Dialog } from "@headlessui/react"

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isStoreExpanded, setIsStoreExpanded] = useState(false)

    const categories = [
        {
            label: "Couteau Santoku",
            href: "/galerie?categorie=couteau-santoku",
        },
        {
            label: "Couteau Petty",
            href: "/galerie?categorie=couteau-petty",
        },
        {
            label: "Couteau Office",
            href: "/galerie?categorie=couteau-office",
        },
        {
            label: "Couteau Nakiri",
            href: "/galerie?categorie=couteau-nakiri",
        },
        {
            label: "Économe",
            href: "/galerie?categorie=econome",
        },
        {
            label: "Couteau de chef",
            href: "/galerie?categorie=couteau-de-chef",
        },
        {
            label: "Couteau à pain",
            href: "/galerie?categorie=couteau-a-pain",
        },
    ]

    return (
        <>
            {/* Burger Icon Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center w-10 h-10 text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 small:hidden"
                aria-label="Open menu"
            >
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
                </svg>
            </button>

            {/* Mobile Menu */}
            <Transition show={isOpen} as={Fragment}>
                <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
                    {/* Overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>

                    {/* Sliding panel */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in duration-200 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="fixed top-0 left-0 h-full w-[280px] bg-brand-light shadow-xl overflow-y-auto">
                            <div className="flex flex-col h-full">
                                {/* Header with logo and close button */}
                                <div className="flex items-center justify-between p-6 border-b border-ui-border-base">
                                    <img
                                        src="/logo/dark/logo-long-dark.svg"
                                        alt="Forge Elidor Logo"
                                        className="h-8 w-auto"
                                    />
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200"
                                        aria-label="Close menu"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 p-6">
                                    <ul className="space-y-4">
                                        {/* Galerie couteau with expandable categories */}
                                        <li>
                                            <div className="flex flex-col">
                                                <button
                                                    onClick={() => setIsStoreExpanded(!isStoreExpanded)}
                                                    className="flex items-center justify-between w-full text-left font-serif text-base text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 py-2"
                                                >
                                                    <span>Galerie couteau</span>
                                                    <svg
                                                        className={`w-4 h-4 transition-transform duration-200 ${isStoreExpanded ? "rotate-180" : ""
                                                            }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="4 10 8 4"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeWidth="1"
                                                            d="m4 10 4 4 4-4"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Expandable categories */}
                                                <Transition
                                                    show={isStoreExpanded}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0 -translate-y-2"
                                                    enterTo="opacity-100 translate-y-0"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100 translate-y-0"
                                                    leaveTo="opacity-0 -translate-y-2"
                                                >
                                                    <ul className="mt-2 ml-4 space-y-2 border-l-2 border-brand-accent pl-4">
                                                        <li>
                                                            <LocalizedClientLink
                                                                href="/galerie"
                                                                onClick={() => setIsOpen(false)}
                                                                className="block text-sm text-brand-dark hover:text-ui-fg-base transition-colors duration-200 py-1"
                                                            >
                                                                Voir toute la galerie
                                                            </LocalizedClientLink>
                                                        </li>
                                                        {categories.map((cat) => (
                                                            <li key={cat.label}>
                                                                <LocalizedClientLink
                                                                    href={cat.href}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="block text-sm text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 py-1"
                                                                >
                                                                    {cat.label}
                                                                </LocalizedClientLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Transition>
                                            </div>
                                        </li>

                                        {/* Other navigation links */}
                                        <li>
                                            <LocalizedClientLink
                                                href="/store"
                                                onClick={() => setIsOpen(false)}
                                                className="block font-serif text-base text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 py-2"
                                            >
                                                Couteaux disponibles
                                            </LocalizedClientLink>
                                        </li>

                                        <li>
                                            <LocalizedClientLink
                                                href="/atelier"
                                                onClick={() => setIsOpen(false)}
                                                className="block font-serif text-base text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 py-2"
                                            >
                                                Atelier
                                            </LocalizedClientLink>
                                        </li>

                                        <li>
                                            <LocalizedClientLink
                                                href="/actualite"
                                                onClick={() => setIsOpen(false)}
                                                className="block font-serif text-base text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 py-2"
                                            >
                                                Actualité
                                            </LocalizedClientLink>
                                        </li>

                                        <li className="pt-4 border-t border-ui-border-base">
                                            <LocalizedClientLink
                                                href="/account"
                                                onClick={() => setIsOpen(false)}
                                                className="block font-serif text-base text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 py-2"
                                            >
                                                Sign in
                                            </LocalizedClientLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}

export default BurgerMenu
