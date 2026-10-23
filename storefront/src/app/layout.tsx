import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Lora, Bodoni_Moda } from "next/font/google"
import localFont from 'next/font/local'
import { draftMode } from "next/headers"
import { VisualEditing } from "next-sanity/visual-editing"
import { SanityLive } from "@lib/sanity-live"
import "styles/globals.css"

// Préversion : NEXT_PUBLIC_NOINDEX=true ajoute un <meta name="robots" content="noindex">
// (le robots.txt seul n'empêche pas toujours l'indexation).
const noIndex = process.env.NEXT_PUBLIC_NOINDEX === "true"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  title: {
    default: "Forge Elidor | Coutelier artisanal dans la Vallée de Munster",
    template: "%s | Forge Elidor",
  },
  description:
    "Forge Elidor — couteaux de cuisine artisanaux et pièces uniques forgés à la main par Joël Matter, dans la Vallée de Munster.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Forge Elidor",
    title: "Forge Elidor | Coutelier artisanal dans la Vallée de Munster",
    description:
      "Forge Elidor — couteaux de cuisine artisanaux et pièces uniques forgés à la main par Joël Matter, dans la Vallée de Munster.",
  },
}

const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  display: 'swap',
  variable: '--font-satoshi',
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="fr" data-mode="light" className={`${satoshi.variable} ${lora.variable} ${bodoniModa.variable}`}>
      <body>
        <main className="relative">{props.children}</main>
        {/* Mises à jour en direct + édition au clic dans l'aperçu Sanity */}
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}