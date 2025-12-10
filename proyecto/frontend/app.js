// frontend/app.js
const tasksEl = document.getElementById('tasks');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const addBtn = document.getElementById('addBtn');

const API = (typeof API_BASE !== 'undefined') ? API_BASE : 'http://localhost:4000';

async function fetchTasks(){
  const res = await fetch(`${API}/tasks`);
  const data = await res.json();
  renderTasks(data);
}

function createTaskNode(task){
  const container = document.createElement('div');
  container.className = `task ${task.completed ? 'completed' : 'not-completed'}`;

  const left = document.createElement('div');
  left.className = 'task-left';
  const title = document.createElement('div');
  title.className = 'task-title';
  title.textContent = task.title;
  const desc = document.createElement('div');
  desc.className = 'task-desc';
  desc.textContent = task.description || '';
  left.appendChild(title);
  left.appendChild(desc);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'icon-btn check';
  toggleBtn.innerHTML = task.completed ? '✅' : '✔️';
  toggleBtn.title = 'Marcar/Desmarcar';
  toggleBtn.onclick = async () => {
    const endpoint = API.includes('functions') 
      ? `${API}/tasks-detail?id=${task.id}`
      : `${API}/tasks/${task.id}/toggle`;
    await fetch(endpoint, { method: 'PATCH' });
    fetchTasks();
  };

  const delBtn = document.createElement('button');
  delBtn.className = 'icon-btn delete';
  delBtn.innerHTML = '❌';
  delBtn.title = 'Eliminar';
  delBtn.onclick = async () => {
    if (!confirm('¿Eliminar tarea?')) return;
    const endpoint = API.includes('functions')
      ? `${API}/tasks-detail?id=${task.id}`
      : `${API}/tasks/${task.id}`;
    await fetch(endpoint, { method: 'DELETE' });
    fetchTasks();
  };

  actions.appendChild(toggleBtn);
  actions.appendChild(delBtn);

  container.appendChild(left);
  container.appendChild(actions);

  return container;
}

function renderTasks(tasks){
  tasksEl.innerHTML = '';
  if (tasks.length === 0){
    const p = document.createElement('p');
    p.className = 'centered';
    p.textContent = 'No hay tareas aún';
    tasksEl.appendChild(p);
    return;
  }
  tasks.forEach(t => tasksEl.appendChild(createTaskNode(t)));
}

addBtn.addEventListener('click', async () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  if (!title) return alert('Agrega un título');
  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  titleInput.value = '';
  descInput.value = '';
  fetchTasks();
});

// init
fetchTasks();
