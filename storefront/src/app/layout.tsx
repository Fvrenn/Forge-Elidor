import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Lora, Bodoni_Moda } from "next/font/google"
import localFont from 'next/font/local'
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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-mode="light" className={`${satoshi.variable} ${lora.variable} ${bodoniModa.variable}`}>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}