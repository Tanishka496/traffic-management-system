# Traffic Management System

Unified team integration branch containing all module work:

- `challan-module`
- `driver-module`
- `violation-module`
- `vehicle-module` (ported and fixed because source branch had unrelated history)
- `main`

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL (`traffic_management`)

## Project Structure

- `backend/` API and database access
- `frontend/` React app
- `database/schema.sql` database schema

## Backend API Routes

- `POST /api/challan/add`
- `GET|POST /api/drivers`
- `GET|POST|PUT|DELETE /api/violations`
- `GET|POST /api/vehicles`

## Setup

1. Import `database/schema.sql` into MySQL.
2. Configure DB environment variables (optional, defaults are provided):
	- `DB_HOST`
	- `DB_USER`
	- `DB_PASSWORD`
	- `DB_NAME`
	- `DB_PORT`
3. Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run Locally

Terminal 1:

```bash
cd backend
npm start
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Vite proxy is configured so frontend API calls to `/api/*` route to `http://localhost:5000`.

## Notes

- `node_modules` is ignored and removed from git tracking.
- Vehicle module backend/frontend was fixed and normalized to match existing schema and route conventions.
