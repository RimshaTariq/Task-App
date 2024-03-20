let form = document.getElementById("form");
let taskTitle = document.getElementById("taskTitle");
let taskDescription = document.getElementById("taskDescription");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let edit = document.getElementById("edit");
const baseURL = 'http://localhost:3000/tasks'


// to add a new task
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    acceptData();
})

let acceptData = async ()=> {
    let taskData = {};
    taskData["task_title"] = taskTitle.value;
    taskData["task_description"] = taskDescription.value;
    const addedTask = await addTask(taskData);
    if (addedTask) {
        console.log('Task added successfully!');
        // Refresh the task list
        displayTasks();
    } else {
        console.log('Failed to add task. Please try again.');
    }
};

async function addTask(taskData) {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        const responseData = await response.json();
        resetForm();
        return responseData;
    } catch (error) {
        console.error('Error adding task:', error.message);
        return null;
    }
}

let resetForm = () =>{
    taskTitle.value = "";
    taskDescription.value = "";
}

// to edit tasks
async function editTaskForm (e, task_id){
    let selectedTask = e.parentElement.parentElement;
    taskTitle.value = selectedTask.children[0].innerHTML;
    taskDescription.value = selectedTask.children[1].innerHTML;
    add.style.display = "none";
    edit.style.display = "block";
    edit.addEventListener('click', (e)=>{
        e.preventDefault();
        editTask(task_id, taskTitle.value, taskDescription.value);
    })
}

async function editTask (task_id, task_title, task_description){
    try {
        const response = await fetch(`${baseURL}/${task_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_title: task_title,
                task_description: task_description
            })
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        resetForm();
        displayTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error updating task:', error.message);
    }
}

// to delete a task
async function deleteTask(e, task_id) {
    try {
        const response = await fetch(`${baseURL}/${task_id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        const responseData = await response.json();
        e.parentElement.parentElement.remove();
        return responseData;
    } catch (error) {
        console.error('Error deleting task:', error.message);
        return null;
    }
}


// to fetch tasks from the API
async function fetchTasks() {
    try {
        const response = await fetch(baseURL,
            {
                method: 'GET'
            });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        console.log(tasks);
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return [];
    }
}

async function displayTasks() {
    tasks.innerHTML = "";
    const tasksList = await fetchTasks();
    tasksList.forEach(task => {
        tasks.innerHTML += `
        <div>
            <span class="fw-bold">${task.task_title}</span>
            <p>${task.task_description}</p>
            <span class="options">
                <i onClick="editTaskForm(this, ${task.task_id})" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteTask(this, ${task.task_id})" class="fa-solid fa-trash"></i>
            </span>
        </div>`;
    });
}

// Call displayTasks function when the page loads
displayTasks();