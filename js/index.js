//Seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todooList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchInput = document.querySelector("#search-input")
const eraseBtn = document.querySelector("#erase-button")
const filterBtn = document.querySelector("#filter-select")

let oldInputValue

//funções



const saveTodo = (text, done = 0, save = 1)=> {
    const todo = document.createElement("div")
    todo.classList.add("todo")
    
    const todoTiitle = document.createElement("h3")
    todoTiitle.innerText = text
    todo.appendChild(todoTiitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    //açoes local storage
    if(done){
        todo.classList.add("done")
    }

if(save){
    saveTodoLocalStorage({text, done})
}



    todooList.appendChild(todo)
    
    todoInput.value = ""
    todoInput.focus()

}

const toggleForms = () =>{
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todooList.classList.toggle("hide")
}

    const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) =>{

        let todoTiitle = todo.querySelector("h3")

        if(todoTiitle.innerText === oldInputValue){
            todoTiitle.innerText = text

            updateTodoLocalStorage(oldInputValue, text)
        }
    })

    }

    const getSearchedTodos = (search) => {
        const todos = document.querySelectorAll(".todo");
      
        todos.forEach((todo) => {
          const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
      
          todo.style.display = "flex";
      
          console.log(todoTitle);
      
          if (!todoTitle.includes(search)) {
            todo.style.display = "none";
          }
        });
      };

      const filterTodos = (filterValue) =>{
        const todos = document.querySelectorAll(".todo");
        switch(filterValue){
            case 'all':
                todos.forEach((todo) => (todo.style.display = "flex"))
                break

            case 'done':
                todos.forEach((todo) => (todo.classList.contains("done")
                 ? todo.style.display = "flex" 
                 : todo.style.display = "none"))
                break

            case 'todo':
                todos.forEach((todo) => (!todo.classList.contains("done")
                 ? todo.style.display = "flex" 
                 : todo.style.display = "none"))
                break

                default:
                    break
        }
      }

      //Eventos

todoForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    const inputValue = todoInput.value
    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e) =>{
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTiitle
    
    if(parentEl && parentEl.querySelector("h3")){
        todoTiitle = parentEl.querySelector("h3").innerText
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
        updateTodoStatusLocalStorage(todoTiitle)
    }
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove()
        removeTodoLocalStorage(todoTiitle)
        
    }
    if(targetEl.classList.contains("edit-todo")){
        toggleForms()
        
        

        editInput.value = todoTiitle
        oldInputValue = todoTiitle
    }
})

cancelEditBtn.addEventListener("click" , (e) =>{
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)

    }
    toggleForms()
})

searchInput.addEventListener("keyup", (e) =>{
    const search = e.target.value
    getSearchedTodos(search)
})

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value
    filterTodos(filterValue)
})

//Local Storage

const getTodoLocalStorage = () =>{
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos
}

const loadTodos = () =>{
    const todos = getTodoLocalStorage()
    todos.forEach((todo) =>{
        saveTodo(todo.text, todo.done, 0)
    })
    
}

const saveTodoLocalStorage = (todo) =>{
    const todos = getTodoLocalStorage()

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
}
const removeTodoLocalStorage = (todoText) =>{
    const todos = getTodoLocalStorage()
    const filteredTodos = todos.filter((todo) => todo.text !== todoText)
    localStorage.setItem("todos", JSON.stringify(filteredTodos))

}

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodoLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoText ? (todo.done = !todo.done) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodoLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoOldText ? (todo.text = todoNewText) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
loadTodos()