# Distributed PDF System (DPS)
> A decentralized, peer-coordinated PDF sharing and storage system — inspired by Napster.
## Innopolis University S25 System and Network administration 

---

## 🚧 Tech Stack Overview

### 🖥️ Frontend

[![Next.js](https://img.shields.io/badge/Frontend-Next.js-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/UI-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/UI%20Library-shadcn/ui-111827)](https://ui.shadcn.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![react-hook-form](https://img.shields.io/badge/Form-react--hook--form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![react-query](https://img.shields.io/badge/Data%20Fetching-React--Query-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zod](https://img.shields.io/badge/Validation-Zod-3c3c3c)](https://zod.dev/)
[![PM2](https://img.shields.io/badge/Process%20Manager-PM2-2B037A?logo=pm2&logoColor=white)](https://pm2.keymetrics.io/)
[![pnpm](https://img.shields.io/badge/Package%20Manager-pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/) 
---

### 🛠️ Backend 

[![NestJS](https://img.shields.io/badge/Backend-NestJS-e0234e?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/badge/ORM-TypeORM-262627?logo=typeorm&logoColor=white)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![argon2](https://img.shields.io/badge/Password%20Hashing-Argon2-3c3c3c)](https://github.com/P-H-C/phc-winner-argon2)

---

### ⚙️ Deployment & Monitoring
[![Docker](https://img.shields.io/badge/Containerized-Docker-2496ed?logo=docker&logoColor=white)](https://www.docker.com/)
[![Grafana](https://img.shields.io/badge/Monitoring-Grafana-F46800?logo=grafana&logoColor=white)](https://grafana.com/)
[![Prometheus](https://img.shields.io/badge/Monitoring-Prometheus-E6522C?logo=prometheus&logoColor=white)](https://prometheus.io/)
[![Nginx](https://img.shields.io/badge/Proxy-Nginx-009639?logo=nginx&logoColor=white)](https://nginx.org/)

---

## 🧭 Overview

The Distributed PDF System (DPS) is a full-stack project designed to provide scalable, distributed storage, sharing, and retrieval of PDF documents. It consists of:

- **Backend** — NestJS REST API with user and file management
- **Frontend** — Next.js web interface for users
- **Sharding Node** — Java-based service for file chunking/storage (Coming Soon)
- **Reverse Proxy & Monitoring** — NGINX, Prometheus, and Grafana

This system was developed as part of the System & Network Administration course at Innopolis University (S25).

---

## ⚙️ Backend (NestJS)

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
Access by default: [http://localhost:8000](http://localhost:8000)
---

## 🌐 Frontend (Next.js)

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

Access by default: [http://localhost:3001](http://localhost:3001)

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

* Prometheus: [http://localhost:9090](http://localhost:9090)
* Grafana: [http://localhost:3000](http://localhost:3000)

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
