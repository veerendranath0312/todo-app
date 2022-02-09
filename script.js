// 2. If the todo list is empty, then hide the bottom label
// 4. Update the count of the tasks that are not completed

// Selecting elements
const icons = document.querySelector('.icons')
const dayIcon = document.querySelector('#day')
const nightIcon = document.querySelector('#night')
const form = document.querySelector('form')
const inputEl = document.querySelector('#todo-input')
const todoList = document.querySelector('.todo-list')
const menu = document.querySelector('.menu')
const pendingTaskCount = document.querySelector('#items-count')
const template = document.querySelector('template')

const states = document.querySelector('.states')
const mobileStates = document.querySelector('.mobile-states')
const clearCompleted = document.querySelector('#clear-completed')

let todos = [
  {
    id: '1',
    todoText: 'Made with ❤️ by Veeren',
    isCompleted: false
  },
  {
    id: '2',
    todoText: 'Complete section 14 by nextweek',
    isCompleted: false
  },
  {
    id: '3',
    todoText: 'Go to Gym',
    isCompleted: false
  },
  {
    id: '4',
    todoText: 'Buy groceries',
    isCompleted: false
  }
]

// FUNCTIONS
// Toggle theme
const toggleTheme = function () {
  dayIcon.classList.toggle('hide-icon')
  nightIcon.classList.toggle('hide-icon')
  document.body.classList.toggle('dark-theme')
}

// Update the pending tasks count
const displayPendingTaskCount = function () {
  const count = todos.filter(todo => todo.isCompleted === false).length
  pendingTaskCount.textContent = count
}

// Display todos
const displayTodos = function (todoArray) {
  todoList.innerHTML = ''

  // Instead of hardcoding the HTML I cloned that template from HTML
  todoArray.forEach(todo => {
    const listItem = template.content.cloneNode(true).children[0]
    const checkbox = listItem.querySelector('.list-item-checkbox')
    const text = listItem.querySelector('.list-item-text')
    const crossMark = listItem.querySelector('.cross-mark')

    checkbox.id = todo.id
    checkbox.checked = todo.isCompleted
    text.textContent = todo.todoText
    crossMark.id = todo.id

    todoList.append(listItem)
  })
}

// Add todos to the todos array
const addTodos = function (e) {
  e.preventDefault()
  const todoText = inputEl.value
  todos.push({
    id: new Date().getTime().toString(),
    todoText,
    isCompleted: false
  })

  displayTodos(todos)
  displayPendingTaskCount()
  inputEl.value = ''
}

// Mark the todo as complete
const markAsComplete = function (e) {
  if (e.target.classList.contains('list-item-checkbox')) {
    // Finding the todo which is checked based on id
    const selectedTodo = todos.find(todo => todo.id === e.target.id)
    selectedTodo.isCompleted = e.target.checked

    displayPendingTaskCount()
  }
}

// Delete todo
const deleteTodo = function (e) {
  if (e.target.classList.contains('cross-mark')) {
    // Filter out the deleted task
    const notDeletedTask = todos.filter(todo => todo.id !== e.target.id)
    todos = notDeletedTask
    e.target.closest('.list-item').remove()

    displayPendingTaskCount()
  }
}

// Clear completed todos
const clearCompletedTodos = function () {
  const todosNodeList = Array.from(document.querySelectorAll('.list-item'))
  const notCompletedTodos = todos.filter((todo, i) => {
    if (todo.isCompleted === true) {
      // looping through the NodeList and getting one of the child element
      // comparing the child element id with the todo id
      // if both are equal then remove that particular node from the NodeList
      todosNodeList
        .find(
          todoNode =>
            todoNode.querySelector('.list-item-checkbox').id === todo.id
        )
        .remove()
      return
    } else {
      return todo
    }
  })

  todos = notCompletedTodos
  displayTodos(todos)
}

// It will filter the todos based on the isCompleted value and displays them
const filterTodosOnCondition = function (booleanValue) {
  const activeTodos = todos.filter(todo => todo.isCompleted === booleanValue)
  displayTodos(activeTodos)
}

// Filter todos
const filterTodos = function (e) {
  if (e.target.id === 'state-all') {
    displayTodos(todos)
  }

  if (e.target.id === 'state-active') {
    filterTodosOnCondition(false)
  }

  if (e.target.id === 'state-completed') {
    filterTodosOnCondition(true)
  }
}

// Initialization function
const init = function () {
  displayTodos(todos)
  displayPendingTaskCount()
}

icons.addEventListener('click', toggleTheme)
form.addEventListener('submit', addTodos)
todoList.addEventListener('click', markAsComplete)
todoList.addEventListener('click', deleteTodo)
states.addEventListener('click', filterTodos)
mobileStates.addEventListener('click', filterTodos)
clearCompleted.addEventListener('click', clearCompletedTodos)

init()
