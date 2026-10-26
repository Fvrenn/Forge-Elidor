import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { updateRegionsWorkflow } from "@medusajs/medusa/core-flows"

// Active la carte bancaire (Stripe) sur toutes les régions, en gardant les
// moyens de paiement déjà présents.
// Usage : npx medusa exec ./src/scripts/activer-stripe.ts
export default async function activerStripe({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "payment_providers.id"],
  })

  for (const region of regions) {
    const actuels = (region.payment_providers ?? []).map((p) => p!.id)
    if (actuels.includes("pp_stripe_stripe")) {
      console.log(`- ${region.name} : Stripe déjà actif`)
      continue
    }
    await updateRegionsWorkflow(container).run({
      input: {
        selector: { id: region.id },
        update: { payment_providers: [...actuels, "pp_stripe_stripe"] },
      },
    })
    console.log(`✓ ${region.name} : Stripe activé`)
  }
}
