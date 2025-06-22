# Task Management App

This is a JavaScript-based Task Management App that allows users to:

- Add new tasks with a name, category, deadline, and status
- Automatically mark overdue tasks based on the deadline
- Update task statuses dynamically
- Filter tasks by status (All, In Progress, Completed, Overdue)
- Store and load tasks using localStorage so data persists on refresh

## 🚀 Live Demo

[Click here to view the live app](https://per-scholas-hassan-razak.github.io/todo-app-main/)

## Features

- Dynamic task creation with deadline validation
- Auto-updating task status to “Overdue” based on current date
- Interactive filtering and status updates via dropdowns
- Clean, responsive UI with theme switching support
- Data persistence using browser's localStorage

## Technologies Used

- HTML5
- CSS3 (custom and Bootstrap 5)
- JavaScript (DOM manipulation, localStorage)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Per-Scholas-Hassan-Razak/todo-app-main.git
   ```


## 💬 Reflection

### Challenges Faced

One of the key challenges I encountered was ensuring that tasks with deadlines in the past were automatically marked as "Overdue" without affecting tasks that were already marked as "Completed." Handling date comparisons while preserving user-assigned statuses required careful conditional logic.

Another challenge was implementing dynamic task filtering by status. I needed to ensure that the filter buttons updated both the view and the active styling correctly, and that they responded to status changes immediately without requiring a page reload.

### How I Solved Them

To solve the overdue logic, I wrote a `checkOverdueTasks()` function that loops through the task list and updates the status only if the task is not already completed and the deadline is before today. I made sure this function runs every time tasks are added or modified.

For filtering, I used `data-filter` attributes on navigation links and added `click` event listeners. The logic filters the task array and re-renders the task list based on the selected status. I also used class toggling to visually show the active filter.

### Improvements I'd Make

If given more time, I would:
- Add filtering by category in addition to status
- Include edit and delete functionality for individual tasks
- Improve the UI by color-coding or tagging task statuses
- Implement unit tests or form validation enhancements for better UX