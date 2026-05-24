# PawAdopt - Pet Adoption Platform (Server)

Backend API for the PawAdopt pet adoption platform built with Express.js, MongoDB, and JWT authentication.

## Features

- User registration with password validation
- JWT authentication with HTTPOnly cookies
- Full CRUD operations for pet listings
- Adoption request management with approve/reject
- Search pets by name using MongoDB $regex
- Filter pets by species using MongoDB $in
- Owner-only access control for pet and request management

## NPM Packages Used

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **cookie-parser** - Cookie handling
- **dotenv** - Environment variables

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` with `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`
4. Run development server: `npm run dev`
5. API runs on [http://localhost:5000](http://localhost:5000)

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Google login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Pets
- `GET /api/pets` - Get all pets (with search & filter)
- `POST /api/pets` - Create pet (auth required)
- `GET /api/pets/:id` - Get pet by ID
- `PUT /api/pets/:id` - Update pet (owner only)
- `DELETE /api/pets/:id` - Delete pet (owner only)
- `GET /api/pets/my-listings` - Get current user's listings

### Requests
- `POST /api/requests` - Create adoption request
- `GET /api/requests/my` - Get user's requests
- `GET /api/requests/pet/:petId` - Get requests for a pet
- `PUT /api/requests/:id/approve` - Approve request (owner only)
- `PUT /api/requests/:id/reject` - Reject request (owner only)
- `PUT /api/requests/:id/cancel` - Cancel request (requester only)
