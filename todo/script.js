const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const initialStatus = document.getElementById("task-status");
const submitButton = document.getElementById("task-submit-button");
const formMessage = document.getElementById("form-message");
const todoList = document.getElementById("todo-list");
const todoEmpty = document.getElementById("todo-empty");
const todos = [];

submitButton.addEventListener("click", function (event) {
	//trim cuts the white spaces
	event.preventDefault();
	const title = titleInput.value.trim();
	const description = descriptionInput.value.trim();
	const status = initialStatus.value;
	if (title === "") {
		formMessage.textContent = "Enter a name for your task";
		titleInput.focus();
		return;
	}

	const now = new Date().toISOString();

	const newTask = {
		id: `${crypto.randomUUID()}`,
		title: title,
		description: description,
		createdAt: now,
		status: status,
		completedAt: null
	};
	console.log(newTask);
	todos.push(newTask);
	saveTodos();
});

function saveTodos() {
	localStorage.setItem("savedToDosInTheLocalStorage", JSON.stringify(todos));
}
function loadTodos() {
	const saved = localStorage.getItem("savedToDosInTheLocalStorage");
	if (saved === null) {
		return [];
	}
	const parsedToDos = JSON.parse(saved);
	return parsedToDos;
}

function renderCard() {
	loadTodos()
	//render the card
	const card = document.createElement("article");
	card.classList.toggle("task-card");
	todoList.appendChild(card);
	//render the title on the card
	const title = parsedToDos[].title;
	//render description
	todoEmpty.classList.toggle("hidden");

	if (TaskController.status === "done") {
		card.classList.toggle("is-done");
	}
}
