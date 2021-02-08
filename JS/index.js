import { AddNewTask, GetNewTasks, DeleteNewTask } from "./Tasks/NewTask.js";
import {
  AddActiveTask,
  GetActiveTasks,
  DeleteActiveTask,
  PostActiveTask
} from "./Tasks/ActiveTask.js";
import { AddCompletedTask, GetCompletedTask, PostCompletedTask, DeleteCompletedTask } from "./Tasks/CompletedTask.js";

const fetchAllTasks = async () => {
  const newTasks = await GetNewTasks();
  const activeTasks = await GetActiveTasks();
  const completedTasks = await GetCompletedTask();

  newTasks.forEach((newTask) => AddNewTask(newTask.title, newTask.id));
  activeTasks.forEach((activeTask) =>
    AddActiveTask(activeTask.title, activeTask.id)
  );
  completedTasks.forEach((completedTask) =>
    AddCompletedTask(completedTask.title, completedTask.id)
  );
};


window.addEventListener("DOMContentLoaded", fetchAllTasks());

var allTasks = document.querySelectorAll("[data-task-status]");

allTasks.forEach((taskType) => {
  taskType.addEventListener("click", (e) => {
    if (e.target.className === "fa fa-times") {
      const taskId = e.target.parentElement.parentElement.id;
      const container = e.target.parentElement.parentElement.parentElement;

      e.target.parentElement.parentElement.remove();

      if (container.dataset.taskStatus === "new") {
        DeleteNewTask(taskId);
      } else if (container.dataset.taskStatus === "active") {
        DeleteActiveTask(taskId);
      } else if (container.dataset.taskStatus === "completed") {
        DeleteCompletedTask(taskId);
      }
    }
  });
});

const newTasks = document.querySelector("[data-task-status=new]");
newTasks.addEventListener("click", (e) => {
  if (e.target.className === "fa fa-check") {
    const taskId = e.target.parentElement.parentElement.id;
    const taskTitle =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    e.target.parentElement.parentElement.remove();
    PostActiveTask(taskTitle);
    DeleteNewTask(taskId);
  }
});

const activeTasks = document.querySelector("[data-task-status=active]");
activeTasks.addEventListener("click", (e) => {
  if (e.target.className === "fa fa-check") {
    const taskId = e.target.parentElement.parentElement.id;
    const taskTitle =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    e.target.parentElement.parentElement.remove();
    PostCompletedTask(taskTitle);
    DeleteActiveTask(taskId);
  }
});
