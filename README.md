# User Management CRUD Application

## Overview

This is a user management web application that allows you to create, read, update, and delete users. The application features a clean, responsive interface based on provided Figma designs and integrates with JSONPlaceholder API for backend operations and Google Places API for address suggestions.

## Features

- **User Listing**: View all users with their basic information
- **Create User**: Add new users to the system with detailed information
- **Edit User**: Modify existing user information
- **Delete User**: Remove users from the system
- **Form Validation**: Input validation for fields like email, phone number, and website
- **Google Places Integration**: Auto-suggestion for addresses with automatic field population
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technologies Used

- Frontend Framework: Vue.js
- API Integration:
  - JSONPlaceholder (https://jsonplaceholder.typicode.com/) for CRUD operations
  - Google Places API for address suggestions
- UI/UX: Implementation based on Figma designs

## Installation

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn package manager
- Google Places API key

### Setup

1. Clone the repository:

   ```
   git clone git@github.com:xhuliohasa/user-management-assignment.git
   cd user-management-app
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your brower and navigate to `http://localhost:5173` (or the port indicated in your terminal)

## Application Structure

```
src/
├── assets/
├── components/
│   ├── UserTable.vue
│   ├── UserModal.vue
│   └── ...
├── services/
│   ├── userService.js
│   └── googlePlacesService.js
├── utils/
│   └── validators.js
├── App.vue
└── main.js
```

## Usage

### Users List View

- The main screen displays all users in a table/grid format
- Each row shows basic user information (name, email, company)
- Actions available: Edit and Delete
- "Create New User" button at the top to add new users

### Create/Edit User Modal

- Form for entering user details:
  - Name
  - Username
  - Email
  - Phone
  - Website
  - Company
  - Address information
- Toggle between manual address entry and Google Places integration
- When using Google Places:
  - Address field provides suggestions as you type
  - Selecting an address auto-fills other address fields (city, zip code, etc.)
  - Latitude and longitude are displayed

## API Integration

### JSONPlaceholder

The application uses JSONPlaceholder's `/users` endpoint for CRUD operations:

- GET `/users` - Fetch all users
- GET `/users/{id}` - Fetch specific user
- POST `/users` - Create a new user
- PUT `/users/{id}` - Update an existing user
- DELETE `/users/{id}` - Remove a user

### Google Places API

The application integrates with Google Places API for address autocompletion:

- As the user types in the address field, suggestions appear
- When a suggestion is selected, the application fills in the remaining address fields automatically
- Latitude and longitude are retrieved and displayed when available

## Form Validation

The application implements validation for:

- Email (proper format)
- Phone number (proper format)
- Website URL (proper format)
- Required fields

## Future Improvements

- User authentication and authorization
- Filtering and sorting options for the users list
- Batch operations (delete multiple users)
- Enhanced address visualization with maps
- User activity logs

## License

Da License

## Contact

For questions or feedback, please contact hasaxhulio@gmail.com
