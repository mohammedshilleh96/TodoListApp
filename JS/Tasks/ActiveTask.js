import { activeTasksUri } from "../uri.js";

function CreateTask(taskTitle, taskId) {
  return `<div class="task" id="active-task-${taskId}">
            <span>${taskTitle}</span>
            <div class="controls">
              <i class="fa fa-check"></i>               
              <i class="fa fa-times"></i>
            </div>
          </div>`;
}

export function GetActiveTasks() {
  return fetch(activeTasksUri).then((response) => response.json());
}
export function AddActiveTask(taskTitle, taskId) {
  document.querySelector(".active-tasks").innerHTML += CreateTask(
    taskTitle,
    taskId
  );
}

export async function PostActiveTask(taskTitle) {
  const activeTask = {
    title: taskTitle,
  };

  await fetch(activeTasksUri, {
    method: "POST",
    body: JSON.stringify(activeTask),
    headers: { "Content-type": "application/json" },
  });
}

export async function DeleteActiveTask(taskId) {
  taskId = taskId.split("-");
  taskId = taskId[taskId.length - 1];

  fetch(activeTasksUri + `/${taskId}`, {
    method: "DELETE",
  });
}