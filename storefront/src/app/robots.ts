import { MetadataRoute } from "next"

import { getBaseURL } from "@lib/util/env"

// Sur un déploiement de préversion, mettre NEXT_PUBLIC_NOINDEX=true pour que le
// site ne soit pas référencé par Google avant sa mise en ligne réelle.
const noIndex = process.env.NEXT_PUBLIC_NOINDEX === "true"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseURL()

  if (noIndex) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*/checkout", "/*/account", "/*/cart", "/*/order"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
