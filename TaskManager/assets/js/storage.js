function addToDatabase(taskName) {
    let listOfTasks;
    if (localStorage.getItem('tasks') == null) {
        listOfTasks = []
    } else {
        listOfTasks = JSON.parse(localStorage.getItem('tasks'))
    }
    listOfTasks.push(taskName)
    localStorage.setItem('tasks', JSON.stringify(listOfTasks))
}

function loadFromDB() {;
    let listOfTasks
    if (localStorage.getItem('tasks') == null) {
        listOfTasks = []
    } else {
        listOfTasks = JSON.parse(localStorage.getItem('tasks'))
    }
    return listOfTasks //return array 
}

function clearAllTasksFromDB() {
    localStorage.clear()
}

function removeFromDB(taskItem) {
    let listOfTasks;
    if (localStorage.getItem('tasks') == null) {
        listOfTasks = []
    } else {
        listOfTasks = JSON.parse(localStorage.getItem('tasks'))
    }
    listOfTasks.forEach(function (task, index) {
        if (taskItem.textContent === task)
            listOfTasks.splice(index, 1)
    })
    localStorage.setItem('tasks', JSON.stringify(listOfTasks))
}

