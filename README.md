# Job Portal - MASH TECH LTD

A comprehensive Job Portal application built with the PERN stack (PostgreSQL, Express, React, Node.js) using Prisma ORM, designed to connect Job Seekers with Recruiters.

## 🚧 Development Status

> [!IMPORTANT]
> This project is currently in an **ongoing development process**. Features are being added and refined continuously.

Frontend (Client) development is scheduled to commence once the Backend (Server) reach at least **80% completion**. The focus is currently on finalizing a robust and secure API.

## 🚀 Overview

This platform allows recruiters to post job openings, manage applications, and schedule interviews. Job seekers can browse jobs, save them for later, and apply with their resumes.

## 📁 Project Structure

```text
job_portal/
├── server/      # Node.js + Express + Prisma (Backend)
└── client/      # React + Tailwind CSS (Frontend)
```

## ✨ Features

- **Authentication**: Secure login/registration for Admin, Job Seekers, and Recruiters with JWT and OTP-based password reset.
- **Job Management**: Recruiters can create, update, and manage job listings.
- **Applications**: Job Seekers can apply for jobs and track their application status.
- **Interviews & Offers**: Complete workflow from application to interview scheduling and official offers.
- **Notifications**: Real-time notifications for application updates and interview invites.
- **Saved Jobs**: Job Seekers can save listings to review or apply later.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
- **Validation**: Zod
- **Frontend**: React.js (assuming), Tailwind CSS

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL installed and running
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mash-tech-ltd/job_portal.git
   cd job_portal
   ```

2. **Setup Server**:
   ```bash
   cd server
   npm install
   # Create a .env file and configure your database URL
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

3. **Setup Client**:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 📄 License

This project is licensed under the ISC License.
