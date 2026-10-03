# VDEV — Corporate Portfolio & Signal Network

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)]()
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)]()

VDEV is a cutting-edge software engineering and technology architecture firm. This repository contains the source code for the official VDEV corporate platform (**vdev.ai**), including its interactive WebGL frontend and secure signal processing backend.

## System Architecture

This repository operates as a **Monorepo** containing both the client-side application and the server-side infrastructure:

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and React Three Fiber (WebGL).
- **Backend:** Node.js, Express.js.
- **Database:** SQLite3 (Local Persistent Storage).
- **Communications:** Nodemailer (SMTP Email Automation).

---

## Local Development Setup

To run the full VDEV platform locally, you must run both the frontend development server and the backend API server concurrently.

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Environment Configuration
Create a `.env` file in the root directory and populate it with the following secure credentials:

```env
# Email Automation (Gmail SMTP)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-specific-password

# Admin Security
ADMIN_API_KEY=your_secure_admin_password

# Optional: Override Frontend URL in production
# FRONTEND_URL=https://vdev.ai
```
*(Note: `GMAIL_APP_PASSWORD` must be generated from your Google Account Security Settings -> App Passwords).*

### 3. Start the Platform

Install all system dependencies:
```bash
npm install
```

Start the **Frontend Development Server** (Runs on port `5173`):
```bash
npm run dev
```

In a **new terminal window**, start the **Backend API Server** (Runs on port `3001`):
```bash
node server.js
```

---

## Production Deployment (Render)

This platform is engineered to be deployed as a **Full-Stack Web Service on Render**, combining the static frontend build and the dynamic backend into a single robust container.

### Deployment Instructions:
1. Connect this repository to a **Render Web Service**.
2. Set the **Build Command** to: `npm install && npm run build`
3. Set the **Start Command** to: `node server.js`
4. **CRITICAL:** Attach a **Persistent Disk** to the service.
   - Name: `sqlite-db`
   - Mount Path: `/opt/render/project/src`
   *(Without a persistent disk, the SQLite database `vdev_signals.db` will be wiped on every deployment).*
5. Inject your `.env` variables into the Render Environment dashboard.

---

## API Documentation

The backend exposes a secure REST API located in `server.js`.

### Submit Build Signal (Public)
`POST /api/submit-signal`
Accepts a JSON payload containing prospect data and securely writes it to the SQLite database while triggering an automated HTML email alert to the VDEV team.

### View Signals (Admin Only)
`GET /api/view-signals`
Returns a JSON array of all stored signals. 
**Security:** Requires an `x-api-key` header matching the `ADMIN_API_KEY` defined in your environment variables.

---

## Directory Structure

```
vdev-web/
├── public/                 # Static assets (3D models, textures, SEO manifests)
├── src/
│   ├── assets/             # Core branding and graphical assets
│   ├── components/         # Reusable React UI & WebGL Components
│   ├── pages/              # Primary Route Views
│   ├── App.tsx             # Main React Router configuration
│   └── main.tsx            # React DOM Entry point
├── server.js               # Express Backend API & Static File Server
├── vdev_signals.db         # SQLite Database (Automatically generated)
├── tailwind.config.js      # Global Style System Configuration
└── vite.config.ts          # Build Tooling Configuration
```

---

*Copyright © 2026 VDEV. All Rights Reserved. This code is proprietary and confidential.*
