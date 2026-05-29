# Trackify — Finance Tracker

A full-stack personal finance tracking app built with:
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Spring Boot 3.3+ + PostgreSQL
- **Auth**: JWT (stateless, Bearer tokens)


## Project Structure

```
trackify/
├── backend/                    ← Spring Boot API
│   ├── src/main/java/com/trackify/
│   │   ├── entity/             User, Income, Expense
│   │   ├── repository/         JPA repositories
│   │   ├── dto/                Request/Response DTOs
│   │   ├── service/            Business logic
│   │   ├── controller/         REST endpoints
│   │   ├── security/           JWT filter + utility
│   │   └── config/             Security + CORS + static files
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/                   ← React app
│   └── src/
│       ├── pages/Auth/         Login, SignUp
│       ├── pages/Dashboard/    Home, Income, Expense
│       ├── components/         All UI components
│       ├── context/            UserContext
│       ├── hooks/              useUserAuth
│       └── utils/              axios, API paths, helpers
│
└── database-init.sql           ← PostgreSQL setup script
```

