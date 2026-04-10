import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row font-serif text-3xl gap-x-2 items-baseline text-brand-dark"
      >
        Panier
      </Heading>
      <Text className="text-base mt-4 mb-6 max-w-[32rem] text-ui-fg-subtle">
        Votre panier est vide. Changeons cela, utilisez le lien ci-dessous pour commencer à parcourir nos couteaux.
      </Text>
      <div>
        <InteractiveLink href="/store">Découvrir nos couteaux</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
