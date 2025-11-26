// ===== Task Scheduler Logic =====

let tasks = [];
let currentFilter = 'all';

// Initialize
function initTasks() {
    loadTasks();
    renderTasks();
    updateStats();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDueDate').min = today;
}

// Load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('gradeRocketTasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('gradeRocketTasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
    const container = document.getElementById('tasksList');
    
    let filteredTasks = tasks;
    if (currentFilter !== 'all') {
        filteredTasks = tasks.filter(task => task.status === currentFilter);
    }
    
    // Sort by due date
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-tasks">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                    <path d="m9 16 2 2 4-4"/>
                </svg>
                <h3>No tasks found</h3>
                <p>Create a new task to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredTasks.map(task => createTaskCard(task)).join('');
}

// Create task card HTML
function createTaskCard(task) {
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
    const dueDate = new Date(task.dueDate);
    const formattedDate = dueDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
    
    return `
        <div class="task-card ${task.status === 'completed' ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-checkbox ${task.status === 'completed' ? 'checked' : ''}" onclick="toggleTaskComplete('${task.id}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <div class="task-content">
                <div class="task-header">
                    <span class="task-title">${task.title}</span>
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                </div>
                ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                <div class="task-meta">
                    ${task.subject ? `
                        <span class="task-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            ${task.subject}
                        </span>
                    ` : ''}
                    <span class="task-meta-item ${isOverdue ? 'overdue' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        ${formattedDate}${task.dueTime ? ` at ${task.dueTime}` : ''}
                    </span>
                    <span class="task-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        ${task.status.replace('-', ' ')}
                    </span>
                </div>
            </div>
            <div class="task-actions">
                <button class="task-action-btn" onclick="editTask('${task.id}')" aria-label="Edit task">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="task-action-btn delete" onclick="deleteTask('${task.id}')" aria-label="Delete task">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// Update stats
function updateStats() {
    const pending = tasks.filter(t => t.status === 'pending').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;
    
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('progressCount').textContent = inProgress;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('overdueCount').textContent = overdue;
}

// Filter tasks
function filterTasks(filter, button) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    button.classList.add('active');
    
    renderTasks();
}

// Open task modal
function openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const form = document.getElementById('taskForm');
    const title = document.getElementById('modalTitle');
    
    form.reset();
    document.getElementById('taskId').value = '';
    
    if (taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            title.textContent = 'Edit Task';
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description || '';
            document.getElementById('taskSubject').value = task.subject || '';
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskDueTime').value = task.dueTime || '';
            document.getElementById('taskStatus').value = task.status;
        }
    } else {
        title.textContent = 'Add New Task';
        // Set default date to today
        document.getElementById('taskDueDate').value = new Date().toISOString().split('T')[0];
    }
    
    modal.classList.add('active');
}

// Close task modal
function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
}

// Save task
function saveTask(e) {
    e.preventDefault();
    
    const taskId = document.getElementById('taskId').value;
    const taskData = {
        id: taskId || Date.now().toString(),
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        subject: document.getElementById('taskSubject').value,
        priority: document.getElementById('taskPriority').value,
        dueDate: document.getElementById('taskDueDate').value,
        dueTime: document.getElementById('taskDueTime').value,
        status: document.getElementById('taskStatus').value,
        createdAt: taskId ? tasks.find(t => t.id === taskId)?.createdAt : new Date().toISOString()
    };
    
    if (taskId) {
        const index = tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            tasks[index] = taskData;
        }
    } else {
        tasks.push(taskData);
    }
    
    saveTasks();
    renderTasks();
    updateStats();
    closeTaskModal();
}

// Toggle task complete
function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Edit task
function editTask(taskId) {
    openTaskModal(taskId);
}

// Delete task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Close modal on outside click
document.getElementById('taskModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeTaskModal();
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initTasks);
