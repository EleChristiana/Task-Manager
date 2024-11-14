document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  async function loadTasks() {
    const response = await fetch("/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const tasks = await response.json();
    renderTasks(tasks);
  }

  function renderTasks(tasks) {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";
    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = `task-item ${task.priority}`;
      taskDiv.innerHTML = `
        <div>
          <h4>${task.title}</h4>
          <p>${task.description}</p>
          <small>Due: ${task.deadline}</small>
        </div>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      `;
      tasksContainer.appendChild(taskDiv);
    });
  }

  async function addTask(event) {
    event.preventDefault();
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const deadline = document.getElementById("task-deadline").value;
    const priority = document.getElementById("task-priority").value;

    await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, deadline, priority })
    });

    loadTasks();
  }

  document.getElementById("task-form").addEventListener("submit", addTask);
  loadTasks();
});
