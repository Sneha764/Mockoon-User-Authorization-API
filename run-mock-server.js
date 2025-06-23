// run mock server through mockoon gui itself or run this
const { exec } = require("child_process");

exec("mockoon-cli start --data ./mock-environment.json --port 3001", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  console.log(stdout);
});

// run using: node run-mock-server.js
