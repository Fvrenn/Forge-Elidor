import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Lora, Bodoni_Moda } from "next/font/google"
import localFont from 'next/font/local'
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
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
    <html lang="en" data-mode="light" className={`${satoshi.variable} ${lora.variable} ${bodoniModa.variable}`}>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}