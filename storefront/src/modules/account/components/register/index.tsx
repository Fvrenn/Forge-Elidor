"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="font-serif text-2xl text-brand-dark uppercase mb-6">
        Devenez membre Forge Elidor
      </h1>
      <p className="text-center text-base text-ui-fg-subtle mb-4">
        Créez votre profil membre et accédez à une expérience d'achat améliorée.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Prénom"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Nom"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Téléphone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Mot de passe"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-subtle text-sm mt-6">
          En créant un compte, vous acceptez la{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline text-brand-dark hover:text-ui-fg-base transition-colors duration-200"
          >
            Politique de confidentialité
          </LocalizedClientLink>{" "}
          et les{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline text-brand-dark hover:text-ui-fg-base transition-colors duration-200"
          >
            Conditions d'utilisation
          </LocalizedClientLink>
          {" "}de Forge Elidor.
        </span>
        <SubmitButton
          className="w-full mt-6 font-serif bg-brand-dark hover:bg-brand-brown text-brand-light transition-colors duration-200"
          data-testid="register-button"
        >
          Rejoindre
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-subtle text-sm mt-6">
        Déjà membre?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline text-brand-dark hover:text-ui-fg-base transition-colors duration-200"
        >
          Se connecter
        </button>
        .
      </span>
    </div>
  )
}

export default Register
