# Job Portal Server 🚀

The backend server for the Job Portal application, built with Node.js, Express, and Prisma.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Security**: JWT, Bcryptjs, Express Rate Limit
- **Validation**: Zod
- **Mailing**: Nodemailer

## 📁 Repository Structure

- `src/modules`: Contains business logic divided by domains (Auth, Users, Jobs, etc.).
- `src/middleware`: Custom Express middlewares (Auth guard, validation, error handling).
- `src/helpers`: Utility classes and helper functions.
- `prisma/`: Database schema and migrations.

## 🔑 Environment Variables

Create a `.env` file in the root of the `server` directory and add the following:

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
```

## 🚀 Running the Server

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Sync Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 🛣️ API Endpoints Summary

### Auth Module
- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Login user and receive tokens.
- `POST /api/v1/auth/forget-password`: Request OTP for password reset.
- `POST /api/v1/auth/verify-forget-password-otp`: Verify OTP and get reset token.
- `POST /api/v1/auth/reset-password`: Reset password using token.

## 🛡️ Error Handling

The server uses a global error handler that provides structured JSON responses:
```json
{
    "success": false,
    "message": "Error description",
    "status": "client Error",
    "statusCode": 400,
    "data": [] // Optional validation details
}
```