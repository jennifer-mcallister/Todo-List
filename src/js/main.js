import { Task } from "./task";

// hårdkodad lista 

let tasks = [
    new Task("clean", "kitchen", false),
    new Task("clean", "sink", false),
    new Task("shop", "sallad", true)
]


let completed = [];
let notCompleted = [];

console.log(completed);
console.log(notCompleted);

// loopar igenom de hårdkodade tasken som ligger i tasks-listan

for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
        completed.push(tasks[i]);
    } else {
        notCompleted.push(tasks[i]);
    }
}

// knapp för att skapa en ny task

document.getElementById("btn-addtask").addEventListener("click", createAndStoreTask);


// addEventlistener på enter, så att man inte bara kan klicka med musen för att lägga till en ny task.
// Lyssnar efter ett knapptryck på tangentbordet "keypress", skickar med objektet e som innehåller information
// om eventet som precis hände. Skickar med detta i en arrowfunction som kollar om knappen är lika med enter och om
// det är sant anropar den funktionen som skapar en ny task. 
//preventdefault ser till så att sidan inte laddas om när jag trycker på enter 

window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        createAndStoreTask();
    }
});

function checkIfCompletedOrNotCompletedHasValue () {
    if (completed === null && notCompleted === null) {
        console.log("completed and notCompleted is null")
        
        let completed = [];
        let notCompleted = [];
 
        localStorage.setItem("notCompleted", JSON.stringify(notCompleted));
        localStorage.setItem("completed", JSON.stringify(completed));
        
        notCompleted = JSON.parse(localStorage.getItem("notCompleted"));
        completed = JSON.parse(localStorage.getItem("completed"));
    
        
    }
}

window.onload = function () {

    checkIfCompletedOrNotCompletedHasValue();
    
    notCompleted = JSON.parse(localStorage.getItem("notCompleted"));
    completed = JSON.parse(localStorage.getItem("completed"));

    // Laddar om listorna 
    
    loadTodoList ();
    
    loadCompletedList();

}


// rensar och laddar om listan på skärmen och i koden samt localstorage

function clearAndArrangeTasks (){

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
     

    localStorage.setItem("notCompleted", JSON.stringify(notCompleted));
    localStorage.setItem("completed", JSON.stringify(completed));

    notCompleted = JSON.parse(localStorage.getItem("notCompleted"));
    completed = JSON.parse(localStorage.getItem("completed"));

    
    loadTodoList ();

    loadCompletedList();
}

// flyttar task upp i listan -> sorterar om completed och notCompleted 

function moveTaskUp (movedTask, indexOfTask) {

    if (indexOfTask > 0) {

        let taskAbove = notCompleted[indexOfTask - 1];
        
        notCompleted.splice(indexOfTask - 1, 1, movedTask);

        notCompleted.splice(indexOfTask, 1, taskAbove);

        clearAndArrangeTasks();

    } 
}

// flyttar task ner i listan -> sorterar om completed och notCompleted 

function moveTaskDown (movedTask, indexOfTask) {
    console.log(notCompleted.length);
    console.log(indexOfTask);

    if (indexOfTask < notCompleted.length - 1) {

        let taskBelow = notCompleted[indexOfTask + 1];

        notCompleted.splice(indexOfTask + 1, 1, movedTask);

        notCompleted.splice(indexOfTask, 1, taskBelow);

        clearAndArrangeTasks();
    }
}

// tar bort vald task från notCompleted -> sorterar om completed och notCompleted 

function deleteTask (removedTask, indexOfTask){

    if (removedTask.completed === true) {
        completed.splice(indexOfTask, 1);
    } else {
        notCompleted.splice(indexOfTask, 1);
    }
    
    document.getElementById(removedTask.chore).innerHTML= '';

    clearAndArrangeTasks();

}

// flyttar en task till completed och tar bort den från notCompleted -> sorterar om completed och notCompleted 


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


    clearAndArrangeTasks();
  
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
            checkicon.innerHTML = "undo";
            trashicon.innerHTML = "delete";
            
            category.appendChild(container);
            container.appendChild(chore);
            container.appendChild(btnContainer);
            btnContainer.appendChild(checkbtn);
            btnContainer.appendChild(trashbtn);

            
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

    // Skapar struktur på todo listan 

    function loadTodoList () { 
        console.log(notCompleted);

        for (let i = 0; i < notCompleted.length; i++) {

            let category = document.getElementById(notCompleted[i].category); //ex. <div id="clean"></div>
            let container = document.createElement("div");
            let choreContainer = document.createElement("div");
            let chore = document.createElement("span");
            let btnContainer = document.createElement("div");

            // skapar buttons

            let upbtn = document.createElement("button");
            let downbtn = document.createElement("button");
            let checkbtn = document.createElement("button");
            let trashbtn = document.createElement("button");

            container.setAttribute("id", notCompleted[i].chore);

            upbtn.setAttribute("type", "button");
            downbtn.setAttribute("type", "button");
            checkbtn.setAttribute("type", "button");
            trashbtn.setAttribute("type", "button");

            let upicon = document.createElement("span");
            let downicon = document.createElement("span");
            let checkicon = document.createElement("span");
            let trashicon = document.createElement("span");
            
        
            container.className = "task";
            btnContainer.className = "btn-container";

            choreContainer.className = "chore-container";

            upicon.className =  "material-symbols-outlined";
            upbtn.className = "task__upbtn";

            downicon.className =  "material-symbols-outlined";
            upbtn.className = "task__upbtn";
        
            checkicon.className = "material-symbols-outlined";
            checkbtn.className = "task__checkbtn";
        
            trashicon.className = "material-symbols-outlined";
            trashbtn.className ="task__trashbtn";

            chore.className = "task__chore";
            
            chore.innerHTML = notCompleted[i].chore;
            upicon.innerHTML = "expand_less";
            downicon.innerHTML = "expand_more";
            checkicon.innerHTML = "done";
            trashicon.innerHTML = "delete";
        
            category.appendChild(container);
            container.appendChild(choreContainer);
            choreContainer.appendChild(checkbtn);
            choreContainer.appendChild(chore);
            container.appendChild(btnContainer);
            
            btnContainer.appendChild(upbtn);
            btnContainer.appendChild(downbtn);
            btnContainer.appendChild(trashbtn);
            
            
            upbtn.appendChild(upicon);
            downbtn.appendChild(downicon);
            checkbtn.appendChild(checkicon);
            trashbtn.appendChild(trashicon);

            upbtn.addEventListener("click", ()=> {
                moveTaskUp(notCompleted[i], i);
            });

            downbtn.addEventListener("click", ()=> {
                moveTaskDown(notCompleted[i], i);
            });
        
            checkbtn.addEventListener("click", ()=> {
                changeTaskStatus(notCompleted[i], i);
            });

            trashbtn.addEventListener("click", ()=> {
                deleteTask(notCompleted[i], i);
            });
    
        }  
    }
     

// Skapa en ny task och lägg till den i notCompleted listan 
// OM input fältet inte är ifyllt får man ett alert och det skapas INTE en ny task

function createAndStoreTask() {

    let chore = document.getElementById("chore").value;

    if (chore === "") {
        alert("Ooopsi! Something is missing. Please fill in chore");
        return;
    }
    
    let category = document.getElementById("category").value;
   
    let task = new Task (category, chore, false);
    notCompleted.push(task);

    document.getElementById("chore").value = '';

    
    clearAndArrangeTasks();

}









