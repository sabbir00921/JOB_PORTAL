# Job Portal — MASH TECH LTD

![Status](https://img.shields.io/badge/Status-Under%20Development-orange?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-In%20Progress-blue?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Not%20Started-red?style=for-the-badge)

> [!WARNING]
> 🚧 **This project is currently under active development.** APIs and features may change without notice. Not yet production-ready.

A full-stack **Job Portal** application connecting Job Seekers with Recruiters, built on the **PERN stack** (PostgreSQL, Express, React, Node.js) with Prisma ORM.

---

## 🚧 Development Status

> [!IMPORTANT]
> This project is currently in **active development**. The backend is nearing completion and the frontend has not yet been started.

### ✅ Backend (Server) — In Progress

The API is being built module by module with a clean, role-based architecture.

| Module | Status |
|---|---|
| Authentication (register, login, JWT, OTP reset) | ✅ Complete |
| User Management (CRUD, status control, email verification) | ✅ Complete |
| Job Seeker Profiles (with resume upload) | ✅ Complete |
| Recruiter Profiles | ✅ Complete |
| Job Listings (CRUD, search, filtering, pagination) | ✅ Complete |
| Applications & Tracking | 🔄 In Progress |
| Saved Jobs | 🔄 In Progress |
| Interviews & Offers | 📋 Planned |
| Notifications | 📋 Planned |

### ⏳ Frontend (Client) — Not Started

Frontend development will begin once the backend reaches **~80% completion**. It will be built with **React.js** and **Tailwind CSS**.

---

## 🚀 Overview

This platform allows:
- **Recruiters** to post job openings, manage applications, and schedule interviews.
- **Job Seekers** to browse and filter jobs, save listings, and apply with their resumes.
- **Admins** to manage users, roles, and platform-wide account statuses.

---

## 📁 Project Structure

```text
job_portal/
├── server/      # Node.js + Express + Prisma (Backend — Active)
└── client/      # React + Tailwind CSS (Frontend — Not Started)
```

---

## ✨ Key Features

- **Authentication & Security**: Secure login/registration with JWT access/refresh tokens and OTP-based password recovery.
- **Role-Based Access Control**: Endpoints protected by `authGuard` and `allowRole` middlewares across three roles: `admin`, `recruiter`, `jobSeeker`.
- **Email Verification**: Token-based account verification flow with Nodemailer.
- **Profile Management**: Specialized validation and data storage for Job Seeker and Recruiter profiles.
- **File Uploads**: Resume and company document uploads via Multer & Cloudinary.
- **Job Management**: Full CRUD for job listings with search, filtering, and pagination.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT, Bcrypt.js |
| Validation | Zod |
| File Uploads | Multer, Cloudinary |
| Mailing | Nodemailer |
| Frontend (Planned) | React.js, Tailwind CSS |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running
- A Cloudinary account (for file uploads)
- A Gmail account with App Password (for Nodemailer)

### Server Setup

```bash
# 1. Clone the repository
git clone https://github.com/sabbir00921/JOB_PORTAL.git
cd job_portal/server

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env file — see server/README.md for required variables

# 4. Generate Prisma client & push schema to DB
npx prisma generate
npx prisma db push

# 5. Start development server
npm run dev
```

> For full API documentation and all available endpoints, see [`server/README.md`](./server/README.md).

---

## 📄 License

This project is licensed under the **ISC License**.
