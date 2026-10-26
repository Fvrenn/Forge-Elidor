import { loadEnv, defineConfig } from '@medusajs/framework/utils'
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// URL publique du backend, utilisée pour construire les URLs des fichiers
// uploadés depuis l'admin. En local : http://localhost:9000
const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      // Stockage des images produit. Le provider "local" écrit dans
      // backend/static : monter un volume persistant sur ce dossier en
      // production, sinon les images uploadées disparaissent à chaque
      // redéploiement. Pour du long terme, passer sur S3 / Cloudflare R2.
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              upload_dir: "static",
              backend_url: `${BACKEND_URL}/static`,
            },
          },
        ],
      },
    },
    // Paiement par carte via Stripe, chargé seulement si la clé est définie
    // (sinon le backend refuse de démarrer). Clés test (sk_test_...) pour
    // essayer le checkout sans argent réel, clés live au lancement.
    // Webhook Stripe à déclarer sur : <MEDUSA_BACKEND_URL>/hooks/payment/stripe_stripe
    ...(process.env.STRIPE_API_KEY
      ? [
          {
            resolve: "@medusajs/medusa/payment",
            options: {
              providers: [
                {
                  resolve: "@medusajs/medusa/payment-stripe",
                  id: "stripe",
                  options: {
                    apiKey: process.env.STRIPE_API_KEY,
                    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
                    // Encaisse directement à la commande : un paiement
                    // seulement autorisé expire au bout de 7 jours
                    capture: true,
                  },
                },
              ],
            },
          },
        ]
      : []),
  ],
})
