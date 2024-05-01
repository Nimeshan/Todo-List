document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    function addTask(task) {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task;
        listItem.appendChild(taskText);

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        listItem.appendChild(checkBox);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        listItem.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        listItem.appendChild(editButton);

        checkBox.addEventListener('change', function() {
            if (this.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }
            saveTasksToLocalStorage(); // Added to save tasks on checkbox change
        });

        deleteButton.addEventListener('click', function() {
            todoList.removeChild(listItem);
            saveTasksToLocalStorage();
        });

        editButton.addEventListener('click', function() {
            const isEditing = listItem.classList.contains('editing');

            if (isEditing) {
                taskText.textContent = listItem.querySelector('input[type="text"]').value;
                listItem.classList.remove('editing');
                editButton.textContent = 'Edit';
                saveTasksToLocalStorage();
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = taskText.textContent;
                listItem.insertBefore(input, taskText);
                listItem.classList.add('editing');
                editButton.textContent = 'Save';
            }
        });

        todoList.appendChild(listItem);
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach(task => {
            const taskText = task.querySelector('span').textContent;
            const isCompleted = task.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTask = todoInput.value.trim();

        if (newTask === '') {
            alert('Please enter your task');
            return;
        }

        todoInput.value = '';
        addTask(newTask);
    });

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
    });
});