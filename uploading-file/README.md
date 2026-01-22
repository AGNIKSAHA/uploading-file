# 📁 Drive-Style File Upload Frontend

A **Google Drive–inspired frontend application** built with **Vite + React + TypeScript + Tailwind CSS**.
This repository contains **frontend code only**.

---

## 🚀 Features

- Vite + React + TypeScript
- Tailwind CSS UI
- React Router (new data router)
- Google Drive–style layout
  - Navbar with active tabs & search bar
  - Collapsible sidebar
  - Storage usage bar
- Upload features
  - Upload button  (+ New)
  - Background upload popup with progress
- File list view
  - Instant appearance while uploading
  - Uploading / completed / failed states
- Delete uploaded files
- Non-blocking UI

---

## 🧱 Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- XMLHttpRequest (for upload progress)

---

## 📁 Project Structure

```
src/
├── components/
├── layouts/
├── pages/
├── services/
├── hooks/
├── types/
├── router.tsx
├── main.tsx
└── index.css
```

---

## ⚙️ Setup & Run

```bash
npm install
npm run dev
```

Runs at:
```
http://localhost:5173
```

---

## 🔌 Backend API (Expected)

| Method | Endpoint |
|------|---------|
| POST | /upload |
| GET | /files |
| DELETE | /files/{filename} |

Backend must allow CORS for the Vite origin.

---

## 📤 Upload Behavior

- Files appear instantly as `uploading`
- Background uploads (non-blocking)
- Progress shown in side popup
- Auto-refresh file list on completion

---

## 🗑 Delete Behavior

- Only completed files can be deleted
- Uploading files are protected
- Optimistic UI update

---

## 📊 Storage Bar

- Sidebar storage usage indicator
- Mock data (ready for backend integration)

---

## 🔐 Auth Pages

Login and Signup pages are UI-only.

---

## 📄 License

MIT
