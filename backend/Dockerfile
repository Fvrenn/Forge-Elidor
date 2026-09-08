FROM node:20-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

WORKDIR /app/.medusa/server
RUN yarn install --production

EXPOSE 9000

# Les migrations sont appliquées au démarrage, puis le serveur démarre.
# Attention : avec plusieurs instances, exécuter les migrations dans un job
# dédié plutôt qu'au lancement de chaque conteneur.
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
