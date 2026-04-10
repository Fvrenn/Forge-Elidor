import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-brand-light flex flex-col rounded-lg border border-ui-border-base p-6">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-ui-border-base py-12 gap-8">
          <div>
            <h3 className="font-serif text-xl text-brand-dark mb-4">Des questions?</h3>
            <span className="text-sm text-ui-fg-subtle">
              Vous pouvez trouver les questions fréquentes et leurs réponses sur notre
              page de service client.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Service client
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
