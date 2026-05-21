# Job Portal Client 🌐

The frontend application for the Job Portal, built with React and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit / Context API
- **Networking**: Axios
- **Icons**: Lucide React / FontAwesome

## 📁 Suggested Structure

- `src/components`: Reusable UI components.
- `src/pages`: Main page views.
- `src/hooks`: Custom React hooks.
- `src/services`: API calling logic.
- `src/store`: Redux store configuration.

## ⚙️ Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```

3. **Run for development**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Design Principles

- **Responsive**: Mobile-first design using Tailwind's layout utilities.
- **Glassmorphism**: Modern UI with subtle blurs and gradients.
- **Interactive**: Smooth transitions and hover effects for a premium feel.
