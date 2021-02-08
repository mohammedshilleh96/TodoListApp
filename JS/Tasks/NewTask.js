import { newTasksUri } from "../uri.js";

function CreateTask(taskTitle, taskId) {
  return `<div class="task" id="new-task-${taskId}">
            <span>${taskTitle}</span>
            <div class="controls">
              <i class="fa fa-check"></i>
              <i class="fa fa-times"></i>
           </div>
          </div>`;
}

export function GetNewTasks() {
  return fetch(newTasksUri).then((response) => response.json());
}

export function AddNewTask(taskTitle, taskId) {
  document.querySelector(".new-tasks").innerHTML += CreateTask(
    taskTitle,
    taskId
  );
}

export async function PostNewTask(taskTitle) {
  const newTask = {
    title: taskTitle,
  };

  await fetch(newTasksUri, {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: { "Content-type": "application/json" },
  });
}

export async function DeleteNewTask(taskId) {
  taskId = taskId.split("-");
  taskId = taskId[taskId.length - 1];

  fetch(newTasksUri + `/${taskId}`, {
    method: "DELETE",
  });
}
