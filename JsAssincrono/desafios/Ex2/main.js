var btnEnviar = document.querySelector('#app button')

btnEnviar.onclick = enviarRequisicao

function enviarRequisicao(){
    var inputElement = document.querySelector('#app input').value

    if (inputElement){
        getUserRepos(inputElement)
        .then(function(response){
            console.log(response)
            addToList(response)
        })
        .catch(function(error){
            console.log(error)
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
    var listElement = document.querySelector('#app ul');

    for(repo of repos){
        var repoElement = document.createElement('li')
        var repoContent = document.createTextNode(repo.name)

        repoElement.appendChild(repoContent)
        listElement.appendChild(repoElement)
    }

    listElement.appendChild(repoElement)
}