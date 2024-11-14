document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (result.token) {
      localStorage.setItem("token", result.token);
      window.location.href = "task_manager.html";
    } else {
      alert(result.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});
