require('dotenv').config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const PORT = 3000;
// Create an empty array to store the users
let users = [];
//Please refer to the .env.example file for the desired API key
const apiKey = process.env.YOUR_API_KEY;

const app = express();

//Note: For testing, both methods are allowed, but please choose the appropriate parsing method for your application
//Parses JSON data in the request body and makes it available in req.body for subsequent route handlers.
app.use(express.json());
//Parses URL-encoded data in the request body and makes it available in req.body for subsequent route handlers. The extended: true option allows for parsing nested objects.
app.use(express.urlencoded({ extended: true }));

// Function that checks if the API key provided as a query parameter is correct
const apiKeyCheck = (req, res, next) => {
	const apiKeyParam = req.query.api_key;
	console.log(apiKey, apiKeyParam);

	if (apiKeyParam !== apiKey) {
		return res.status(403).json({ error: "Invalid API key" });
	}

	next();
};

// GET /api/users - Retrieve all users
app.get("/api/users", (req, res) => {
	res.json(users);
});

// GET /api/users/:id - Retrieve a specific user by ID
app.get("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id === id);

	if (!user) {
		res.status(404).json({ error: "User not found" });
	} else {
		res.json(user);
	}
});

// POST /api/users - Create a new user
app.post("/api/users", apiKeyCheck, (req, res) => {
	const { username, firstName, lastName, age, isAdmin } = req.body;
	if (!username || !firstName || !lastName || !age || isAdmin === undefined) {
		res.status(400).json({ error: "All fields are required" });
	} else {
		const newUser = { id: uuidv4(), username, firstName, lastName, age, isAdmin };
		users.push(newUser);
		res.status(201).json(newUser);
	}
});

// PUT /api/users/:id - Update an existing user
app.put("/api/users/:id", apiKeyCheck, (req, res) => {
	const userId = req.params.id;
	const { username, firstName, lastName, age, isAdmin } = req.body;
	const updatedUserData = { username, firstName, lastName, age, isAdmin };
	let found = false;

	users = users.map((user) => {
		if (user.id === userId) {
			found = true;
			// Update only the provided fields in the user data
			for (let key in updatedUserData) {
				if (updatedUserData[key] !== undefined) {
					user[key] = updatedUserData[key];
				}
			}
			return user;
		}
		return user;
	});

	if (!found) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json({ message: "User updated successfully" });
});

// DELETE /api/users/:id - Delete an existing user
app.delete("/api/users/:id", apiKeyCheck, (req, res) => {
	const userId = req.params.id;
	const initialLength = users.length;
	
	users = users.filter((user) => user.id !== userId);

	if (users.length === initialLength) {
		return res.status(404).json({ error: "User not found" });
	}
	res.json({ message: "User deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
