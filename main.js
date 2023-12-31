
window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    // console.log(list_el);

    // Load tasks from LocalStorage when the page loads
    loadTasksFromLocalStorage();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log("Submit form");
        var name = localStorage.getItem('form');

        const task = input.value;
        if (!task) {
            alert("please fill out the task");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        //Add 
        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "task";
        task_input_el.value = task;

        task_input_el.setAttribute("readonly", "readonly")

        task_content_el.appendChild(task_input_el);

        //ACTION
        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";


        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);
        list_el.appendChild(task_el);

        input.value = "";

        //Add
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
            updateLocalStorage();
        });
        //Delete
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            updateLocalStorage();
        });
        updateLocalStorage();
    });

    // Function to update the LocalStorage
    const updateLocalStorage = () => {
        const tasks = document.querySelectorAll('.text');
        const taskList = [];
        tasks.forEach((task) => {
            taskList.push(task.value);
        });
        localStorage.setItem('tasks', JSON.stringify(taskList));
    };

    // Function to load tasks from LocalStorage when the page loads   (//Search In JWT)
    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const taskList = JSON.parse(storedTasks);
            taskList.forEach((task) => {
                const task_el = document.createElement("div");
                task_el.classList.add("task");

                const task_content_el = document.createElement("div");
                task_content_el.classList.add("content");
                task_el.appendChild(task_content_el);

                const task_input_el = document.createElement("input");
                task_input_el.classList.add("text");
                task_input_el.type = "text";
                task_input_el.value = task;
                task_input_el.setAttribute("readonly", "readonly");
                task_content_el.appendChild(task_input_el);

                const task_actions_el = document.createElement("div");
                task_actions_el.classList.add("actions");

                const task_edit_el = document.createElement("button");
                task_edit_el.classList.add("edit");
                task_edit_el.innerHTML = "Edit";

                const task_delete_el = document.createElement("button");
                task_delete_el.classList.add("delete");
                task_delete_el.innerHTML = "Delete";

                task_actions_el.appendChild(task_edit_el);
                task_actions_el.appendChild(task_delete_el);

                task_el.appendChild(task_actions_el);
                list_el.appendChild(task_el);

                task_edit_el.addEventListener('click', () => {
                    if (task_edit_el.innerText.toLowerCase() === "edit") {
                        task_input_el.removeAttribute("readonly");
                        task_input_el.focus();
                        task_edit_el.innerText = "Save";
                    } else {
                        task_input_el.setAttribute("readonly", "readonly");
                        task_edit_el.innerText = "Edit";
                    }
                    updateLocalStorage();
                });

                task_delete_el.addEventListener('click', () => {
                    list_el.removeChild(task_el);
                    updateLocalStorage();
                });
            });
        };
    };
});