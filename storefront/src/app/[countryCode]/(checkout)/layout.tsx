import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-brand-light relative small:min-h-screen">
      <div className="h-16 bg-brand-light border-b border-ui-border-base">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 text-brand-dark hover:text-brand-green transition-colors duration-200 flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus font-serif">
              Retour au panier
            </span>
            <span className="mt-px block small:hidden txt-compact-plus font-serif">
              Retour
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center"
            data-testid="store-link"
          >
            <img
              src="/logo/dark/logo-long-dark.png"
              alt="Forge Elidor"
              className="h-8 w-auto"
            />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-6 w-full flex items-center justify-center border-t border-ui-border-base mt-8">
        <p className="text-brand-green txt-compact-small font-serif">
          Paiement sécurisé · Livraison soignée · Artisanat français
        </p>
      </div>
    </div>
  )
}
