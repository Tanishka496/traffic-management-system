# Traffic Management System

A full-stack web application for managing traffic operations, including drivers, vehicles, violations, challans, payments, and dashboard analytics.

## Overview

This project is built as a modular team project:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL

Core functional modules:

- Driver Management
- Vehicle Management
- Violation Management
- Challan Management
- Payments and Dashboard
- Authentication (Register + Login)

## Project Structure

```text
traffic-management-system/
  backend/      # Express API + MySQL integration
  frontend/     # React app (Vite)
  database/     # SQL schema and sample data
  docs/         # Project report and documents
```

## Prerequisites

- Node.js 18+
- npm 9+
- MySQL 8+

## Database Setup

1. Create a MySQL database (or use the default):
   - `traffic_management`
2. Import schema:
   - `database/schema.sql`
3. Optional sample data:
   - `database/sample_data.sql`

## Environment Variables

Backend supports the following environment variables:

- `PORT` (default: `5000`)
- `DB_HOST` (default: `localhost`)
- `DB_USER` (default: `root`)
- `DB_PASSWORD` (default: empty)
- `DB_NAME` (default: `traffic_management`)
- `DB_PORT` (default: `3306`)
- `APP_USERNAME` (default fallback login: `admin`)
- `APP_PASSWORD` (default fallback login: `admin123`)

Notes:

- The `users` table is auto-created by the auth route if it does not exist.
- Fallback admin login is enabled for first-run compatibility.

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run Locally

Start backend (Terminal 1):

```bash
cd backend
npm start
```

Start frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Vite proxy forwards:

- `/api/*` -> `http://localhost:5000`
- `/drivers/*` -> `http://localhost:5000`

## Backend Scripts

From `backend/`:

- `npm start` -> Run server
- `npm run dev` -> Run server (same as start in current setup)

## Frontend Scripts

From `frontend/`:

- `npm run dev` -> Start Vite development server
- `npm run build` -> Create production build
- `npm run preview` -> Preview production build
- `npm run lint` -> Run ESLint

## API Endpoints

Base URL: `http://localhost:5000`

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Drivers:

- `GET /api/drivers`
- `POST /api/drivers`

Vehicles:

- `GET /api/vehicles`
- `POST /api/vehicles`

Violations:

- `GET /api/violations`
- `POST /api/violations`
- `PUT /api/violations/:id`
- `DELETE /api/violations/:id`

Challans:

- `POST /api/challan/add`
- `POST /api/challans/add`

Payments:

- `GET /api/payments`
- `POST /api/payments`

Dashboard:

- `GET /api/dashboard/summary`

Legacy-compatible routes are also mounted for:

- `/drivers`
- `/violations`

## Authentication

- Users can register through `POST /api/auth/register`.
- Registered users can log in with their credentials.
- Default fallback login:
  - Username: `admin`
  - Password: `admin123`

## Troubleshooting

- Port already in use:
  - Change `PORT` or stop the process using the current port.
- Database connection failed:
  - Verify MySQL is running and DB credentials are correct.
- Frontend cannot reach backend:
  - Confirm backend runs on port `5000` (or update proxy in `frontend/vite.config.js`).

## Team Branching Model

Recommended branches:

- `main`
- `driver-module`
- `vehicle-module`
- `violation-module`
- `challan-module`
- `payment-dashboard-module`

Use feature branches and merge via pull requests.

## License

This project is for academic and educational use.
