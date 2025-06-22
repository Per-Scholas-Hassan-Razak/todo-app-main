// 1. Task array and load from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 2. DOM elements
const taskInput = document.getElementById('task-name');
const categoryInput = document.getElementById('task-category');
const deadlineInput = document.getElementById('task-deadline');
const statusInput = document.getElementById('task-status');
const addBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// 3. Task template
function createTask(name, category, deadline, status = 'In Progress') {
  return {
    id: Date.now(),
    name,
    category,
    deadline,
    status,
  };
}

// 4. Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 5. Display tasks
function displayTasks(filteredTasks = tasks) {
  taskList.innerHTML = '';

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      <div>
        <strong>${task.name}</strong> <br/>
        <small>${task.category} | Due: ${task.deadline}</small>
      </div>
      <select class="form-select form-select-sm w-auto" data-id="${task.id}">
        <option ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
        <option ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
        <option ${task.status === 'Overdue' ? 'selected' : ''}>Overdue</option>
      </select>
    `;

    taskList.appendChild(li);
  });
}

// 6. Add task handler
addBtn.addEventListener('click', () => {
  const name = taskInput.value.trim();
  const category = categoryInput.value.trim();
  const deadline = deadlineInput.value;

  if (!name || !category || !deadline) {
    alert('Please fill out all fields.');
    return;
  }

  const task = createTask(name, category, deadline);
  tasks.push(task);
  saveTasks();
  displayTasks();

  taskInput.value = '';
  categoryInput.value = '';
  deadlineInput.value = '';
});

displayTasks(); // Initial render