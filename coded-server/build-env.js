const fs = require('fs'); //  Node.js built-in module that loads FILE SYSTEM for reading/writing files
const { faker } = require('@faker-js/faker');

// definition of env object based on mockoon schema
const environment = {
  uuid: faker.string.uuid(),
  name: 'User Auth Coded Server',
  port: 3000,
  latency: 0,
  headers: [
    { key: "Content-Type", value: "application/json" },
    { key: "Access-Control-Allow-Origin", value: "*" },
    { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS" },
    { key: "Access-Control-Allow-Headers", value: "Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With" }
  ],
  routes: []
};

// Function: Create route response
function createResponse({ statusCode, body, rules = [], defaultResponse = false, latency = 0 }) {
  return {
    uuid: faker.string.uuid(),
    statusCode,
    body,
    rules,
    latency,
    default: defaultResponse,
    headers: [],
    label: '',
    filePath: '',
    sendFileAsBody: false
  };
}

// Function: Add a route
function addRoute(method, endpoint, responses, responseMode = 'SEQUENTIAL') {
  environment.routes.push({
    uuid: faker.string.uuid(),
    method,
    endpoint,
    responses,
    responseMode
  });
}

// Routes

// Signup
addRoute('post', '/auth/signup', [
  createResponse({
    statusCode: 201,
    body: `{"message": "User {{body 'email'}} registered successfully", "userId": "{{faker 'string.uuid'}}"}`
  })
]);

// Login
addRoute('post', '/auth/login', [
  createResponse({
    statusCode: 200,
    body: `{"message": "User login successful", "token": "Bearer {{faker 'string.alphanumeric' 32}}"}`,
    rules: [
      { target: 'body', modifier: 'email', value: 'user@gmail.com', operator: 'equals' },
      { target: 'body', modifier: 'password', value: 'p@ss', operator: 'equals' }
    ]
  }),
  createResponse({
    statusCode: 200,
    body: `{"message": "Welcome admin {{faker 'person.firstName'}}!", "token": "{{faker 'string.uuid'}}", "loginTime": "{{faker 'date.recent'}}"}`,
    rules: [
      { target: 'body', modifier: 'email', value: 'admin@gmail.com', operator: 'equals' },
      { target: 'body', modifier: 'password', value: 'p@ss', operator: 'equals' }
    ]
  }),
  createResponse({
    statusCode: 401,
    body: `{"error": "Invalid credentials"}`,
    defaultResponse: true
  })
]);

// Profile
addRoute('get', '/auth/profile', [
  createResponse({
    statusCode: 401,
    body: `{"error": "Unauthorized access"}`,
    rules: [
      { target: 'header', modifier: 'Authorization', value: '', operator: 'null' }
    ]
  }),
  createResponse({
    statusCode: 200,
    body: `{"id": "123", "name": "Sneha", "email": "sneha@example.com", "role": "user"}`,
    defaultResponse: true
  })
]);

// All users
addRoute('get', '/users', [
  createResponse({
    statusCode: 200,
    body: JSON.stringify(
    Array.from({ length: 10 }).map((_, i) => ({
      id: (i + 1).toString(),
      name: faker.person.fullName(),
      email: faker.internet.email()
    }))
  ),
    latency: 3000
  })
]);

// PUT /users/:id
addRoute('put', '/users/:id', [
  createResponse({
    statusCode: 200,
    body: `{"message": "User {{urlParam 'id'}} updated successfully", "updatedFields": { "name": "{{body 'name'}}", "email": "{{body 'email'}}" }}`,
    latency: 300
  }),
  createResponse({
    statusCode: 404,
    body: `{}`
  })
]);

// DELETE /users/:id
addRoute('delete', '/users/:id', [
  createResponse({
    statusCode: 200,
    body: `{"message": "User {{urlParam 'id'}} deleted successfully"}`,
    defaultResponse: true
  }),
  createResponse({
    statusCode: 404,
    body: `{"message": "User {{urlParam 'id'}} doesnt exist!"}`
  })
], 'RANDOM');

// Root route, To check if server is running
addRoute('get', '/', [
  createResponse({ statusCode: 200, body: `"Yup! Working!"`, defaultResponse: true })
]);

// Save as json file
fs.writeFileSync('mock-env-coded.json', JSON.stringify(environment, null, 2));
console.log('✅ mock-env-coded.json created from build-env.js');
