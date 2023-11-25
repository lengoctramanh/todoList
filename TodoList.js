const TOAST_TYPES = {
  success: "success",
  error: "error",
};

const TIME =  {
  _3_SECOND: 3 * 1000 
}

const STATUS = {
_ADD: "add",
_EDIT: "edit",
_ADD_NUM: -1,
_PENDING:'pending',
  _DONE: "done",
};
let storageKey=' todos'
let todos = [];
let currentEditIndex = STATUS._ADD_NUM;

const toastSuccess = document.getElementById("toastSuccess");
const toastError = document.getElementById("toastError");


const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadFromLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
      todos = JSON.parse(storedTodos);
  }
};
loadFromLocalStorage();


const renderTodoList = () => {
  const taskList = document.getElementById("taskList");
taskList.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    
    listItem.className = "todo-item";
    listItem.innerHTML = `
    <div class="todo-completed">
    <input type="checkbox" id="todo${index}" name="todo${index}" onclick="updateStatus(this)"  >
      <label for="todo${index}">${todo}</label>
    </div>
      
    <div>
      <button class="editBtn" onclick="openPopup('edit', ${index})">Edit</button>
      <button class="deleteBtn" onclick="deleteTodo(${index})">Delete</button>
    </div>
    `;
      taskList.appendChild(listItem);
     
      console.log(todo)
   
  });
};
const updateStatus=(selectedTask)=> {
console.log(selectedTask)
  const taskName=selectedTask.parentElement.lastElementChild
  if(selectedTask.checked) {
    taskName.classList.add('checked')
  } else {
    taskName.classList.remove('checked')
  }
 
}



const openPopup = (action = STATUS._ADD, index = STATUS._ADD_NUM) => {
  const popup = document.getElementById("popup");
  const title = document.getElementById("title");
  const taskInput = document.getElementById("taskInput");

  if (action === STATUS._ADD) {
    title.innerText = "Add Todo";
    taskInput.value = "";
    currentEditIndex = STATUS._ADD_NUM;
  } else  {
    title.innerText = "Edit Todo";
    taskInput.value = todos[index];
    currentEditIndex = index;
  }

  popup.style.display = "flex";
  taskInput.focus();
};



const closePopup = () => {
  const popup = document.getElementById("popup");

  popup.style.display = "none";
};

const saveTodo = () => {
  const taskInput = document.getElementById("taskInput").value;
  
if(taskInput === "") {
    ToastError("Please enter input!")
    return toastError.play();
  }
 

  

  const handelCheckType = currentEditIndex !== STATUS._ADD_NUM
  if (handelCheckType) {
    return saveEdit(currentEditIndex)
  } 

  todos.push({ name: taskInput, status:STATUS._PENDING});
  ToastSuccess(`Add ${taskInput} success `)

  toastSuccess.play();
  closePopupAndRenderList()
  saveToLocalStorage();
};

const handleKeyPress=(e)=> {
if(e.key==='Enter') {
  saveTodo()
 
}
}
taskInput.addEventListener("keypress", handleKeyPress)

  

const saveEdit = (currentEditIndex) => {
    const taskInput = document.getElementById("taskInput").value;
    ToastSuccess(`Change ${ todos[currentEditIndex] } into ${taskInput} successfully `)
    todos[currentEditIndex] = taskInput
    toastSuccess.play();
    closePopupAndRenderList()
}

const closePopupAndRenderList = () =>{
    closePopup();
    renderTodoList();
}

const deleteTodo = (index) => {
  const deletedValue = todos[index];
  todos.splice(index, 1);
  ToastSuccess(`Deleted ${deletedValue} successfully`); 
  toastSuccess.play();
  renderTodoList();
};



const showToast = (message, type) => {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "toast";

    switch (type) {
        case TOAST_TYPES.success:
          toast.classList.add("success");
          break;
        case TOAST_TYPES.error:
          toast.classList.add("error");
          break;
        default:
          break;
    }

    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, TIME._3_SECOND);
  };

  const ToastError = (message) => {
    showToast(message,TOAST_TYPES.error );
  };

  const ToastSuccess = (message) => {
    showToast(message, TOAST_TYPES.success);
  };


renderTodoList();





