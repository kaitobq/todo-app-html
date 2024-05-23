document.getElementById("addTodoButton").addEventListener("click", addTodo);

document
  .getElementById("todoInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  });

function loadTodos() {
  const todoList = document.getElementById("todoList");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(function (todo) {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  });
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todoItem = createTodoItem(todoText);

    todoList.appendChild(todoItem);

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = "";
  }
}

function createTodoItem(todoText) {
  const todoItem = document.createElement("div");
  todoItem.setAttribute("id", "todoItem");

  const todoName = document.createElement("p");
  todoName.textContent = todoText;

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", function () {
    deleteTodo(todoText, todoItem);
  });

  todoItem.appendChild(todoName);
  todoItem.appendChild(deleteButton);

  return todoItem;
}

function deleteTodo(todoText, todoItem) {
  document.getElementById("todoList").removeChild(todoItem);

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter(function (todo) {
    return todo !== todoText;
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

document.addEventListener("DOMContentLoaded", loadTodos);
