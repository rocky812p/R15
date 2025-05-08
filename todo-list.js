// To-Do List Logic
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const copyTodosBtn = document.getElementById('copy-todos');
const shareTodosBtn = document.getElementById('share-todos');
const clearTodosBtn = document.getElementById('clear-todos');
const filterAllBtn = document.getElementById('filter-all');
const filterActiveBtn = document.getElementById('filter-active');
const filterCompletedBtn = document.getElementById('filter-completed');
const todoCount = document.getElementById('todo-count');

function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}
function getFilter() {
  return localStorage.getItem('todo-filter') || 'all';
}
function setFilter(f) {
  localStorage.setItem('todo-filter', f);
}
function renderTodos() {
  const todos = getTodos();
  const filter = getFilter();
  let filtered = todos;
  if (filter === 'active') filtered = todos.filter(t => !t.completed);
  if (filter === 'completed') filtered = todos.filter(t => t.completed);
  todoList.innerHTML = '';
  filtered.forEach((todo, i) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.innerHTML = `<span class="todo-check" title="Mark as done">${todo.completed ? '✔️' : '⬜'}</span><span class="todo-text">${todo.text}</span><button class="todo-delete" title="Delete">🗑️</button>`;
    li.querySelector('.todo-check').onclick = () => {
      const idx = todos.indexOf(todo);
      todos[idx].completed = !todos[idx].completed;
      saveTodos(todos);
      renderTodos();
    };
    li.querySelector('.todo-delete').onclick = () => {
      const idx = todos.indexOf(todo);
      li.classList.add('fade-out');
      setTimeout(() => {
        todos.splice(idx, 1);
        saveTodos(todos);
        renderTodos();
      }, 300);
    };
    todoList.appendChild(li);
    setTimeout(() => li.classList.add('fade-in'), 10);
  });
  // Update counter
  todoCount.textContent = `${filtered.length} task${filtered.length !== 1 ? 's' : ''} (${filter.charAt(0).toUpperCase() + filter.slice(1)})`;
  // Update filter buttons
  [filterAllBtn, filterActiveBtn, filterCompletedBtn].forEach(btn => btn.classList.remove('active'));
  if (filter === 'all') filterAllBtn.classList.add('active');
  if (filter === 'active') filterActiveBtn.classList.add('active');
  if (filter === 'completed') filterCompletedBtn.classList.add('active');
}
addTodoBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (!text) return;
  const todos = getTodos();
  todos.push({ text, completed: false });
  saveTodos(todos);
  todoInput.value = '';
  renderTodos();
});
todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodoBtn.click();
});
clearTodosBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    saveTodos([]);
    renderTodos();
  }
});
copyTodosBtn.addEventListener('click', () => {
  const todos = getTodos();
  if (!todos.length) return;
  const text = todos.map(t => (t.completed ? '✔️ ' : '⬜ ') + t.text).join('\n');
  navigator.clipboard.writeText(text);
  copyTodosBtn.textContent = 'Copied!';
  setTimeout(() => (copyTodosBtn.textContent = 'Copy All'), 1200);
});
shareTodosBtn.addEventListener('click', async () => {
  const todos = getTodos();
  if (!todos.length) return;
  const text = todos.map(t => (t.completed ? '✔️ ' : '⬜ ') + t.text).join('\n');
  if (navigator.share) {
    try {
      await navigator.share({ title: 'My To-Do List', text });
      shareTodosBtn.textContent = 'Shared!';
      setTimeout(() => (shareTodosBtn.textContent = 'Share All'), 1200);
    } catch {}
  } else {
    copyTodosBtn.click();
    alert('Sharing is not supported on this device. Tasks copied!');
  }
});
filterAllBtn.addEventListener('click', () => { setFilter('all'); renderTodos(); });
filterActiveBtn.addEventListener('click', () => { setFilter('active'); renderTodos(); });
filterCompletedBtn.addEventListener('click', () => { setFilter('completed'); renderTodos(); });
// Initial render
renderTodos(); 