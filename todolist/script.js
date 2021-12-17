


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
            todoItems.splice(i, 1);

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

        if (item.isdelete) {
            deleteBtn.classList.add("open");
        }
        deleteBtn.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.deleteBtn) {
                item.deleteBtn = false;
            } else {
                item.deleteBtn = true;
            }
            renderTodoItemList(todoItems,finishedItems);
        });
        deleteBtn.addEventListener("click", (e) => {
            todoItems.splice(i, 1);
            console.log("delete:", i, todoItems, finishedItems);
        });
        
        titleEl.innerText = item.title;
        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deleteBtn);
        paneEl.append(itemDiv);
    }
}

function renderFinishedItemList(todoItems, finishedItems) {

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
        
        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        paneEl.append(itemDiv);
    }

}

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
}

renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);

