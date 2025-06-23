# Mockoon User Auth API

This project implements a simulation of a user authentication API, and focuses on the development and testing of it. It also has frontend integration and API workflows without depending on an actual backend.

---

## Endpoints Covered

- `GET /` - Just a hello message
- `POST /auth/signup` – Register a user (returns userId and confirmation message)
- `POST /auth/login` – Login (returns a token and welcome message)
- `GET /auth/profile` – Returns user profile if Authorization header is present
- `GET /users` – Returns list of users
- `PUT /users/:id` – Update a user 
- `DELETE /users/:id` – Delete a user

---

## Steps to Run the Mock API

### 1. Install Mockoon CLI 

```bash
npm install -g @mockoon/cli 
```

### 2. Start the mock server 

There are 3 ways to run the mock server
- Start using the mockoon desktop app itself
- run a custom node js script:

filename: run-mock-server.js
```bash
const { exec } = require("child_process");

exec("mockoon-cli start --data ./mock-environment.json --port 3001", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  console.log(stdout);
});
```
Save file and run:
```bash
node run-mock-server.js 
```

- use the mockoon CLI:

```bash
mockoon-cli start --data ./mock-environment.json --port 3001
```

---

## Testing the API using Postman

1. Open Postman
2. Import `postman-auth-tests.json`
3. Run the collection (currently has 17 tests)

### Tests Cover the following routes:
- `POST /auth/signup`: Returns `201 Created`, a confirmation message, and generated `userId`
- `POST /auth/login`: 
  - If credentials are invalid it returns 401 Unauthorized. 
  - If valid credentials entered then returns `200 OK` and token, welcome message
- `GET /auth/profile`: 
  - With valid Authorization (i.e header exists): returns profile details
  - Without token (if header doesnt exist): returns `401 Unauthorized`
- `GET /users`: Returns a list of user objects
- `PUT /users/:id`: Updates user information for the given id. Returns a success message with updated details
- `DELETE /users/:id`: Deletes the user with the given id. Returns a confirmation message and deleted userId
- `GET /`: Returns a text saying server is running.
 
---

## Frontend UI

I also implemented a simple web UI to interact with the mocked API:

### How to Use:

1. Open `index.html` with live server.
2. Try signing up, logging in, fetching profile, and listing users

> Note: The mock API does not store the data between requests. All responses are simulated.

---

## 📁 Project Structure


mockoon-user-auth-api/
├── User Auth Service.json                          # MOCKOON API configuration
├── run-mock-server.js                              # Node script to launch CLI mock server
├── Mockoon Testing.postman_test_run_results.json   # Results obtained after running collection in POSTMAN
├── postman-auth-tests-collection.json              # POSTMAN collection for API testing
├── auth-ui/
    ├── index.html                 
    ├── style.css                   
    ├── script.js                     
└── README.md                                       # Project documentation

