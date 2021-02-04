const taskInput = document.querySelector('#task')
const form = document.querySelector('#task-form')
const filter = document.querySelector('#filter')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')

const reloadIcon = document.querySelector('.fa');

const sortA = document.querySelector("#asc")
const sortD = document.querySelector("#des")


let DB;

document.addEventListener('DOMContentLoaded', () => {
    let tasksDB = indexedDB.open('tasks', 1);

    tasksDB.onerror = function () {
        console.log('Error Creating Database');
    }

    tasksDB.onsuccess = function () {
        console.log('Database Ready')
        DB = tasksDB.result

        displayTaskList();
    }

    tasksDB.onupgradeneeded = function (e) {
        console.log('Upgrade!!!')
        let DB = e.target.result;

        let objectStore = DB.createObjectStore('tasks', {
            keyPath: 'id',
            // date: "date",
            autoIncrement: true
        });
        objectStore.createIndex('taskName', 'taskName', {
            unique: false
        });
        console.log('Database Ready & Fields Created!');
    }

    form.addEventListener('submit', addNewTask)

    function addNewTask(e) {
        e.preventDefault();

        if (taskInput.value === '') {
            taskInput.style.borderColor = "red";

            return;
        }

        let d = new Date()

        let newTask = {
            taskName: taskInput.value,
            date: d
        }

        let transaction = DB.transaction(['tasks'], 'readwrite');
        let objectStore = transaction.objectStore('tasks');

        let request = objectStore.add(newTask);

        request.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('Task Added');

            displayTaskList();
        }
        transaction.onerror = () => {
            console.log('Error Adding Task');
        }

    }


    function displayTaskList() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        let objectStore = DB.transaction('tasks').objectStore('tasks');

        objectStore.openCursor().onsuccess = function (e) {
            let cursor = e.target.result;

            if (cursor) {


                const li = document.createElement('li');
                li.setAttribute('data-task-id', cursor.value.id);
                li.className = 'collection-item';
                li.appendChild(document.createTextNode(cursor.value.taskName));
                const link = document.createElement('a');
                link.className = 'delete-item secondary-content';
                link.innerHTML = `
                 <i class="fa fa-remove"></i>
                &nbsp;
                <a href="edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a>
                `;

                const date = document.createElement('a');
                date.className = "date"
                date.innerHTML = cursor.value.date

                li.appendChild(link);
                li.appendChild(date)

                taskList.appendChild(li);
                cursor.continue();
            }
        }
    }

    taskList.addEventListener('click', removeTask)

    function removeTask(e) {
        let taskID = Number(e.target.parentElement.parentElement.getAttribute('data-task-id'))
        let transaction = DB.transaction(['tasks'], 'readwrite');
        let objectStore = DB.transaction('tasks', 'readwrite').objectStore('tasks')

        if (e.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are You Sure about that ?')) {
                e.target.parentElement.parentElement.remove()
                objectStore.delete(taskID);

                transaction.oncomplete = () => {
                    e.target.parentElement.parentElement.remove();
                }
            }
        }
    }

    clearBtn.addEventListener('click', () => {
        if (confirm('Are You Sure?')) {
            indexedDB.deleteDatabase('tasks')
            while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild)
            }

            window.location.reload()
        }
    })

    reloadIcon.addEventListener('click', () => {
        location.reload()
    })

    filter.addEventListener('keyup', (e) => {
        const searchInput = e.target.value.toLowerCase();
        const listItems = taskList.getElementsByTagName('li');
        Array.from(listItems).forEach((listItem) => {
            const listItemTextContext = listItem.textContent;
            if (listItemTextContext.toLowerCase().indexOf(searchInput) != -1) {
                listItem.style.display = 'block';
            } else listItem.style.display = 'none';
        })
    })

    sortA.addEventListener('click', () => {
        var listContainer, i, switching, listElements, shouldSwitch;
        listContainer = document.getElementById("collection");
        switching = true;
        while (switching) {
            switching = false;
            listElements = listContainer.getElementsByTagName("LI");
            for (i = 0; i < (listElements.length - 1); i++) {
                shouldSwitch = false;
    
                if (listElements[i].lastChild.textContent.toLowerCase() > listElements[i + 1].lastChild.textContent.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                listElements[i].parentNode.insertBefore(listElements[i + 1], listElements[i]);
                switching = true;
            }
        }
    })

    sortD.addEventListener('click', () => {
        var listContainer, i, switching, listElements, shouldSwitch;
        listContainer = document.getElementById("collection");
        switching = true;
        while (switching) {
            switching = false;
            listElements = listContainer.getElementsByTagName("LI");
            for (i = 0; i < (listElements.length - 1); i++) {
                shouldSwitch = false;
    
                if (listElements[i].lastChild.textContent.toLowerCase() < listElements[i + 1].lastChild.textContent.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                listElements[i].parentNode.insertBefore(listElements[i + 1], listElements[i]);
                switching = true;
            }
        }
    })
});