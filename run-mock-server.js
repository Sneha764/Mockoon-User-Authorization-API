// run mock server through mockoon gui itself or run this
console.log("Mockoon server is running at http://localhost:3001");
const { exec } = require("child_process");

exec('mockoon-cli start --data "./User Auth Service.json" --port 3001', (error, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  console.log(stdout);
});

// run using: node run-mock-server.js
