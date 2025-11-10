const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// Aufgaben aus LocalStorage laden
loadTasks();

function addTask() {
    if (taskInput.value.trim() === "") return;

    const li = createTaskElement(taskInput.value);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

// HTML-Element für eine Aufgabe erzeugen
function createTaskElement(text, done = false) {
    const li = document.createElement("li");
    li.textContent = text;

    if (done) li.classList.add("done");

    li.addEventListener("click", () => {
        li.classList.toggle("done");
        saveTasks();
    });

    li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        li.remove();
        saveTasks();
    });

    return li;
}

// Aufgaben speichern
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.textContent,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Aufgaben laden
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.done);
        taskList.appendChild(li);
    });
}

// Button oder Enter fügt Aufgabe hinzu
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
