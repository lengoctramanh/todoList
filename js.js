const taskInput=document.getElementById('taskInput')
const addBtn=document.getElementById('addBtn')
const taskList=document.getElementById('taskList')
const tasks=[]
let alert=true


// HÀM HIỂN THỊ CÁC PHẦN CỦA TODOLIST
const handleShow=()=> {
    document.getElementById("todoList").style.display = "block";
    document.getElementById("title").style.display = "none";
    document.getElementById("showBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "block"
}
document.getElementById("showBtn").addEventListener("click", handleShow);


//HÀM QUAY LẠI BAN ĐẦU
const handleBack=()=> {
    document.getElementById("todoList").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("showBtn").style.display = "block";
    document.getElementById("backBtn").style.display = "none";
}
document.getElementById("backBtn").addEventListener("click", handleBack);

 

// ADD NEW TASK
const addTask=()=> {
  const newTask=taskInput.value.trim()
  if(newTask==="") {
    if (alert) {
        alert('Add a new task please! ')
        alert=false
    }
}

const list=document.createElement('list')
  list.textContent=newTask

  const deleteBtn=document.createElement('button')
  deleteBtn.textContent='Delete'
  deleteBtn.className='deleteBtn'// CREATE DELETE BUTTON WITH ITS CLASSNAME
  list.appendChild(deleteBtn) //ADD DELETE BUTTON INTO LIST


  const editBtn=document.createElement('button')
  editBtn.textContent='Edit'
  editBtn.className='editBtn'// CREATE EDIT BUTTON WITH ITS CLASSNAME
  list.appendChild(editBtn)// ADD EDIT BUTTON INTO LIST

  
  taskList.appendChild(list)
  tasks.push({
    text:newTask,
    listItem:list
  })
  alert=true
  taskInput.value=""// INPUT WLL BE EMPTY WHEN CLICK NEW TASK


  
}



//DELETE
const deleteTask=(e)=> {
    if (e.target.classList.contains('deleteBtn')) {
        e.target.parentElement.remove()//DELETE PARENT WHEN CLICK 
    }
}


// EDIT
const editTask = (e) => {
    if (e.target.classList.contains("editBtn")) {
      const taskText = e.target.parentElement.firstChild.nodeValue.trim();
      const input = document.createElement("input");
      input.value = taskText;
      e.target.parentElement.firstChild.replaceWith(input);


      // SAVE LOGIC
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "saveBtn";
      const handleSaveBtn=()=> {
        e.target.parentElement.firstChild.replaceWith(document.createTextNode(input.value));
        saveBtn.remove();
        cancelBtn.remove();
        editBtn.style.display = "inline"; 
        deleteBtn.style.display = "inline"; 
      }
      saveBtn.onclick = handleSaveBtn

    // CANCEL LOGIC
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "cancelBtn";
      const handleCancelBtn=()=> {
        input.replaceWith(document.createTextNode(taskText));// createTextNode: create new task and replace present data with latest task when edit
        saveBtn.remove();
        cancelBtn.remove();
        editBtn.style.display = "inline"; // DISPLAY EDIT BUTTON AGAIN WHEN CANCEL EDIT
        deleteBtn.style.display = "inline"; //DISPLAY DELETE BUTTON AGAIN WHEN CANCEL EDIT
      }
      cancelBtn.onclick = handleCancelBtn

      //EDIT LOGIC
      const editBtn = e.target; 
      editBtn.style.display = "none";  // HIDE EDIT BUTTON WHEN START EDIT
      const deleteBtn = e.target.parentElement.querySelector(".deleteBtn");
      deleteBtn.style.display = "none"; // HIDE DELETE BUTTON WHEN START EDIT
      e.target.parentElement.appendChild(saveBtn);
      e.target.parentElement.appendChild(cancelBtn);
    }
  };

  // BẤM PHÍM ENTER
const handleKeyPress=(e)=> {
    if(e.keyCode ===13) {
        addTask()
    }
}

//GỌI CÁC HÀM
addBtn.addEventListener('click',addTask)
taskList.addEventListener('click',deleteTask)
taskList.addEventListener('click',editTask)
taskInput.addEventListener('keypress',handleKeyPress)