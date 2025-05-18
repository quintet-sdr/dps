# Distributed PDF System (DPS)
> A decentralized, peer-coordinated PDF sharing and storage system — inspired by Napster.
## Innopolis University S25 System and Network administration 

---

## 🚧 Tech Stack Overview

### 🖥️ Frontend

| Framework      | UI             | Styling         | Forms           | Data Fetching    | Validation     | Language       | Package Manager | Process Manager |
|----------------|----------------|-----------------|-----------------|-----------------|----------------|----------------|-----------------|-----------------|
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/nextjs/nextjs.png" width="40" /> | <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" width="40" /> | <img src="https://raw.githubusercontent.com/github/explore/main/topics/tailwind/tailwind.png" width="40" /> | <img src="https://react-hook-form.com/favicon.ico" width="40" /> | <img src="https://react-query.tanstack.com/_next/static/favicon/favicon-32x32.png" width="40" /> | <img src="https://zod.dev/favicon.ico" width="40" /> | <img src="https://www.typescriptlang.org/favicon-32x32.png" width="40" /> | <img src="https://pnpm.io/favicon.ico" width="40" /> | <img src="https://pm2.keymetrics.io/favicon.ico" width="40" /> |
| [Next.js](https://nextjs.org/) | [React](https://reactjs.org/) | [TailwindCSS](https://tailwindcss.com/) | [react-hook-form](https://react-hook-form.com/) | [React Query](https://tanstack.com/query) | [Zod](https://zod.dev/) | [TypeScript](https://www.typescriptlang.org/) | [pnpm](https://pnpm.io/) | [PM2](https://pm2.keymetrics.io/) |

---

### 🛠️ Backend

| Framework     | ORM           | Auth           | Hashing        | Database       | Language      |
|---------------|---------------|----------------|----------------|----------------|---------------|
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/nestjs/nestjs.png" width="40" /> | <img src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.svg" width="40" /> | <img src="https://jwt.io/img/favicon-32x32.png" width="40" /> | <img src="https://argon2.github.io/img/favicon.ico" width="40" /> | <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" width="40" /> | <img src="https://www.typescriptlang.org/favicon-32x32.png" width="40" /> |
| [NestJS](https://nestjs.com/) | [TypeORM](https://typeorm.io/) | [JWT](https://jwt.io/) | [Argon2](https://github.com/P-H-C/phc-winner-argon2) | [PostgreSQL](https://www.postgresql.org/) | [TypeScript](https://www.typescriptlang.org/) |

---

### ⚙️ Deployment & Monitoring

| Containerization | Proxy          | Monitoring    | Metrics        |
|------------------|----------------|---------------|----------------|
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/docker/docker.png" width="40" /> | <img src="https://raw.githubusercontent.com/github/explore/main/topics/nginx/nginx.png" width="40" /> | <img src="https://raw.githubusercontent.com/grafana/grafana/main/docs/static/img/favicon.png" width="40" /> | <img src="https://prometheus.io/assets/prometheus_logo_grey.svg" width="40" /> |
| [Docker](https://www.docker.com/) | [Nginx](https://nginx.org/) | [Grafana](https://grafana.com/) | [Prometheus](https://prometheus.io/) |

---

## 🧭 Overview

The Distributed PDF System (DPS) is a full-stack project designed to provide scalable, distributed storage, sharing, and retrieval of PDF documents. It consists of:

- **Backend** — NestJS REST API with user and file management
- **Frontend** — Next.js web interface for users
- **Sharding Node** — Java-based service for file chunking/storage (Coming Soon)
- **Reverse Proxy & Monitoring** — NGINX, Prometheus, and Grafana

This system was developed as part of the System & Network Administration course at Innopolis University (S25).

---

## 🏗️ System Architecture

```plaintext
                   ┌────────────┐
                   │  Frontend  │  ← Next.js Web UI
                   └─────┬──────┘
                         │ HTTP
                         ▼
                   ┌────────────┐
                   │  Backend   │  ← NestJS (API Gateway)
                   └─────┬──────┘
                         │ gRPC/HTTP
                         ▼
                ┌──────────────────┐
                │  Sharding Nodes  │  ← Java microservices (Coming Soon)
                └──────────────────┘
                         │
                         ▼
                   File System
                  ┌────────────┐
                  │  NGINX     │  ← Reverse proxy
                  └─────┬──────┘
                        │
         ┌────────────┐ └───────────────────────────┐
         │ Prometheus │ ───── metrics scraping      │
         └────┬───────┘                             ▼
              │                                 ┌────────────┐
              └──────────────────────────────▶ │  Grafana    │
                                                └────────────┘
````

---

## 📂 Project Structure

```plaintext
dps/
├── backend/            # NestJS backend server
├── frontend/           # Next.js frontend client
├── sharding/           # Java-based sharding node (Coming Soon)
├── watchproxy/         # NGINX config, Prometheus & Grafana
├── .github/            # CI/CD workflows
├── README.md           # ← you're here
```

---

## ⚙️ Backend (NestJS)

Located in: `dps/backend`

### Features

* User authentication via JWT & local strategies
* File & chunk upload, update, delete
* Node registration (for storage nodes)
* Dockerized & container-ready

### Getting Started

1. Copy `.env.example` to `.env` and fill in your environment variables before starting.

```bash
cd backend
pnpm install

# Start in dev mode
pnpm run start:dev

# Start in prod
pnpm run start:prod
```

### API Docs

Visit: [http://45.156.22.249/docs](http://45.156.22.249/docs) — auto-generated Swagger UI proxied via NGINX

---

## 🌐 Frontend (Next.js)

Located in: `dps/frontend`

### Features

* Upload and manage PDF files
* Browse stored documents
* Modern interface using Next.js App Router

### Getting Started

1. Copy `.env.example` to `.env` and configure environment variables.

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://45.156.22.249](http://45.156.22.249) for production or [http://localhost:3000](http://localhost:3000) in development.

---

## 🧩 Sharding Node (Java)

Coming Soon...

---

## 🔒 Authentication

The backend implements:

* Local Strategy (username + password)
* JWT Token issuance
* Guards for authenticated routes

> See `/auth/` folder in backend for strategy and guards.

---

## 🧪 Testing

Backend:

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Coverage
pnpm run test:cov
```

Frontend:

```bash
# If test setup exists:
pnpm run test
```

---

## 🚀 Deployment

Backend, Sharding Node, and Proxy are containerized.

To deploy everything with Docker Compose:

```bash
# For backend
cd backend
docker-compose up --build

# For sharding
cd sharding
docker compose up

# For nginx/prometheus/grafana
cd watchproxy
docker-compose up --build
```

---

## 📊 Monitoring

* Prometheus: [http://45.156.22.249/prometheus](http://45.156.22.249/prometheus)
* Grafana: [http://45.156.22.249/grafana](http://45.156.22.249/grafana)

---

## 🔄 CI/CD

GitHub Actions:

* `.github/workflows/ci.yml`: Build & test
* `.github/workflows/cd.yml`: Deployment pipeline

---

## 📜 License

* Backend/Frontend: MIT License — see [LICENSE](./LICENSE)
* Sharding node: BSD — see [LICENSE-BSD](./LICENSE-BSD)

---

## 📮 Maintainers

Developed at Innopolis University as part of the S25 System & Network Administration course.

---