# Patient Registration System

This project is a **React**-based application that allows users to register patients, query patient records using SQL, persist patient data across page refreshes, and supports multi-tab usage. The system utilizes **PGlite** (a lightweight SQLite client for the browser) to store patient data in an IndexedDB database.

## Features

- **Register New Patients**: Register patient information, including Name, Email, Phone Number, Age, and Gender.
- **Query Patient Records Using SQL**: Query the patient data using SQL commands (like `SELECT, DELETE,...`) except (`DROP, ALTER`).
- **Persist Patient Data Across Page Refreshes**: Patient data is stored in the browser using IndexedDB, so it is persistent even after page refresh.
- **Multi-Tab Support**: The system supports usage in multiple tabs simultaneously, syncing data in real-time across all open tabs.

## Setup and Usage
 -> Environment Requirements:
   - Node.js version: ≥ 20.18.1
   - npm version: ≥ 10.8.2

Follow these steps and run the below commands to set up the project locally using command promt(cmd) inside any folder you want the project to be downloaded in :

### 1. Clone the repository
```bash
git clone https://github.com/0pain01/medblock_patient_registration.git
cd medblock_patient_registration
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Once the server starts, your application will be available at http://localhost:5173 in the browser.

## Features and Functionality
### 1. Register New Patients
--> Users can register patients with the following details:

  - Name: The patient's full name.

  - Email: A unique email address for the patient (validated).

  - Phone: A 10-digit phone number starting with 9876 (validated).

  - Age: The patient's age.

  - Gender: Gender of the patient (Male, Female, Other).

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
The synchronization is achieved using React’s useEffect hook combined with setInterval, which refreshes the live table component every 2 seconds by fetching the latest data from the database.
This polling approach ensures that each open tab periodically retrieves and displays the most recent updates, maintaining consistent data visibility across tabs.

## Challenges Faced

- **Real-Time Multi-Tab Sync**: Initially, syncing data across tabs was considered using `BroadcastChannel` or `PGlite's live query` feature. However, due to implementation constraints, a simpler polling approach using `useEffect` with a `setInterval` (every 2 seconds) was used to refresh data periodically in all tabs. While not instant, it provides reasonable consistency between multiple tabs.
  
- **Database Query Handling in the Browser**: Working with SQL queries in the browser using PGlite required careful input validation and error handling. *Restricting destructive commands (like `DROP`, `ALTER`) was necessary to prevent data issues*.

- **Data Persistence**: Ensuring patient data remains after page reloads involved configuring `PGlite` with `idb://` to store data persistently in IndexedDB. It took time to understand how to integrate it properly with a React app and service worker setup.

![image](https://github.com/user-attachments/assets/204bcf26-ef34-4ae5-96c0-f8032a8f61ba)


