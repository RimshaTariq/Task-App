# Task App

This is a simple task application for CRUD operations for tasks developed using Express.js for REST APIs,
 JavaScript for frontend logic, HTML/CSS for frontend layout, and MySQL for the database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- npm (Node Package Manager) or yarn installed on your machine.
- MySQL database server installed and running.

## Installation

To install and set up the application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/RimshaTariq/task-app.git

cd task-app

Install dependencies using npm

npm install express body-parser mysql2 cors

2. Set up the MySQL database

Create a new MySQL database for the application.
Execute the SQL script database.sql provided in the project directory to create the necessary tables.

Configure the database connection:

Open the connection.js file in the project directory.
Update the database configuration with your MySQL database credentials.

3. Open the terminal and run node index.js
The server will start running at http://localhost:3000.
now open the index.html in open server to access the application

Features
Create Task: Add new tasks with a title(not null) and description.
List Tasks: View a list of all tasks by default.
Edit Task: Update existing tasks.
Delete Task: Remove tasks from the list.

API Endpoints
The following API endpoints are available in the application:

GET /tasks: Retrieve all tasks.
POST /tasks: Create a new task.
PUT /tasks/:id: Update an existing task.
DELETE /tasks/:id: Delete a task by ID.


