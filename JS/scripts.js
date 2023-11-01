// Elements Selection
const toDoForm = document.querySelector('#todo-form')
const toDoInput = document.querySelector('#todo-input')
const toDoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const formControl = document.querySelector('.form-control')
const messageAlert = document.querySelector('#message-alert')
const submitBtn = document.querySelector('#submit-btn')
let oldInputValue

// Functions
function addingTasks(e){
    e.preventDefault()

    error = false

    const inputValue = toDoInput.value

    if(inputValue){
        toDoInput.classList.remove('error')
        submitBtn.classList.remove('error')
        messageAlert.classList.remove('alert')
        toDoList.innerHTML += `
        <div class="todo">
            <h3>${inputValue}</h3>
            <button class="finish-todo">
                <i class="fa-solid fa-check"></i>
            </button>
            <button class="edit-todo">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="remove-todo">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        `
    } else{
        error = true
        toDoInput.classList.add('error')
        submitBtn.classList.add('error')
        messageAlert.classList.add('alert')
    }

    toDoInput.value = ''
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    toDoForm.classList.toggle('hide')
    toDoList.classList.toggle('hide')   
}

const updateToDo = (text) => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {

        let toDoTitle = todo.querySelector('h3')
        
        if (toDoTitle.innerText === oldInputValue) {
            toDoTitle.innerText = text;
        }
    })

    localStorage.setItem('todo', JSON.stringify(todos))
}

// Events
toDoForm.onsubmit = addingTasks

document.addEventListener('click', (e) => {
    const targerEl = e.target
    const parentEl = targerEl.closest("div")
    let toDoTitle

    if(parentEl && parentEl.querySelector('h3')){
        toDoTitle = parentEl.querySelector('h3').innerText
    }

    if(targerEl.classList.contains("finish-todo")){
        parentEl.classList.toggle('done')
    }

    if(targerEl.classList.contains("remove-todo")){
        parentEl.remove()
    }

    if(targerEl.classList.contains("edit-todo")){
        toggleForms()
        editInput.value = toDoTitle
        oldInputValue = toDoTitle
    }

})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()

    toggleForms()
})


editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateToDo(editInputValue)
    }

    toggleForms()
})  



