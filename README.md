# API Documentation
This is my first API project, built using Node.js, Express.js, UUID, Nodemon and Postman for testing.

## Installation
1. Clone the repository:
   `git clone <repository-url>`
2. Install the dependencies:
   `npm install express uuid nodemon`
3. Start the server:
   `nodemon api.js`

## Usage
The API provides CRUD (Create, Read, Update, Delete) operations for managing users.

### 1) Retrieve all users
* URL: `/api/users`
* Method: `GET`
* Response: Returns an array of all users.

### 2) Retrieve a specific user by ID
* URL: `/api/users/:id`
* Method: `GET`
* Parameters:
  * `id` (string): The ID of the user.
* Response:
  * If the user is found, returns the user object.
  * If the user is not found, returns a 404 error with the message "User not found".

### 3) Create a new user 
Note: you can either use raw JSON data in the request body or setup your key/value pairs in urlencoded format.
* URL: `/api/users`
* Method: `POST`
* Request Body:
  * `username` (string): The username of the user.
  * `firstName` (string): The first name of the user.
  * `lastName` (string): The last name of the user.
  * `age` (number): The age of the user.
  * `isAdmin` (boolean): Indicates if the user is an admin.
* Response:
  * If all fields are provided, creates a new user and returns the user object with a generated ID.
  * If any field is missing, returns a 400 error with the message "All fields are required".

### 4) Update an existing user
* URL: `/api/users/:id`
* Method: `PUT`
* Parameters:
  * `id` (string): The ID of the user to update.
* Request Body:
  * `username` (string): The updated username of the user.
  * `firstName` (string): The updated first name of the user.
  * `lastName` (string): The updated last name of the user.
  * `age` (number): The updated age of the user.
  * `isAdmin` (boolean): The updated admin status of the user.
* Response:
  * If the user is found and all fields are provided, updates the user and returns the updated user object.
  * If the user is not found, returns a 404 error with the message "User not found".
  * If any field is missing, returns a 400 error with the message "All fields are required".

### 5) Delete an existing user
* URL: `/api/users/:id`
* Method: `DELETE`
* Parameters:
  * `id` (string): The ID of the user to delete.
* Response:
  * If the user is found, deletes the user and returns the deleted user object.
  * If the user is not found, returns a 404 error with the message "User not found".

## Testing
To test the API endpoints, you can use a tool like Postman. Make sure the server is running, and then send requests to the appropriate endpoints with the required parameters and request body.

## Conclusion
This API project demonstrates basic CRUD operations for managing users. Feel free to explore and modify the code to suit your needs. If you have any questions or feedback, please let me know.
