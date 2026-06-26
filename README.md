# 🐛 BugTracker Pro — Enterprise Bug Management System

> A world-class, production-ready bug tracking platform built with React, Three.js, Node.js, Express, and MongoDB.

![BugTracker Pro](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

---

## ✨ Features

- 🌌 **Interactive 3D Background** — Three.js particle systems, floating orbs, neon rings, mouse-reactive camera
- 🎨 **Ultra-Premium UI** — Dark futuristic theme, glassmorphism, neon gradients, Framer Motion animations
- 🐞 **Full Bug Lifecycle** — Create, edit, delete, assign, comment, tag, filter, sort
- 📊 **Analytics Dashboard** — Area/pie/bar charts via Recharts, real-time stats
- 👥 **JWT Authentication** — Register, login, role-based access (admin/manager/developer/qa)
- 🔔 **Notifications** — In-app notification center
- 📱 **Fully Responsive** — Works on mobile, tablet, desktop

---

## 🗂️ Project Structure

```
bug-tracker-pro/
├── frontend/                  # React + Vite + Tailwind app
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/            # Three.js / R3F background
│   │   │   └── layout/        # Sidebar, Navbar
│   │   ├── pages/             # Route pages
│   │   ├── store/             # Zustand state stores
│   │   └── index.css          # Global styles + Tailwind
│   ├── .env.example
│   └── vite.config.js
├── backend/                   # Node.js + Express API
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express route handlers
│   ├── middleware/            # JWT auth middleware
│   ├── server.js
│   └── .env.example
└── README.md
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/bug-tracker-pro.git
cd bug-tracker-pro
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env
# Edit .env and fill in your values
npm install
npm run dev   # starts on http://localhost:5000
```

### 3. Frontend setup
```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api for local dev
npm install
npm run dev   # starts on http://localhost:5173
```

### 4. Demo credentials (auto-seeded)
| Role  | Email                      | Password   |
|-------|----------------------------|------------|
| Admin | admin@bugtracker.pro       | Admin@123  |
| Dev   | dev@bugtracker.pro         | Dev@123    |

---

## ☁️ Deployment Guide

### Step 1 — MongoDB Atlas
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) → Create free cluster
2. **Database Access** → Add user with read/write permissions
3. **Network Access** → Allow access from anywhere (`0.0.0.0/0`)
4. **Connect** → Copy your connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/bugtracker
   ```

---

### Step 2 — Deploy Backend to Render

1. Push code to GitHub (see GitHub section below)
2. Go to [https://render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo, select the **`backend`** folder as root
4. Configure:
   | Field        | Value               |
   |--------------|---------------------|
   | Build Command | `npm install`      |
   | Start Command | `node server.js`   |
   | Node Version  | `20`               |
5. Add **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_very_long_random_secret
   JWT_EXPIRES_IN=30d
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   PORT=5000
   ```
6. Click **Deploy** → Copy your Render URL (e.g. `https://bugtracker-api.onrender.com`)

---

### Step 3 — Deploy Frontend to Vercel

1. Go to [https://vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add **Environment Variable**:
   ```
   VITE_API_URL=https://bugtracker-api.onrender.com/api
   ```
5. Click **Deploy** → Your app is live! 🎉

---

## 📤 Push to GitHub (Step-by-Step)

```bash
# 1. Create a new repo on github.com (don't add README/gitignore there)

# 2. In your project root:
cd bug-tracker-pro

git init
git add .
git commit -m "🚀 Initial commit: BugTracker Pro"

# 3. Link to GitHub (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/bug-tracker-pro.git

# 4. Push
git branch -M main
git push -u origin main
```

> ⚠️ Never push your `.env` files — they're in `.gitignore`

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bugtracker
JWT_SECRET=change_this_to_a_random_64_char_string
JWT_EXPIRES_IN=30d
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🛠️ Tech Stack

| Layer      | Technology                                         |
|------------|----------------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS v4, Framer Motion    |
| 3D         | Three.js, React Three Fiber, @react-three/drei    |
| State      | Zustand + persist middleware                       |
| Charts     | Recharts                                           |
| Backend    | Node.js, Express.js                               |
| Database   | MongoDB + Mongoose                                 |
| Auth       | JWT (jsonwebtoken) + bcryptjs                     |
| HTTP       | Axios                                              |
| Deploy     | Vercel (frontend) + Render (backend) + Atlas (DB) |

---

## 📋 API Endpoints

### Auth
| Method | Endpoint             | Description      |
|--------|----------------------|------------------|
| POST   | /api/auth/register   | Create account   |
| POST   | /api/auth/login      | Login            |
| GET    | /api/auth/me         | Get current user |
| PUT    | /api/auth/profile    | Update profile   |

### Bugs
| Method | Endpoint                    | Description        |
|--------|-----------------------------|--------------------|
| GET    | /api/bugs                   | List bugs (filter) |
| POST   | /api/bugs                   | Create bug         |
| GET    | /api/bugs/:id               | Get bug detail     |
| PUT    | /api/bugs/:id               | Update bug         |
| DELETE | /api/bugs/:id               | Delete bug         |
| POST   | /api/bugs/:id/comments      | Add comment        |
| GET    | /api/bugs/stats             | Dashboard stats    |

---

## 🎨 Color Palette

| Name         | Hex       | Usage                    |
|--------------|-----------|--------------------------|
| Neon Blue    | `#00d4ff` | Primary accent, charts   |
| Neon Purple  | `#bf5af2` | Secondary accent         |
| Neon Pink    | `#ff2d78` | Alerts, critical         |
| Dark 900     | `#020408` | Background               |
| Dark 800     | `#060d16` | Card backgrounds         |
| Green        | `#00ff87` | Success, resolved        |
| Yellow       | `#ffd700` | Warning, testing         |

---

## 📄 License

MIT © 2024 BugTracker Pro
