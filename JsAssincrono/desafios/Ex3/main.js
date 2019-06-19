var btnEnviar = document.querySelector('#app button')

var listElement = document.querySelector('#app ul');

btnEnviar.onclick = enviarRequisicao

function enviarRequisicao(){
    var inputElement = document.querySelector('#app input').value

    var loading = document.createElement('li')
    var textLoading = document.createTextNode('Carregando...')

    var inexistente = document.createElement('li')
    var textInesistente = document.createTextNode('Usuário inexistente')

    if (inputElement){
        loading.appendChild(textLoading)
        listElement.appendChild(loading)
        getUserRepos(inputElement)
        .then(function(response){
            console.log(response)
            listElement.removeChild(loading)
            addToList(response)
        })
        .catch(function(error){
            console.log(error)
            inexistente.appendChild(textInesistente)
            listElement.removeChild(loading)
            listElement.appendChild(inexistente)
        })
    }
    
}

function getUserRepos(user) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://api.github.com/users/'+ user +'/repos')
        xhr.send(null)

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText))
                }else{
                    reject('Erro na requisição')
                }
            }
        }
    })
}

function addToList(repos){

    for(repo of repos){
        var repoElement = document.createElement('li')
        var repoContent = document.createTextNode(repo.name)

        repoElement.appendChild(repoContent)
        listElement.appendChild(repoElement)
    }

    listElement.appendChild(repoElement)
}