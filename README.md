This project is a backend system for a virtual event management platform. It supports user authentication, event scheduling, and participant management. The system uses in-memory data structures for storage and provides a set of RESTful API endpoints for various operations.

Features

1. User Authentication

Users can register and log in.

Passwords are securely hashed using bcrypt.

Token-based authentication is implemented using jsonwebtoken.

Differentiates between event organizers and attendees.

2. Event Management

Organizers can create, update, and delete events.

Events are stored in memory and include fields for date, time, description, and participants.

3. Participant Management

Users can register for events.

Participant lists are managed in-memory.

Users receive email notifications upon successful registration.

4. RESTful API Endpoints

Endpoint

Method

Description

/auth/register

POST

Register a new user

/auth/login

POST

Log in a user

/events

POST

Create a new event (Organizer)

/events/:id

PUT

Update an event (Organizer)

/events/:id

DELETE

Delete an event (Organizer)

/events/:id/register

POST

Register for an event (Attendee)

Technologies Used

Node.js: Backend runtime environment.

Express.js: Web framework for handling API endpoints.

bcrypt: Password hashing.

jsonwebtoken: Token-based authentication.

nodemailer: Email notifications.

Body-parser: Parsing JSON request bodies.

Prerequisites

Node.js (v14+)

NPM (v6+)

Setup Instructions

Clone the repository:

git clone https://github.com/your-repo/virtual-event-management.git
cd virtual-event-management

Install dependencies:

npm install

Create a .env file for environment variables:

SECRET_KEY=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

Start the server:

npm start

The server will run on http://localhost:3000.

File Structure

/project
├── server.js                # Main entry point
├── routes/                  # API route definitions
│   ├── auth.js              # Authentication routes
│   ├── events.js            # Event management routes
├── controllers/             # Controller logic
│   ├── authController.js    # Authentication logic
│   ├── eventController.js   # Event management logic
├── middlewares/             # Middleware functions
│   ├── authMiddleware.js    # Authentication middleware
├── utils/                   # Utility functions
│   ├── emailService.js      # Email service using nodemailer
└── models/                  # In-memory data storage
    ├── users.js             # User data
    ├── events.js            # Event data

API Usage

Authentication

Register a User

POST /auth/register

{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "organizer" // or "attendee"
}

Response:

{
  "message": "User registered successfully"
}

Log in a User

POST /auth/login

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "Login successful",
  "token": "your_jwt_token"
}

Event Management

Create an Event

POST /events
Headers:

Authorization: Bearer <your_jwt_token>

Request:

{
  "date": "2025-01-28",
  "time": "15:00",
  "description": "Tech Conference 2025"
}

Response:

{
  "message": "Event created successfully",
  "event": { ... }
}

Update an Event

PUT /events/:id
Headers:

Authorization: Bearer <your_jwt_token>

Request:

{
  "date": "2025-02-01",
  "time": "10:00",
  "description": "Updated Tech Conference"
}

Response:

{
  "message": "Event updated successfully",
  "event": { ... }
}

Delete an Event

DELETE /events/:id
Headers:

Authorization: Bearer <your_jwt_token>

Response:

{
  "message": "Event deleted successfully"
}

Participant Management

Register for an Event

POST /events/:id/register
Headers:

Authorization: Bearer <your_jwt_token>

Response:

{
  "message": "Successfully registered for the event",
  "event": { ... }
}

Future Enhancements

Replace in-memory storage with a database (e.g., MongoDB or PostgreSQL).

Add pagination and filtering for events.

Enhance email templates with HTML content.

Implement role-based access control for more granular permissions.

Add unit tests for all controllers and middleware.