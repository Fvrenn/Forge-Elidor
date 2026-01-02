import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price, isLight }: { price: VariantPrice; isLight?: boolean }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className={clx("line-through", isLight ? "text-brand-light/70" : "text-ui-fg-muted")}
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("font-sans text-lg font-medium", {
          "text-brand-green": price.price_type === "sale",
          "text-brand-light": isLight && price.price_type !== "sale",
          "text-brand-brown": !isLight && price.price_type !== "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
