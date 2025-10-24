// Character count

const input = document.getElementById('textInput');
const counter = document.getElementById('charCount');

input.addEventListener('input', () => {
  counter.textContent = `${input.value.length} characters`;
});

// Even / odd checker

document.getElementById('checkBtn').addEventListener('click', e => {
    e.preventDefault();
    const num = BigInt(document.getElementById('numberInput').value);
    document.getElementById('result').textContent =
      num % 2n === 0n ? 'Even ✅' : 'Odd 🔹';
  });

// To-do list with persistence

const inputEl = document.getElementById('todoInput');
const listEl = document.getElementById('todoList');
const todos = [];

function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  function load() {
    const data = localStorage.getItem('todos');
    if (data) todos.push(...JSON.parse(data));
  }
  function render() {
    listEl.innerHTML = '';
    todos.forEach((todo, i) => {
      const li = document.createElement('li');
      li.textContent = todo;
      li.addEventListener('click', () => {
        todos.splice(i, 1);
        save();
        render();
      });
      listEl.appendChild(li);
    });
    save();
  }

document.getElementById('addBtn').addEventListener('click', () => {
  if (inputEl.value.trim() === '') return;
  todos.push(inputEl.value.trim());
  inputEl.value = '';
  render();
});
  
load();
render();
  
  