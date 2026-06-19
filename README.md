# Job Tracker API

A REST API backend for tracking job applications — built with Node.js, Express, and MySQL.

---

## Project Overview

Job Tracker is a backend API that lets users manage their job applications. It supports creating, reading, updating, and deleting applications, with search across company name and job title, filtering by status, and pagination.

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MySQL
- **Driver** — mysql2
- **Environment** — dotenv
- **Dev Tool** — nodemon

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [MySQL](https://dev.mysql.com/downloads/) v8 or higher

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-tracker-backend.git
cd job-tracker-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and update:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=job_tracker
PORT=5000
```

### 4. Set up the database

Run the schema file to create the database and tables:

```bash
mysql -u root -p < database/schema.sql
```

Or open MySQL Workbench, paste the contents of `database/schema.sql`, and run it.

### 5. (Optional) Seed the database

To insert some sample data for testing:

```bash
mysql -u root -p < database/seed.sql
```

---

## Running in Development Mode

```bash
npm run dev
```

Server will start at `http://localhost:5000`

---

## Folder Structure

```
job-tracker-backend/
├── config/
│   └── db.js                  # MySQL connection pool
├── database/
│   ├── schema.sql             # Table definitions
│   └── seed.sql               # Sample data
├── models/
│   └── application.model.js   # SQL queries
├── services/
│   └── application.service.js # Business logic
├── controllers/
│   └── application.controller.js # Request/response handling
├── routes/
│   └── application.routes.js  # API route definitions
├── utils/
│   └── AppError.js            # Custom error class (carries HTTP status codes)
├── .env                       # Environment variables (not committed)
├── .env.example               # Environment variable template
└── index.js                   # Entry point
```

---

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applications` | Get all applications |
| GET | `/applications/:id` | Get a single application |
| POST | `/applications` | Create a new application |
| PATCH | `/applications/:id` | Update an application |
| DELETE | `/applications/:id` | Delete an application |

---

### GET `/applications`

Returns a list of applications. Each item in the list includes only `id`, `company_name`, `job_title`, and `applied_date` — use `GET /applications/:id` to get the full record. Supports search, filtering, and pagination via query params.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Searches both `company_name` and `job_title` (partial match) |
| `status` | string | Filter by status (`Applied`, `Interviewing`, `Offer`, `Rejected`) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 10) |

**Example request:**

```
GET /api/applications?search=Google&status=Applied&page=1&limit=10
```

**Example response:**

```json
{
  "applications": [
    {
      "id": 1,
      "company_name": "Google",
      "job_title": "Frontend Developer",
      "applied_date": "2026-06-17"
    }
  ],
  "total": 43,
  "currentPage": 1,
  "totalPages": 5
}
```

---

### GET `/applications/:id`

Returns the full record for a single application.

**Example request:**

```
GET /api/applications/1
```

**Example response:**

```json
{
  "id": 1,
  "company_name": "Google",
  "job_title": "Frontend Developer",
  "job_type": "Full-time",
  "status": "Applied",
  "applied_date": "2026-06-17",
  "notes": "Applied through LinkedIn.",
  "created_at": "2026-06-17T00:00:00.000Z",
  "updated_at": "2026-06-17T00:00:00.000Z"
}
```

---

### POST `/applications`

Creates a new application.

**Request body:**

```json
{
  "company_name": "Google",
  "job_title": "Frontend Developer",
  "job_type": "Full-time",
  "status": "Applied",
  "applied_date": "2026-06-17",
  "notes": "Applied through LinkedIn."
}
```

**Validation rules:**

- `company_name` — required, minimum 2 characters
- `job_title` — required
- `job_type` — must be `Internship`, `Full-time`, or `Part-time`
- `status` — must be `Applied`, `Interviewing`, `Offer`, or `Rejected`
- `applied_date` — required
- `notes` — optional

---

### PATCH `/applications/:id`

Partially updates an existing application. Only send the fields you want to update.

**Example request body:**

```json
{
  "status": "Interviewing",
  "notes": "Technical round scheduled."
}
```

---

### DELETE `/applications/:id`

Deletes an application by ID.

**Example request:**

```
DELETE /api/applications/1
```

---

## Error Handling

All errors are returned in a consistent JSON format using a custom `AppError` class. Each error response includes a message and the name of the function where it occurred.

**Error response shape:**

```json
{
  "message": "Application not found",
  "error": "getApplicationByIdController"
}
```

**Common status codes:**

| Status | Meaning | Example |
|--------|---------|---------|
| 400 | Bad request — invalid or missing data | Missing required fields, company name too short |
| 404 | Not found | Application ID doesn't exist |
| 500 | Server error | Database failure, unexpected error |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host (usually `localhost`) |
| `DB_USER` | MySQL username |
| `DB_PASS` | MySQL password |
| `DB_NAME` | MySQL database name |
| `PORT` | Port the server runs on (default: 5000) |

See `.env.example` for a template.

---

## Live Demo

Coming soon.

---

## License

MIT
