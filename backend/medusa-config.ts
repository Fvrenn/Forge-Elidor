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
  ],
})
