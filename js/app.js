document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Function to add a new todo item
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        // Create a new list item
        const li = document.createElement('li');

        // Add a span for the task text
        const taskText = document.createElement('span');
        taskText.textContent = todoText;

        // Add a checkmark icon (hidden by default)
        const checkmark = document.createElement('span');
        checkmark.textContent = '✔️';
        checkmark.classList.add('checkmark');
        checkmark.style.display = 'none'; // Initially hidden

        // Add a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn'); // Add a class for styling

        // Append the task text, checkmark, and delete button to the list item
        li.appendChild(taskText);
        li.appendChild(checkmark);
        li.appendChild(deleteBtn);

        // Edit functionality
        taskText.addEventListener('dblclick', () => {
            // Save the current text
            const currentText = taskText.textContent;
            taskText.textContent = ''; // Clear the content of the task text

            // Create an input field with the current text
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;

            // Replace the task text with the input field
            li.replaceChild(input, taskText);

            // Focus on the input field
            input.focus();

            // Save the edited text when Enter is pressed or focus is lost
            input.addEventListener('blur', saveEdit);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') saveEdit();
            });

            function saveEdit() {
                const newText = input.value.trim();
                if (newText !== '') {
                    // Replace the input with the new text
                    taskText.textContent = newText;
                    li.replaceChild(taskText, input);
                } else {
                    // If the input is empty, remove the task
                    todoList.removeChild(li);
                }
            }
        });

        // Mark as completed when clicked (but not during editing)
        taskText.addEventListener('click', () => {
            li.classList.toggle('completed');
            if (li.classList.contains('completed')) {
                checkmark.style.display = 'inline'; // Show checkmark
            } else {
                checkmark.style.display = 'none'; // Hide checkmark
            }
        });

        // Delete functionality
        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(li);
        });

        // Append the list item to the todo list
        todoList.appendChild(li);

        // Clear the input field
        todoInput.value = '';
    }

    // Event listener for the "Add" button
    addBtn.addEventListener('click', addTodo);

    // Allow pressing "Enter" to add a todo
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});