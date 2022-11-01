import { Task } from "./task";

let tasks = [
    new Task("clean", "kitchen"),
    new Task("clean", "zink"),
    new Task("shop", "sallad")
]


window.onload = function () {
   
    createStructureTodoList ()

    document.getElementById("btn-addtask").addEventListener("click", createAndStoreTask);

}

    // Skapa strukturen på todolist för den hårdkodade punkterna i listan

    function createStructureTodoList () { 

        for (let i = 0; i < tasks.length; i++) {
    
            let category = document.getElementById(tasks[i].category);
    
            let container = document.createElement("div");
            let chore = document.createElement("span");
    
            let checkmark = document.createElement("input");
            checkmark.setAttribute("type", "checkbox");
    
            container.className = "task";
    
            chore.className = "task__chore";
            chore.innerHTML = tasks[i].chore;
    
            category.appendChild(container);
            container.appendChild(chore);
            container.appendChild(checkmark);
    
        }  
    }
    
// Skapa en ny task och spara den på hemsidan



function createAndStoreTask() {

    let category = document.getElementById("category").value;
    let chore = document.getElementById("chore").value;

   
    let task = new Task (category, chore);
    tasks.push(task);

    let clearChore = document.getElementById("chore");
    clearChore.value = "";

    addNewTaskToList ()



}


// lägg till ny task i todo listan

function addNewTaskToList () {
    let lastAddedTask = tasks[tasks.length - 1];

    let category = document.getElementById(tasks[tasks.length - 1].category);

    let container = document.createElement("div");
    let chore = document.createElement("span");

    let checkmark = document.createElement("input");
    checkmark.setAttribute("type", "checkbox");

    container.className = "task";

    chore.className = "task__chore";
    chore.innerHTML = tasks[tasks.length - 1].chore;

    category.appendChild(container);
    container.appendChild(chore);
    container.appendChild(checkmark);

    console.log(lastAddedTask);

    

}






