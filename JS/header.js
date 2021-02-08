import { PostNewTask } from "./Tasks/NewTask.js";

async function HandleInput(e) {
  if (e.keyCode == 13) {
    await PostNewTask(e.target.value);
  }
}

var form = document.querySelector("#add-task-input");
form.addEventListener("keyup", HandleInput);
