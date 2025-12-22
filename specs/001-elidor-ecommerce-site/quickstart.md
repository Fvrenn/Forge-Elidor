# Quick Start Guide: Forge Elidor

This guide provides the essential steps to get the development environment up and running for the Forge Elidor project.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose
- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)

## 1. Clone the Repository

Clone the project to your local machine.

```bash
git clone <repository-url>
cd forge-elidor
```

## 2. Environment Variables

The project is composed of two main services: `backend` (Medusa) and `frontend` (Next.js). Each requires its own environment variable file.

- In the `/backend` directory, create a `.env` file. At a minimum, you will need to define the database connection string and a secret key.
  ```env
  DATABASE_URL=postgres://user:password@localhost:5432/medusa-db
  JWT_SECRET=supersecret
  COOKIE_SECRET=supersecret
  ```

- In the `/frontend` directory, create a `.env.local` file to point to the Medusa backend.
  ```env
  NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
  ```

## 3. Build and Run Services

The simplest way to start all services (including the PostgreSQL database) is using Docker Compose.

```bash
docker-compose up --build
```

This command will:
1. Build the Docker images for the `backend` and `frontend` services.
2. Start containers for the backend, frontend, and a PostgreSQL database.
3. The frontend will be accessible at `http://localhost:3000`.
4. The backend API will be available at `http://localhost:9000`.

## 4. Run Medusa Migrations

After starting the services for the first time, you need to run the database migrations for the Medusa backend. This will create the necessary tables, including the custom `InterestNotification` entity.

Open a new terminal and execute the following command:

```bash
docker-compose exec backend medusa migrations run
```

## 5. Accessing the Services

- **Frontend Store**: [http://localhost:3000](http://localhost:3000)
- **Medusa Backend API**: [http://localhost:9000](http://localhost:9000)
- **Medusa Admin**: [http://localhost:7001](http://localhost:7001) (To create an admin user, run `docker-compose exec backend medusa user -e admin@test.com -p supersecret`)

You are now ready to start development.
