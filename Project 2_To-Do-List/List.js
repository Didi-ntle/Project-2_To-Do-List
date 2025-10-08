document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput'); 
    const TaskBtn = document.getElementById('addTaskBtn'); 
    const taskList = document.getElementById('taskList'); 

    const STORAGE_KEY ='todoListTasks';

    //Loads tasks from localstorage
    const loadTasks = () => {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    };

    //This saves the current list of tasks to the localstorage
    const saveTasks = (tasks) => {
        const tasksString = JSON.stringify(tasks);
        localStorage.setItem(STORAGE_KEY, tasksString);
    };

    const renderTasks = () => {
        taskList.innerHTML = ''; //This clears the current List
        const tasks = loadTasks();

        tasks.forEach((task, index) => {

            const listItem = document.createElement('li');
            if (task.completed){
                listItem.className = 'completed'
            }

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            taskText.addEventListener('click', () => toggleTaskCompleted(index));

            //Remove Button Element 
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => removeTask(index));

            listItem.appendChild(taskText);
            listItem.appendChild(removeBtn);
            taskList.appendChild(listItem);
        });
    };

    //Adds a new task to the list
    const addTask = () => {
        const text = taskInput.value.trim();
        if (text === ''){
            alert('Task cannot be empty!');
            return;
        }

        const tasks = loadTasks();
        const newTask = { text: text, completed: false};
        tasks.push(newTask);
        saveTasks(tasks);

        taskInput.value = '';
        renderTasks();
    };

    //This part Removes a task by its Index
    const removeTask = (index) => {
        const tasks = loadTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    };

    const toggleTaskCompleted = (index) => {
        const tasks = loadTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    };

    //Add Button
    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter'){
            addTask();
        }
    });

    renderTasks();
});