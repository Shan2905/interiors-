# Yedukondalu Interiors — Full-Stack Web App

A premium full-stack web application for **Yedukondalu Interiors & Paints**, Guntur, Andhra Pradesh.

## 🗂️ Project Structure

```
yedukondalu-interiors/
├── client/          ← React Frontend (Vite)
├── server/          ← Node.js + Express Backend
├── .env             ← Environment variables
└── README.md
```

## 🚀 Getting Started

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Start Backend (Terminal 1)
```bash
cd server
npm run dev
```
> Server runs on http://localhost:5000

### 4. Start Frontend (Terminal 2)
```bash
cd client
npm run dev
```
> App runs on http://localhost:5173

---

## 🔐 Admin Dashboard

- URL: Click **Admin** in the navbar
- Password: `yedukondalu123`
- Shows all orders and contact enquiries
- Data persists in `server/data/db.json`

## 🌐 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/orders | Get all orders |
| POST | /api/orders | Create new order |
| DELETE | /api/orders/:id | Delete an order |
| GET | /api/contacts | Get all enquiries |
| POST | /api/contact | Submit contact form |
| DELETE | /api/contacts/:id | Delete an enquiry |

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite |
| Backend | Node.js, Express |
| Database | JSON file (zero setup) |
| Fonts | Google Fonts (Playfair Display + Inter) |

## ☁️ Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |

---

Built with ❤️ for Yedukondalu Interiors, Guntur.
