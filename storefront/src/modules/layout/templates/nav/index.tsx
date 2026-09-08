import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import StoreDropdown from "@modules/layout/components/store-dropdown"
import BurgerMenu from "@modules/layout/components/burger-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-brand-light border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          {/* Mobile: Burger + Logo */}
          <div className="flex-none pr-4 small:pr-12 h-full flex items-center gap-x-2 small:gap-x-0">
            <BurgerMenu />
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus uppercase"
              data-testid="nav-store-link"
            >
              <img
                src="/logo/dark/logo-long-dark.png"
                alt="Forge Elidor Logo"
                className="h-8 w-auto"
              />
            </LocalizedClientLink>
          </div>

          {/* Desktop: Navigation links (hidden on mobile) */}
          <div className="hidden small:flex items-center gap-x-8 h-full flex-grow">
            <StoreDropdown />
            <LocalizedClientLink
              className="hover:text-ui-fg-base font-serif font-normal small:text-base h-full flex items-center transition-colors duration-200 border-b-2 border-transparent hover:border-brand-dark"
              href="/store"
            >
              Couteaux disponibles
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-ui-fg-base font-serif font-normal small:text-base h-full flex items-center transition-colors duration-200 border-b-2 border-transparent hover:border-brand-dark"
              href="/atelier"
            >
              Atelier
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-ui-fg-base font-serif font-normal small:text-base h-full flex items-center transition-colors duration-200 border-b-2 border-transparent hover:border-brand-dark"
              href="/actualite"
            >
              Actualité
            </LocalizedClientLink>
          </div>

          {/* Account + Cart (Account hidden on mobile) */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base font-serif h-full flex items-center transition-colors duration-200 border-b-2 border-transparent hover:border-brand-dark"
                href="/account"
                data-testid="nav-account-link"
              >
                Compte
              </LocalizedClientLink>
            </div>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2 items-center"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 240 240"
                    className="h-6 w-6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path
                        d="M0 2350 l0 -50 93 0 93 0 210 -791 c199 -751 210 -791 236 -805 45
       -23 192 -62 300 -79 226 -35 584 -30 802 11 117 22 233 62 257 87 29 31 132
       243 175 362 76 211 125 402 163 635 12 69 23 137 26 153 l5 27 -880 0 -880 0
       0 -50 0 -50 821 0 821 0 -6 -27 c-3 -16 -8 -48 -11 -73 -12 -80 -56 -272 -87
       -380 -71 -243 -190 -510 -237 -534 -36 -19 -138 -43 -261 -63 -149 -24 -524
       -24 -676 0 -143 22 -256 52 -269 70 -5 8 -104 373 -220 811 l-210 796 -132 0
       -133 0 0 -50z"
                      />
                      <path
                        d="M767 486 c-55 -21 -103 -61 -134 -114 -24 -40 -28 -58 -28 -123 0
       -67 4 -81 30 -125 99 -159 326 -164 425 -8 101 160 -4 368 -192 380 -39 3 -77
       -1 -101 -10z m153 -106 c45 -23 80 -80 80 -130 0 -74 -76 -150 -149 -150 -77
       0 -151 74 -151 150 0 48 35 107 78 129 48 26 93 26 142 1z"
                      />
                      <path
                        d="M1667 486 c-55 -21 -103 -61 -134 -114 -24 -40 -28 -58 -28 -123 0
       -67 4 -81 30 -125 99 -159 326 -164 425 -8 101 160 -4 368 -192 380 -39 3 -77
       -1 -101 -10z m153 -106 c45 -23 80 -80 80 -130 0 -74 -76 -150 -149 -150 -77
       0 -151 74 -151 150 0 48 35 107 78 129 48 26 93 26 142 1z"
                      />
                    </g>
                  </svg>
                  <span>(0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div >
  )
}
