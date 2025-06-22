//Task array and load from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//DOM elements
const taskInput = document.getElementById("task-name");
const categoryInput = document.getElementById("task-category");
const deadlineInput = document.getElementById("task-deadline");
const statusInput = document.getElementById("task-status");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Task template
function createTask(name, category, deadline, status = "In Progress") {
  return {
    id: Date.now(),
    name,
    category,
    deadline,
    status,
  };
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  Automatically mark tasks as overdue
function checkOverdueTasks() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  tasks = tasks.map((task) => {
    if (task.status !== "Completed" && task.deadline < today) {
      return { ...task, status: "Overdue" };
    }
    return task;
  });
  saveTasks();
}

// Display tasks
function displayTasks(filteredTasks = tasks) {
  // checkOverdueTasks();
  taskList.innerHTML = "";

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <strong>${task.name}</strong> <br/>
        <small>${task.category} | Due: ${task.deadline}</small>
      </div>
      <select class="form-select form-select-sm w-auto" data-id="${task.id}">
        <option ${
          task.status === "In Progress" ? "selected" : ""
        }>In Progress</option>
        <option ${
          task.status === "Completed" ? "selected" : ""
        }>Completed</option>
        <option ${task.status === "Overdue" ? "selected" : ""}>Overdue</option>
      </select>
    `;

    taskList.appendChild(li);
  });
}

//  Add task handler
addBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  const category = categoryInput.value.trim();
  const deadline = deadlineInput.value;

  if (!name || !category || !deadline) {
    alert("Please fill out all fields.");
    return;
  }

  const task = createTask(name, category, deadline, statusInput.value);
  tasks.push(task);
  checkOverdueTasks();
  saveTasks();
  displayTasks();

  taskInput.value = "";
  categoryInput.value = "";
  deadlineInput.value = "";
});

// Update task status when dropdown changes
taskList.addEventListener("change", (e) => {
  if (e.target.tagName === "SELECT") {
    const taskId = parseInt(e.target.getAttribute("data-id"), 10);
    const newStatus = e.target.value;

    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    saveTasks();
    checkOverdueTasks();
    displayTasks();
  }
});

// Filter tasks by status
const filterLinks = document.querySelectorAll("[data-filter]");

filterLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all, add to clicked
    filterLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const filter = link.getAttribute("data-filter");
    let filtered = [];

    if (filter === "all") {
      filtered = tasks;
    } else {
      const formatted = filter.replace("-", " "); // e.g., 'in-progress' -> 'in progress'
      filtered = tasks.filter(task => task.status.toLowerCase() === formatted);
    }

    displayTasks(filtered);
  });
});

displayTasks(); // Initial render
