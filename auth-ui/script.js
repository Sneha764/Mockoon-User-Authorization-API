const baseUrl = "http://localhost:3001";
let authToken = "";  // Save token after login

async function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("signupResult").innerText = JSON.stringify(data);
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  authToken = data.token || "";
  document.getElementById("loginResult").innerText = JSON.stringify(data);
}

async function getProfile() {
  const res = await fetch(`${baseUrl}/auth/profile`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });

  const data = await res.json();
  document.getElementById("profileResult").innerText = JSON.stringify(data);
}

async function getAllUsers() {
  const res = await fetch(`${baseUrl}/users`);
  const data = await res.json();
  document.getElementById("userList").innerText = JSON.stringify(data, null, 2);
}
