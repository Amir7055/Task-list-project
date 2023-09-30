let form = document.querySelector("#task-form");
let taskInput = document.querySelector("#new-task");
let taskList = document.querySelector("#task");
let filterbtn = document.querySelector("#task-filer");
let clearbtn = document.querySelector("#clear-task-btn");

// Define event listener
form.addEventListener('submit', addtask);
taskList.addEventListener('click', removeTask);
clearbtn.addEventListener('click', clerBtn);
filterbtn.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);


function addtask(e) {
    if (taskInput.value === '') {
        alert("add a task!")
    } else {
        let listLi = document.createElement("li");
        listLi.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        listLi.appendChild(link);
        taskList.appendChild(listLi);

        storegeTaskLocalstroge(taskInput.value);

        taskInput.value = '';




    }
    e.preventDefault();
}
//remove task
function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure ?")) {
            let ele = e.target.parentElement;
            ele.remove()
            removeLsitem(ele);
        }
    }
}

function clerBtn(e) {
    taskList.innerHTML = "";

}

// filterTask 

function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('#task li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// define

function storegeTaskLocalstroge(task) {
    let saveItem;
    if (localStorage.getItem("saveItem") === null) {
        saveItem = [];
    } else {
        saveItem = JSON.parse(localStorage.getItem("saveItem"))
    }
    saveItem.push(task);
    localStorage.setItem("saveItem", JSON.stringify(saveItem));


}

//get task
function getTask() {
    let saveItem;
    if (localStorage.getItem("saveItem") === null) {
        saveItem = [];
    } else {
        saveItem = JSON.parse(localStorage.getItem("saveItem"))
    }
    saveItem.forEach(task => {
        let listLi = document.createElement("li");
        listLi.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        listLi.appendChild(link);
        taskList.appendChild(listLi);
    })

}
// remove function from stroge
function removeLsitem(taskitem){
    let saveItem;
    if (localStorage.getItem("saveItem") === null) {
        saveItem = [];
    } else {
        saveItem = JSON.parse(localStorage.getItem("saveItem"))
    }
    let li = taskitem;
    li.removeChild(li.lastChild);
    saveItem.forEach((task , index)=>{
        if(li.textContent.trim()===task){
            saveItem.splice(index,1);
        }
    })
    localStorage.setItem('saveItem',JSON.stringify(saveItem));

    }


