# FurEverHome – Pet Adoption Platform

FurEverHome is a full-stack web application built to support the pet adoption process. It provides a web interface for browsing pet listings and interacting with adoption-related information.

The project was developed as a practical application of backend development, relational database management, and frontend–backend integration.

## Features

- Browse pet adoption listings
- View information about listed pets
- Search and filter available listings
- Manage application data through CRUD operations
- Connect the React frontend to backend REST API endpoints

## Tech Stack

| Area | Technologies |
|---|---|
| Backend | C#, ASP.NET |
| Frontend | React, JavaScript |
| Database | MySQL |
| Data access | Entity Framework |
| API | RESTful APIs |

## Project Structure

```text
fureverhome_repo/
├── api/                  # Backend application
├── project/              # React frontend
├── dbms-project.sln      # Visual Studio solution
├── package.json
└── README.md
```

## Application Architecture

The application uses a client–server structure:

1. **Frontend:** The React application provides the user interface and handles user interactions.
2. **Backend:** The ASP.NET application handles application logic and exposes API functionality.
3. **Database:** MySQL is used for relational data storage, with Entity Framework used for data access.
4. **Communication:** The frontend and backend communicate through API requests.

## Getting Started

### Prerequisites

- .NET SDK compatible with the backend project
- Node.js and npm
- MySQL Server
- Visual Studio or another compatible IDE

### 1. Clone the Repository

```bash
git clone https://github.com/sumijenkins/fureverhome_repo.git
cd fureverhome_repo
```

### 2. Configure the Database

- Make sure MySQL Server is running.
- Create or select the database used by the application.
- Configure the database connection string in the backend configuration.
- Apply the database setup or migrations required by the project, if applicable.

### 3. Run the Backend

Open `dbms-project.sln` in Visual Studio, restore the required NuGet packages, and configure the startup project.

Check the backend project configuration for the required connection string and launch settings, then run the application.

### 4. Run the Frontend

Open a terminal in the React application directory:

```bash
cd project
npm install
npm start
```

The development server will display the local address where the frontend is running. Make sure the backend API is also running and that the frontend is configured to use the correct API address.

## What This Project Demonstrates

- Building a web application with C# and ASP.NET
- Working with relational databases using MySQL
- Using Entity Framework for data access
- Developing and consuming RESTful APIs
- Integrating a React frontend with a backend application
- Implementing CRUD-based application functionality

## Author

**Simay Savaş**

- GitHub: [sumijenkins](https://github.com/sumijenkins)
- LinkedIn: [simay-savas](https://www.linkedin.com/in/simay-savas/)
