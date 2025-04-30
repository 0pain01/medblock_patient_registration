# Patient Registration System

This project is a **React**-based application that allows users to register patients, query patient records using SQL, persist patient data across page refreshes, and supports multi-tab usage. The system utilizes **PGlite** (a lightweight SQLite client for the browser) to store patient data in an IndexedDB database.

## Features

- **Register New Patients**: Register patient information, including Name, Email, Phone Number, Age, and Gender.
- **Query Patient Records Using SQL**: Query the patient data using SQL commands (like `SELECT`).
- **Persist Patient Data Across Page Refreshes**: Patient data is stored in the browser using IndexedDB, so it is persistent even after page refresh.
- **Multi-Tab Support**: The system supports usage in multiple tabs simultaneously, syncing data in real-time across all open tabs.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Database**: PGlite (IndexedDB)
- **State Management**: React Hooks
- **Deployment**: The app can be deployed on any static site hosting platform such as GitHub Pages, Netlify, or Vercel.

## Setup and Usage

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/patient-registration.git
cd patient-registration
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Start Development Server
```bash
npm run dev
```

Once the server starts, your application will be available at http://localhost:3000 in the browser.

## Features and Functionality
### 1. Register New Patients
-- Users can register patients with the following details:

--- Name: The patient's full name.

--- Email: A unique email address for the patient (validated).

--- Phone: A 10-digit phone number starting with 9876 (validated).

--- Age: The patient's age.

--- Gender: Gender of the patient (Male, Female, Other).

#### Implementation:

The registration form uses React hooks to manage input values for Name, Email, Age, Phone, and Gender.

Validation is implemented for email and phone number before submitting the form data.

Patient details are stored using PGlite, which uses IndexedDB to persist the data.

### 2. Query Patient Records Using SQL
Users can query the patient records stored in the database using SQL commands such as SELECT.

#### Implementation:

A simple SQL query interface allows users to input custom SQL commands.

PGlite's query method is used to execute SQL commands on the database.

The query results are displayed in a table, showing patient records that match the query.

### 3. Persist Patient Data Across Page Refreshes
The patient data is persisted in IndexedDB, which ensures that the data remains intact even after the page is refreshed.

#### Implementation:

PGlite uses IndexedDB as a storage solution to save and load patient data.

Whenever the app is loaded, PGlite fetches the stored data from IndexedDB, making it available even after page refresh.

### 4. Multi-Tab Support
The application supports simultaneous usage in multiple tabs, ensuring real-time synchronization across all open tabs. If a new patient is added in one tab, the other open tabs are automatically updated.

#### Implementation:

PGlite's live-query feature and BroadcastChannel API are used to sync data across multiple tabs in real-time.

When a change is made in one tab, a message is broadcasted to all other open tabs, ensuring that all tabs reflect the latest changes.

## Challenges Faced

- **Real-Time Multi-Tab Sync**: Initially, syncing data across tabs was considered using `BroadcastChannel` or `PGlite's live query` feature. However, due to implementation constraints, a simpler polling approach using `useEffect` with a `setInterval` (every 2 seconds) was used to refresh data periodically in all tabs. While not instant, it provides reasonable consistency between multiple tabs.
  
- **Database Query Handling in the Browser**: Working with SQL queries in the browser using PGlite required careful input validation and error handling. Restricting destructive commands (like `DROP`, `ALTER`) was necessary to prevent data issues.

- **Data Persistence**: Ensuring patient data remains after page reloads involved configuring `PGlite` with `idb://` to store data persistently in IndexedDB. It took time to understand how to integrate it properly with a React app and service worker setup.

