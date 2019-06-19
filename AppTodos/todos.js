var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');



var todos = JSON.parse(localStorage.getItem('list_todos')) || []

// Renderizar Todos 
function renderTodos() {
    listElement.innerHTML = ''

    for(todo of todos){
        var todoElement = document.createElement('li')
        var todoText = document.createTextNode(todo)

        var linkElement = document.createElement('a')
        linkElement.setAttribute('href', '#')

        var pos = todos.indexOf(todo)
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos +')')
        var linkText = document.createTextNode('Excluir')

        linkElement.appendChild(linkText)
        todoElement.appendChild(todoText)
        todoElement.appendChild(linkElement)
        listElement.appendChild(todoElement)
    }
}

renderTodos()

// Adicionar Todo a lista
function addTodo() {
    var todoText = inputElement.value

    todos.push(todoText)
    inputElement.value = ''
    renderTodos()
    saveToStorage()
}

// btnAdicionar - Adicionar Todo
buttonElement.onclick = addTodo

// Deletar Todo
function deleteTodo(pos){
    todos.splice(pos, 1)
    renderTodos()
    saveToStorage()
}

// Sarvar em local storage
function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos))
}