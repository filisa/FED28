const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const initialStatus = document.getElementById("task-status");
const submitButton = document.getElementById("task-submit-button");
const formMessage = document.getElementById("form-message");
const todoList = document.getElementById("todo-list");
const todoEmpty = document.getElementById("todo-empty");
const ongoingEmpty = document.getElementById("ongoing-empty");
const doneEmpty = document.getElementById("done-empty");
const ongoingList = document.getElementById("ongoing-list");
const doneList = document.getElementById("done-list");
const board = document.getElementById("board");

//at the start we look if we have any data in localStorage
//and add it to the array
const todos = loadTodos();
//then we render this data if there is any
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
	todos.push(newTask);
	saveTodos();
	renderCard();
	clearInput();
});

function clearInput() {
	titleInput.value = "";
	descriptionInput.value = "";
}

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
	//if we don't do this the cards are rendered each
	// time I add a new card on top of what we had already
	todoList.replaceChildren();
	ongoingList.replaceChildren();
	doneList.replaceChildren();

	//make sure the empty states are shown if there is nothing in one section
	todoEmpty.classList.toggle("hidden", false);
	ongoingEmpty.classList.toggle("hidden", false);
	doneEmpty.classList.toggle("hidden", false);

	if (todos.length === 0) {
		return;
	} else {
		for (i = 0; i < todos.length; i++) {
			const card = document.createElement("article");
			card.classList.toggle("task-card");
			card.id = todos[i].id;
			let eventType = todos[i].status;
			switch (eventType) {
				case "todo":
					//render the card inside todo
					todoList.appendChild(card);
					todoEmpty.classList.toggle("hidden", true);
					break;
				case "ongoing":
					//render inside ongoing column
					ongoingList.appendChild(card);
					ongoingEmpty.classList.toggle("hidden", true);
					break;
				case "done":
					//render in done
					doneList.appendChild(card);
					doneEmpty.classList.toggle("hidden", true);
					break;
				default:
					console.log(`Unsupported type of status: ${eventType}`);
			}

			//render the title on the card
			const title = todos[i].title;
			const cardTitle = document.createElement("h3");
			cardTitle.textContent = title;
			card.appendChild(cardTitle);

			//render description
			const description = todos[i].description;
			const cardDescription = document.createElement("span");
			cardDescription.textContent = description;
			card.appendChild(cardDescription);
			//render selector of status
			const cardStatusSelectorDiv = document.createElement("div");
			cardStatusSelectorDiv.classList.add("selector_div");
			card.appendChild(cardStatusSelectorDiv);
			const statusSelector = `
			<div class="field field-status">
				<label for="task-status">Change status:	</label>
				<select class="task-status">
					<option value="todo">To do</option>
					<option value="ongoing">Ongoing</option>
					<option value="done">Done</option>
				</select>
			</div>
			`;
			cardStatusSelectorDiv.innerHTML = statusSelector;
			const cardStatusSelect =
				cardStatusSelectorDiv.querySelector(".task-status");
			console.log(cardStatusSelect);
			cardStatusSelect.value = todos[i].status;
			console.log(cardStatusSelect.value);
		}
	}
}
//listen for status changes inside the kanban board
board.addEventListener("change", function (event) {
	const select = event.target;
	const card = select.closest(".task-card");
	const taskInsideTheArray = todos.find(findTask);
	function findTask(task) {
		return task.id === card.id;
	}
	if (!taskInsideTheArray) {
		return;
	} else {
		taskInsideTheArray.status = event.target.value;
		//write changes in the local storage
		saveTodos();
		//re-render all the cards
		renderCard();
	}
});
//selected
