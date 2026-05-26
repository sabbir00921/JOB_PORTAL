# Job Portal - MASH TECH LTD

A comprehensive Job Portal application built with the PERN stack (PostgreSQL, Express, React, Node.js) using Prisma ORM, designed to connect Job Seekers with Recruiters.

## 🚧 Development Status

> [!IMPORTANT]
> This project is currently in an **ongoing development process**. Features are being added and refined continuously.

Frontend (Client) development is scheduled to commence once the Backend (Server) reach at least **80% completion**. The focus is currently on finalizing a robust and secure API.

### Current Backend Progress
- **Authentication Module**: Secure login/registration, JWT integration, password hashing, and OTP-based password reset flows are implemented and validated.
- **Role-Based Profiles**: Dedicated modules for **Job Seekers** and **Recruiters**, handling detailed profile information.
- **File Management**: Integrated **Cloudinary** and **Multer** for seamless handling of media, including profile pictures, resumes, and company documents.
- **Database Schema**: Refined Prisma schema for robust many-to-many relations handling applications and saved jobs.

## 🚀 Overview

This platform allows recruiters to post job openings, manage applications, and schedule interviews. Job seekers can browse jobs, save them for later, and apply with their resumes.

## 📁 Project Structure

```text
job_portal/
├── server/      # Node.js + Express + Prisma (Backend)
└── client/      # React + Tailwind CSS (Frontend - Pending)
```

## ✨ Features

- **Authentication & Security**: Secure login/registration for Job Seekers and Recruiters with JWT and robust OTP-based password recovery.
- **Profile Management**: Specialized data validation and storage for user profiles based on roles.
- **File Uploads**: Support for uploading resumes, company logos, and documents via Cloudinary.
- **Job Management**: Recruiters can create, update, and manage job listings. (In Progress)
- **Applications & Tracking**: Job Seekers can apply for jobs and track their application status. (In Progress)
- **Saved Jobs**: Job Seekers can save listings to review or apply later. (In Progress)
- **Interviews & Offers**: Complete workflow from application to interview scheduling and official offers. (Planned)
- **Notifications**: Real-time notifications for application updates and interview invites. (Planned)

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
- **File Upload**: Multer, Cloudinary
- **Validation**: Zod
- **Frontend**: React.js, Tailwind CSS (Upcoming)

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL installed and running
- npm or yarn
- Cloudinary account for file uploads

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
   # Create a .env file and configure your DATABASE_URL, CLOUDINARY credentials, and JWT_SECRET
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

3. **Setup Client** (Once Available):
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 📄 License

This project is licensed under the ISC License.
