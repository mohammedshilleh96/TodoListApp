import { completedTasksUri } from "../uri.js";

function CreateTask(taskTitle, taskId) {
  return `<div class="task" id="completed-task-${taskId}">
            <span>${taskTitle}</span>
            <div class="controls">
              <i class="fa fa-check"></i>
              <i class="fa fa-times"></i>
            </div>
          </div>`;
}

export function GetCompletedTask() {
  return fetch(completedTasksUri).then((response) => response.json());
}

export function AddCompletedTask(taskTitle, taskId) {
  document.querySelector(".completed-tasks").innerHTML += CreateTask(taskTitle, taskId);
}

export async function PostCompletedTask(taskTitle) {
  const completedTask = {
    title: taskTitle,
  };

  await fetch(completedTasksUri, {
    method: "POST",
    body: JSON.stringify(completedTask),
    headers: { "Content-type": "application/json" },
  });
}

export async function DeleteCompletedTask(taskId) {
  taskId = taskId.split("-");
  taskId = taskId[taskId.length - 1];

  fetch(completedTasksUri + `/${taskId}`, {
    method: "DELETE",
  });
}
