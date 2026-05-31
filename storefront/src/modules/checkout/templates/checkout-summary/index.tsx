import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-12 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0">
      <div className="w-full bg-brand-light border border-ui-border-base rounded-lg px-6 py-6 flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="font-serif text-2xl text-brand-dark mb-4"
        >
          Votre commande
        </Heading>
        <Divider className="mb-6" />
        <ItemsPreviewTemplate cart={cart} />
        <Divider className="my-4" />
        <CartTotals totals={cart} />
        <div className="mt-4">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
