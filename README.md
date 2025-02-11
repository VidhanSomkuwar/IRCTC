# Railway Management System API

A robust REST API for a railway booking system built with Node.js, Express, and MySQL. Features include user authentication, train management, and a booking system with concurrency handling.

## Features

- **User Management**
  - User registration and authentication
  - JWT-based authorization
  - Secure password hashing

- **Train Management**
  - Add and update trains (Admin only)
  - View available trains
  - Search trains by source and destination

- **Booking System**
  - Book train seats
  - View booking details
  - Cancel bookings
  - Automatic seat assignment
  - Concurrent booking handling

## Technology Stack

- Node.js
- Express.js
- MySQL (via Railway.app)
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/railway-management-system.git
   cd railway-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file based on .env.example and update with your credentials:
   ```plaintext
   DATABASE_URL=your_railway_mysql_url
   JWT_SECRET=your_jwt_secret
   ADMIN_API_KEY=your_admin_api_key
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Testing Guide

### 1. Register a User

http
POST http://localhost:3000/api/auth/register
Content-Type: application/json
{
"name": "Test User",
"email": "test@example.com",
"password": "password123"
}


### 2. Login

http
POST http://localhost:3000/api/auth/login
Content-Type: application/json
{
"email": "test@example.com",
"password": "password123"
}


### 3. Add a Train (Admin)

http
POST http://localhost:3000/api/admin/add-train
Headers:
x-api-key: your_admin_api_key
Content-Type: application/json
{
"trainNumber": "TR001",
"source": "Mumbai",
"destination": "Delhi",
"totalSeats": 100,
"departureTime": "2024-03-20T10:00:00.000Z"
}


### 4. Book a Seat

http
POST http://localhost:3000/api/bookings/book-seat
Headers:
Authorization: Bearer your_jwt_token
Content-Type: application/json
{
"trainId": "train_uuid"
}


### 5. View User's Bookings

http
GET http://localhost:3000/api/bookings/user/bookings
Headers:
Authorization: Bearer your_jwt_token


### 6. Cancel Booking

http
PUT http://localhost:3000/api/bookings/:bookingId/cancel
Headers:
Authorization: Bearer your_jwt_token


## Key Features

### Concurrency Handling
- Database transactions ensure booking integrity
- Row-level locking prevents double bookings
- Automatic seat number assignment

### Security
- JWT authentication for user routes
- API key protection for admin routes
- Password hashing
- Input validation

### Error Handling
- Comprehensive error messages
- Proper HTTP status codes
- Transaction rollbacks on failures

## Database Schema

### Users
- id (UUID)
- name
- email
- password (hashed)

### Trains
- id (UUID)
- trainNumber
- source
- destination
- totalSeats
- availableSeats
- departureTime

### Bookings
- id (UUID)
- userId (FK)
- trainId (FK)
- seatNumber
- bookingStatus
- bookingDate

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.