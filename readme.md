# Traffic Management System

Unified team integration branch containing all module work:

- `challan-module`
- `driver-module`
- `violation-module`
- `vehicle-module` (ported and fixed because source branch had unrelated history)
- `main`

## Team Module Split (5 Members)

1. Driver Management
	- Tables: `driver`
	- Files: `frontend/src/pages/drivers/*`, `backend/routes/driverRoutes.js`
2. Vehicle Management
	- Tables: `vehicle`
	- Files: `frontend/src/pages/vehicles/*`, `backend/routes/vehicleRoutes.js`
3. Violation Management
	- Tables: `violation`
	- Files: `frontend/src/pages/violations/*`, `backend/routes/violationRoutes.js`
4. Challan Management
	- Tables: `challan`
	- Files: `frontend/src/pages/challans/*`, `backend/routes/challanRoutes.js`
5. Payment + Dashboard
	- Tables: `payment`
	- Files: `frontend/src/pages/payments/*`, `frontend/src/pages/Dashboard.jsx`, `backend/routes/paymentRoutes.js`, `backend/routes/dashboardRoutes.js`

## Branch Strategy

- `main`
- `driver-module`
- `vehicle-module`
- `violation-module`
- `challan-module`
- `payment-dashboard-module`

Use feature branches and merge through pull requests only.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL (`traffic_management`)

## Project Structure

- `backend/` API and database access
- `frontend/` React app
- `database/schema.sql` database schema

Frontend module structure:

- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Drivers.jsx`
- `frontend/src/pages/Vehicles.jsx`
- `frontend/src/pages/Violations.jsx`
- `frontend/src/pages/Challans.jsx`
- `frontend/src/pages/Payments.jsx`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/Sidebar.jsx`
- `frontend/src/components/Table.jsx`

## Backend API Routes

- `POST /api/challan/add` (legacy-compatible)
- `GET|POST /api/challans`
- `GET|POST /api/drivers`
- `PUT /api/drivers/:id`
- `GET|POST|PUT|DELETE /api/violations`
- `GET|POST /api/vehicles`
- `GET|POST /api/payments`
- `GET /api/dashboard/summary`

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
- Module ownership is split by domain, not by frontend/backend, to reduce conflicts.
