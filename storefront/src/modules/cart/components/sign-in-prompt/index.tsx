import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-brand-light flex items-center justify-between p-4 rounded-lg border border-ui-border-base">
      <div>
        <Heading level="h2" className="font-serif text-xl text-brand-dark">
          Vous avez déjà un compte?
        </Heading>
        <Text className="text-sm text-ui-fg-subtle mt-2">
          Connectez-vous pour une meilleure expérience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10 font-serif bg-brand-dark hover:bg-brand-brown text-brand-light transition-colors duration-200"
            data-testid="sign-in-button"
          >
            Se connecter
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
