# Forge Elidor - E-Commerce Site

Site e-commerce minimaliste pour Forge Elidor, spécialisé dans la création de couteaux artisanaux uniques.

## 🏗️ Architecture

- **Backend**: Medusa.js v2 (Headless E-commerce)
- **Frontend**: Next.js 15 (App Router + Turbopack)
- **Database**: PostgreSQL 15
- **Styling**: Tailwind CSS + SCSS Modules
- **Payment**: Stripe (via @medusajs/payment-stripe)
- **Storage**: Cloudflare R2 (S3-compatible)

## 📋 Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [Docker](https://www.docker.com/products/docker-desktop/) et Docker Compose
- [Git](https://git-scm.com/)
- PostgreSQL 15 (ou utiliser Docker)

## 🚀 Installation Locale (Sans Docker)

### 1. Cloner le Projet

```bash
git clone git@github.com:Fvrenn/FlambeauProgres.git
cd forge-elidor
git checkout refactor
```

### 2. Configuration Backend

```bash
cd backend

# Copier le fichier d'environnement
cp .env.template .env

# Éditer .env avec vos credentials PostgreSQL
# DATABASE_URL=postgres://user:password@localhost:5432/medusa-db

# Installer les dépendances
npm install

# Installer les plugins
npm install @medusajs/payment-stripe @medusajs/file-s3

# Lancer les migrations
npm run build
npx medusa migrations run

# (Optionnel) Seed avec des données de démo
npx medusa seed

# Démarrer le serveur
npm run dev
```

Le backend sera accessible sur :
- **API**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app

### 3. Configuration Frontend

```bash
cd frontend

# Créer le fichier d'environnement
cp .env.local.example .env.local

# Éditer .env.local avec votre publishable key
# Créer une publishable key via: http://localhost:9000/app → Settings → Publishable API Keys

# Installer les dépendances
npm install

# Démarrer le serveur
npm run dev
```

Le frontend sera accessible sur : **http://localhost:8000**

## 🐳 Installation avec Docker

### Démarrer tous les services

```bash
# Construire et démarrer tous les services (PostgreSQL, Backend, Frontend)
docker-compose up --build

# Dans un nouveau terminal, exécuter les migrations
docker-compose exec backend npx medusa migrations run

# (Optionnel) Seed avec des données de démo
docker-compose exec backend npx medusa seed
```

### Accéder aux Services

- **Frontend Store**: http://localhost:8000
- **Medusa Admin**: http://localhost:9000/app
- **Medusa API**: http://localhost:9000

### Commandes Utiles

```bash
# Arrêter tous les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Redémarrer un service spécifique
docker-compose restart backend

# Accéder au shell d'un conteneur
docker-compose exec backend sh
```

## 📁 Structure du Projet

```
forge-elidor/
├── backend/              # Medusa.js backend
│   ├── src/             # Code source (API routes, services, entities)
│   ├── .env             # Variables d'environnement (non versionné)
│   ├── medusa-config.ts # Configuration Medusa
│   └── Dockerfile       # Image Docker backend
├── frontend/            # Next.js storefront
│   ├── src/            # Code source (pages, components)
│   ├── public/         # Assets statiques
│   ├── .env.local      # Variables d'environnement (non versionné)
│   └── Dockerfile      # Image Docker frontend
├── specs/              # Spécifications du projet
├── .specify/           # Configuration et templates
├── docker-compose.yml  # Orchestration Docker
└── README.md          # Ce fichier
```

## 🔑 Variables d'Environnement

### Backend (.env)

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa-db
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key_here
```

## 📚 Documentation

- [Spécifications du Projet](./specs/001-elidor-ecommerce-site/spec.md)
- [Plan d'Implémentation](./specs/001-elidor-ecommerce-site/plan.md)
- [Guide de Démarrage Rapide](./specs/001-elidor-ecommerce-site/quickstart.md)
- [Modèle de Données](./specs/001-elidor-ecommerce-site/data-model.md)

## 🛠️ Développement

### Créer un Utilisateur Admin

```bash
# Local
cd backend
npx medusa user -e admin@example.com -p yourpassword

# Docker
docker-compose exec backend npx medusa user -e admin@example.com -p yourpassword
```

### Ajouter des Produits

1. Accéder au dashboard admin : http://localhost:9000/app
2. Se connecter avec vos identifiants
3. Naviguer vers "Products" → "Add Product"

## 📦 Plugins Installés

- **@medusajs/payment-stripe**: Intégration Stripe pour les paiements
- **@medusajs/file-s3**: Stockage des images sur Cloudflare R2

## 🚢 Déploiement

Le projet est configuré pour être déployé sur Hostinger via Coolify.

Voir [plan.md](./specs/001-elidor-ecommerce-site/plan.md) pour les détails de déploiement.

## 📄 Licence

Propriétaire - Forge Elidor
