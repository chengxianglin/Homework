


let todoItems = [];
let finishedItems = [];


function renderTodoItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";

        let inputEl = document.createElement("input");
        inputEl.type = "checkbox";

        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            todoItems.splice(i, 1);//删除todo，放到finished

            console.log("finshed:", i, todoItems, finishedItems );
            renderTodoItemList(todoItems, finishedItems);

        });

        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");//开始创建重点标记
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";

        if (item.isImportance) {
            importanceEl.classList.add("open");
        }

        importanceEl.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }

            renderTodoItemList(todoItems, finishedItems);
        });

        
        
        let deleteBtn = document.createElement("Button");
        deleteBtn.className="delete-list"
        deleteBtn.innerText = "X";

        if (item.isDelete) {
            deleteBtn.classList.add("open");
        }

        deleteBtn.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.deleteBtn) {
                item.deleteBtn = false;
            } else {
                item.deleteBtn = true;
            }

            renderTodoItemList(todoItems, finishedItems);
        });
          
        titleEl.innerText = item.title;
        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deleteBtn);
        
        paneEl.append(itemDiv);
  
    }
}

      
        
    


/*function renderFinishedItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < finishedItems.length; i++ ) {
        let item = finishedItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";


        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        if (item.isImportance) {
            importanceEl.classList.add("open");
        } 
        
        if (item.isDelete) { //delet
            deleteBtn.classList.add("open");
        }
        deleteBtn.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.isDelete) {
                item.isDelete = false;
            } else {
                item.isDelete = true;
            }  
            renderTodoItemList(todoItems, finishedItems);
        }); 

        deleteBtn.addEventListener("delete", (e) => {//reach delete
            deletedItems.push(item);
            todoItems.splice(i, 1);
            console.log("deleted:", i, todoItems, deletedItems);
            renderTodoItemList(todoItems, finishedItems);
        });
        

        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deleteBtn)
        paneEl.append(itemDiv);
    }

}*/


function renderInputPane(todoItems) {
    let inputPaneEl = document.querySelector("#todolist > .input-pane");

    let addBtnEl = inputPaneEl.querySelector("#add-btn");
    let hisBtnEl = inputPaneEl.querySelector("#his-btn");

    addBtnEl.addEventListener("click", (e)=>{
        let inputEl = inputPaneEl.querySelector("input");

        todoItems.push({
            title: inputEl.value,
            isFinished: false,
            isImportance: false, 
        })
        
        console.log("add a item: ", inputEl.value);
        renderTodoItemList(todoItems, finishedItems);
    });

    hisBtnEl.addEventListener("click", (e)=>{
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");
            renderTodoItemList(todoItems, finishedItems)
        } else {
            hisBtnEl.classList.add("open");
            renderFinishedItemList(todoItems, finishedItems)
        }
    });

    // let btnEl = document.querySelector("#todolist #add-btn");
}

renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);
renderFinishedItemList(todoItems,finishedItems);