

function registerUser(username, password) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');

  if (users.some(u => u.username === username)) {
    return alert("Username already exists.");
  }

  const newUser = {
    id: Date.now(),
    username,
    password,
    role: "customer" // default role
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  alert("Registration successful!");
  window.location.href = "index.html";
}

function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return alert("Invalid username or password.");

  localStorage.setItem('currentUser', JSON.stringify(user));
  alert(`Welcome, ${user.username}!`);

  switch (user.role) {
    case 'admin':
      window.location.href = 'admin-dashboard.html';
      break;
    case 'driver':
      window.location.href = 'driver-dashboard.html';
      break;
    case 'customer':
    default:
      window.location.href = 'index.html';
      break;
  }
}

function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.href = "login.html";
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

