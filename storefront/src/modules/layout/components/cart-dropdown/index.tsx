"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base flex gap-2 items-center transition-colors duration-200"
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
            <span>({totalItems})</span>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-brand-light border-x border-b border-ui-border-base w-[420px] text-brand-dark shadow-xl"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex items-center justify-center border-b border-ui-border-base">
              <h3 className="font-serif text-lg text-brand-dark">Panier</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                <h3 className="font-serif text-base overflow-hidden text-ellipsis text-brand-dark">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  className="text-sm text-ui-fg-subtle"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Quantité: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1 text-sm text-ui-fg-subtle hover:text-brand-dark transition-colors duration-200"
                            data-testid="cart-item-remove-button"
                          >
                            Retirer
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-sm border-t border-ui-border-base">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-brand-dark font-semibold">
                      Sous-total{" "}
                      <span className="font-normal text-ui-fg-subtle">(hors taxes)</span>
                    </span>
                    <span
                      className="font-serif text-lg text-brand-dark font-semibold"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full font-serif bg-brand-dark hover:bg-brand-brown text-brand-light transition-colors duration-200"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Voir le panier
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-brand-dark text-sm flex items-center justify-center w-6 h-6 rounded-full text-brand-light">
                    <span>0</span>
                  </div>
                  <span className="font-serif text-brand-dark">Votre panier est vide.</span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">Aller à la boutique</span>
                        <Button
                          onClick={close}
                          className="font-serif bg-brand-dark hover:bg-brand-brown text-brand-light transition-colors duration-200"
                        >
                          Découvrir nos couteaux
                        </Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
