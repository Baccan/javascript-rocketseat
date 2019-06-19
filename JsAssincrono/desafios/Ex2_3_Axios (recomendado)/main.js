var listElement = document.querySelector('#app ul')
var inputElement = document.querySelector('#app input')
var btnAdicioar = document.querySelector('#app button')

btnAdicioar.onclick = pesquisar

function pesquisar() {
    let user = inputElement.value

    if(user){
        listElement.innerHTML = ''
        getGithubRepos(user)
    } else {
        alert('Usuário não inserido')
    }

}

function getGithubRepos(user){
    let loading = document.createElement('li')
    let textLoading = document.createTextNode('Carregando...')

    loading.appendChild(textLoading)
    listElement.appendChild(loading)

    axios.get('https://api.github.com/users/' + user + '/repos')
    .then(function(response){
        console.log(response.data)
        createListItem(response.data)
    })
    .catch(function(error){
        listElement.innerHTML = ''
        
        let userNotfound = document.createElement('li')
        let textUserNotfound = document.createTextNode('Usuário não encontrado')

        console.warn(error)

        userNotfound.appendChild(textUserNotfound)
        listElement.appendChild(userNotfound)
    })
}

function createListItem(repos) {
    listElement.innerHTML = ''
    
    for (repo of repos) {
        let listItem = document.createElement('li')
        let textList = document.createTextNode(repo.name)

        listItem.appendChild(textList)
        listElement.appendChild(listItem)
    }

}