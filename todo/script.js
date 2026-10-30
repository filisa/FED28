const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const initialStatus = document.getElementById("task-status");
const submitButton = document.getElementById("task-submit-button");
const formMessage = document.getElementById("form-message");
const todoList = document.getElementById("todo-list");
const todoEmpty = document.getElementById("todo-empty");
const todos = [];
renderCard();
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
	renderCard();
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
	const parsedToDos = loadTodos();
	//render the card
	if (parsedToDos.length === 0) {
		return;
	} else {
		for (i = 0; i < parsedToDos.length; i++) {
			const card = document.createElement("article");
			card.classList.toggle("task-card");
			todoList.appendChild(card);
			//render the title on the card from localStorage
			const title = parsedToDos[i].title;
			const cardTitle = document.createElement("span");
			cardTitle.textContent = title;
			card.appendChild(cardTitle);
			//render description from localStorage
			const description = parsedToDos[i].description;
			const cardDescription = document.createElement("span");
			cardDescription.textContent = description;
			card.appendChild(cardDescription);
			//render description
			todoEmpty.classList.toggle("hidden");

			if (TaskController.status === "done") {
				card.classList.toggle("is-done");
			}
		}
	}
}
