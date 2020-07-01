// CODE EXPLAINED channel
//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("item");
const add = document.getElementById("add");


//Classes names
const CHECK ="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST,id;

//get item from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set id to the last one in the list
    loadList(LIST); //load the list to user interface
}else{
    //if data is empty
    LIST = [];
    id = 0;
}

//load items to user interface
function loadList(array){
    
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
    
}

// clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})


//Show todays date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// add to do function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return;}
    
    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `
                  <li class="item">
                    <i class="circle fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" job="complete" id="${id}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li> 

                 `;
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
    
}

// add an item to the list when user hits the enter key
/*document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value; //get the value from the input field
        
        if(toDo){//check input field is not empty
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //add item to local storage (this code must be added where the list array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value="";
    }
});*/

function addToList(event){
    console.log(event.type);
    if(event.keyCode == 13 || event.type == "click"){
        const toDo = input.value; //get the value from the input field
        
        if(toDo){//check input field is not empty
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //add item to local storage (this code must be added where the list array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value="";
    }
};
document.addEventListener("keyup", addToList)
add.addEventListener("click", addToList);


//complete to do
function completeToDo(element){
    //if statement adds functionality to allow user to tick off items by clicking the text
    if(element.classList.contains("text")){//if the clicked element is the text
           element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);//applies line through the text
           let checkCircle = Array.from(document.querySelectorAll('.circle')).find(circle => circle.id == element.id);
           console.log(checkCircle);
           checkCircle.classList.toggle(CHECK);
           checkCircle.classList.toggle(UNCHECK);
    } else{
    element.classList.toggle(CHECK);//checks or unchecks the circle
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);//applies line through the text
    }
LIST[element.id].done = LIST[element.id].done ? false : true; 
    
}


// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}


// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //returns clicked element
    console.log(element);
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    //add item to local storage (this code must be added where the list array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
