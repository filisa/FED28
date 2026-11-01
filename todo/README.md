# Flowboard

Flowboard is a simple task tracker built with HTML, CSS, and vanilla JavaScript. Tasks are displayed on a board with three status lanes: **To do**, **Ongoing**, and **Done**.

## What you can do

- Add a task with a required name and an optional note.
- Choose which lane the task starts in.
- Change a task's status to move it to another lane.
- Delete a task.
- See how many tasks are in each lane, how many are complete, and your completion percentage.
- Refresh the page and find your tasks still there.

## How to use it

Open `index.html` in a web browser. No installation or build step is needed.

1. Enter a task name and, optionally, a note.
2. Choose a starting status.
3. Select **Add task**.
4. Use the status menu on a task card to move it between lanes.
5. Use the ✖ button on a card to delete that task.

## How it works

The tasks are kept in a JavaScript array while the page is open. Each task has a status (`todo`, `ongoing`, or `done`), and the board is rendered into the lane that matches that status. When a status changes or a task is deleted, the app updates the task array and renders the board again.

The app saves the task array in the browser's `localStorage`, so tasks persist across page refreshes in the same browser. They are stored locally, not synced to an account or another device. Clearing the browser's site data may remove them.

## Project files

- `index.html` — page structure and task board.
- `styles.css` — layout and visual styling.
- `script.js` — task creation, rendering, status changes, deletion, progress counts, and local storage.
- `basil.png` — page icon.

## Credits

Javascript code was written by Margarita. The HTML and CSS were created with the help of Claude AI.
