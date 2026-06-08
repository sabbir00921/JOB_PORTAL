# Job Portal — Server 🚀

The backend API server for the Job Portal application, built with **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT, Bcrypt.js |
| Validation | Zod |
| File Upload | Multer, Cloudinary |
| Mailing | Nodemailer |
| Rate Limiting | Express Rate Limit |

---

## 📁 Project Structure

```text
server/
├── prisma/
│   └── schema.prisma          # Database schema & migrations
└── src/
    ├── modules/
    │   ├── auth/              # Registration, login, password reset
    │   ├── user/              # User management & account verification
    │   ├── jobSeeker/         # Job seeker profile management
    │   ├── recruiter/         # Recruiter profile management
    │   └── job/               # Job listings management
    ├── middleware/
    │   ├── auth.middleware.ts          # authGuard & allowRole
    │   ├── validateRequest.middleware.ts
    │   ├── multer.midleware.ts
    │   └── globalErrorHandler.middleware.ts
    ├── helpers/               # Utility functions & shared logic
    └── tempaletes/            # Email HTML templates
```

---

## 🔑 Environment Variables

Create a `.env` file in the root of the `server/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/job_portal"
PORT=5000
NODE_ENV=development

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_EXPIRE=1h

# Admin Setup
ADMIN_EMAILS=admin@example.com

# Mailer
HOST_MAIL=your_gmail@gmail.com
APP_PASSWORD=your_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Running the Server

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client & sync the database
npx prisma generate
npx prisma db push

# 3. Start the development server
npm run dev
```

---

## 🛣️ API Endpoints

Base URL: `/api/v1`

### 🔐 Auth — `/api/v1/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login and receive JWT tokens |
| `POST` | `/logout` | Auth | Logout and invalidate session |
| `POST` | `/forget-password` | Public | Request OTP for password reset |
| `POST` | `/verify-forget-password-otp` | Public | Verify OTP and receive reset token |
| `POST` | `/reset-password` | Public | Reset password using token |
| `POST` | `/generate-access-token` | Public | Refresh access token |

---

### 👤 User — `/api/v1/user`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/get-all-users` | Admin | Get all registered users |
| `GET` | `/get-user/:id` | Auth | Get a single user by ID |
| `PATCH` | `/update-user/:id` | Auth | Update user information |
| `PATCH` | `/change-user-status/:id` | Admin | Change user account status |
| `DELETE` | `/delete-user/:id` | Admin | Delete a user |
| `POST` | `/request-verification` | Auth | Send email verification link |
| `POST` | `/verify-account` | Public | Verify account via token |

---

### 🧑‍💼 Job Seeker — `/api/v1/job-seeker`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/add-seeker-info` | JobSeeker | Create job seeker profile (with resume upload) |
| `GET` | `/get-all-seekers` | Admin, Recruiter | Get all job seeker profiles |
| `GET` | `/get-seeker/:id` | Admin, Recruiter, JobSeeker | Get a single job seeker profile |
| `PATCH` | `/update-seeker-info/:id` | JobSeeker | Update profile (with resume upload) |
| `DELETE` | `/delete-seeker/:id` | Admin, JobSeeker | Delete job seeker profile |

---

### 🏢 Recruiter — `/api/v1/recruiter`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/get-all-recruiters` | Admin, Recruiter, JobSeeker | Get all recruiter profiles |
| `GET` | `/get-recruiter/:id` | Admin, Recruiter, JobSeeker | Get a single recruiter profile |
| `POST` | `/create-recruiter-details` | Recruiter | Create recruiter profile |
| `PATCH` | `/update-recruiter-details/:id` | Recruiter | Update recruiter profile |
| `DELETE` | `/delete-recruiter/:id` | Admin, Recruiter | Delete recruiter profile |

---

### 💼 Job — `/api/v1/job`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/create-job` | Recruiter | Create a new job listing |
| `GET` | `/get-all-jobs` | Public | Get all jobs (with filtering & pagination) |
| `GET` | `/my-jobs` | Recruiter | Get jobs posted by the logged-in recruiter |
| `GET` | `/get-job/:id` | Public | Get a single job listing |
| `PATCH` | `/update-job/:id` | Recruiter | Update a job listing |
| `DELETE` | `/delete-job/:id` | Recruiter | Delete a job listing |

---

## 🛡️ Error Handling

All errors are handled globally and return a consistent JSON structure:

```json
{
  "success": false,
  "message": "Error description",
  "status": "client Error",
  "statusCode": 400,
  "data": []
}
```