function checaIdade(idade){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            idade > 18 ? resolve() : reject()
        }, 2000)
    })
}

checaIdade(20)
    .then(function(){
        console.log('Maior que 18')
    })
    .catch(function(){
        console.log('Menos que 18')
    })