import { Task } from "./task";

document.getElementById("btn-addtask").addEventListener("click", createAndStoreTask);

let tasks = [
    new Task("clean", "kitchen", false),
    new Task("clean", "zink", false),
    new Task("shop", "sallad", true)
]

let completed = [];
let notCompleted = [];

// loopar igenom de hårdkodade tasken som ligger i tasks-listan

for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
        completed.push(tasks[i]);
    } else {
        notCompleted.push(tasks[i]);
    }
}


loadTodoList ();

loadCompletedList();


// tar bort vald task från notCompleted -> sorterar om completed och notCompleted FUNKAR TILL TRYCKT 3 ggr

function deleteTask (removedTask, indexOfTask){

    console.log(removedTask);
    console.log(indexOfTask);

    if (removedTask.completed === true) {
        completed.splice(indexOfTask, 1);
    } else {
        notCompleted.splice(indexOfTask, 1);
    }
    
    document.getElementById(removedTask.chore).innerHTML= '';

    document.getElementById("bodycare").innerHTML = '';
    document.getElementById("clean").innerHTML = '';
    document.getElementById("health").innerHTML = '';
    document.getElementById("shop").innerHTML = '';
    document.getElementById("social").innerHTML = '';
    document.getElementById("study").innerHTML = '';
    document.getElementById("others").innerHTML = '';

    
    document.getElementById("bodycare-done").innerHTML = '';
    document.getElementById("clean-done").innerHTML = '';
    document.getElementById("health-done").innerHTML = '';
    document.getElementById("shop-done").innerHTML = '';
    document.getElementById("social-done").innerHTML = '';
    document.getElementById("study-done").innerHTML = '';
    document.getElementById("others-done").innerHTML = '';
    
    
    
    loadTodoList ();

    loadCompletedList();

}

// flyttar en task till completed och tar bort den från notCompleted -> sorterar om completed och notCompleted FUNKAR


function changeTaskStatus(pickedTask, indexOfTask){

    if (pickedTask.completed === true) {

        document.getElementById(pickedTask.chore).innerHTML = '';

        pickedTask.completed = false;
        notCompleted.push(pickedTask);
        completed.splice(indexOfTask, 1);

    } else {
        pickedTask.completed = true;
        completed.push(pickedTask);
        notCompleted.splice(indexOfTask, 1);
    }

    
    

    document.getElementById("bodycare").innerHTML = '';
    document.getElementById("clean").innerHTML = '';
    document.getElementById("health").innerHTML = '';
    document.getElementById("shop").innerHTML = '';
    document.getElementById("social").innerHTML = '';
    document.getElementById("study").innerHTML = '';
    document.getElementById("others").innerHTML = '';
    
    document.getElementById("bodycare-done").innerHTML = '';
    document.getElementById("clean-done").innerHTML = '';
    document.getElementById("health-done").innerHTML = '';
    document.getElementById("shop-done").innerHTML = '';
    document.getElementById("social-done").innerHTML = '';
    document.getElementById("study-done").innerHTML = '';
    document.getElementById("others-done").innerHTML = '';

    loadTodoList ();
    loadCompletedList();

    console.log(pickedTask);
    console.log(indexOfTask);
    console.log(completed);
    console.log(notCompleted);
  
}


    // Skapa strukturen på completed

    function loadCompletedList() { 


        for (let i = 0; i < completed.length; i++) {

        
            let category = document.getElementById(completed[i].category + "-done");
            let container = document.createElement("div");
            let chore = document.createElement("span");
            let btnContainer = document.createElement("div");
            let checkbtn = document.createElement("button");
            let trashbtn = document.createElement("button");
            
            container.setAttribute("id", completed[i].chore);
            checkbtn.setAttribute("type", "button");
            trashbtn.setAttribute("type", "button");
        
            let checkicon = document.createElement("span");
            let trashicon = document.createElement("span");
            
        
            container.className = "task";
            btnContainer.className = "btn-container";
        
            checkicon.className = "material-symbols-outlined";
            checkbtn.className = "task__checkbtn";
        
            trashicon.className = "material-symbols-outlined";
            trashbtn.className ="task__trashbtn";

            chore.className = "task__chore";
            
            chore.innerHTML = completed[i].chore;
            checkicon.innerHTML = "done";
            trashicon.innerHTML = "delete";
            
            category.appendChild(container);
            container.appendChild(chore);
            container.appendChild(btnContainer);
            btnContainer.appendChild(trashbtn);
            btnContainer.appendChild(checkbtn);
            
            checkbtn.appendChild(checkicon);
            trashbtn.appendChild(trashicon);
        
            checkbtn.addEventListener("click", ()=> {
                changeTaskStatus(completed[i], i);
            });

            trashbtn.addEventListener("click", ()=> {
                deleteTask(completed[i], i);
            });
    
        }  
    }


    function loadTodoList () { 

        for (let i = 0; i < notCompleted.length; i++) {

            let category = document.getElementById(notCompleted[i].category); //ex. <div id="clean"></div>
            let container = document.createElement("div");
            let chore = document.createElement("span");
            let btnContainer = document.createElement("div");
            let checkbtn = document.createElement("button");
            let trashbtn = document.createElement("button");

            container.setAttribute("id", notCompleted[i].chore);
            checkbtn.setAttribute("type", "button");
            trashbtn.setAttribute("type", "button");
        
            let checkicon = document.createElement("span");
            let trashicon = document.createElement("span");
            
        
            container.className = "task";
            btnContainer.className = "btn-container";
        
            checkicon.className = "material-symbols-outlined";
            checkbtn.className = "task__checkbtn";
        
            trashicon.className = "material-symbols-outlined";
            trashbtn.className ="task__trashbtn";

            chore.className = "task__chore";
            
            chore.innerHTML = notCompleted[i].chore;
            checkicon.innerHTML = "done";
            trashicon.innerHTML = "delete";
        
            category.appendChild(container);
            container.appendChild(chore);
            container.appendChild(btnContainer);
            btnContainer.appendChild(trashbtn);
            btnContainer.appendChild(checkbtn);
            
            checkbtn.appendChild(checkicon);
            trashbtn.appendChild(trashicon);
        
            checkbtn.addEventListener("click", ()=> {
                changeTaskStatus(notCompleted[i], i);
            });

            trashbtn.addEventListener("click", ()=> {
                deleteTask(notCompleted[i], i);
            });
    
        }  
    }
    

    
// Skapa en ny task 



function createAndStoreTask() {

    let category = document.getElementById("category").value;
    let chore = document.getElementById("chore").value;

   
    let task = new Task (category, chore, false);
    notCompleted.push(task);



    document.getElementById("chore").value = '';

    loadTodoList ();
    loadCompletedList();

}









