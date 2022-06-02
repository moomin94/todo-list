const todoForm = document.querySelector(".todo__input");
const todoInput = document.querySelector(".todo__input--text");
const todoList = document.querySelector(".todo__list");

let todos = [];

function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
  const li = e.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => parseInt(li.id) !== todo.id);
  saveTodo();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", (event) => {
    span.style.textDecoration = event.target.checked ? "line-through" : "";
    newTodo.done = !newTodo.done;
    saveTodo();
  });
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  if (newTodo.done) {
    span.style.textDecoration = "line-through";
    checkBox.checked = true;
  }
  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.addEventListener("click", deleteTodo);
  todoList.appendChild(li);
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(btn);
}

function submitTodo(e) {
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = { text: newTodo, id: new Date().getTime(), done: false };
  paintTodo(newTodoObj);
  todos.push(newTodoObj);
  saveTodo();
}

todoForm.addEventListener("submit", submitTodo);

const savedTodo = localStorage.getItem("todos");

if (savedTodo) {
  const parsedTodo = JSON.parse(savedTodo);
  todos = parsedTodo;
  todos.forEach((todo) => paintTodo(todo));
}
