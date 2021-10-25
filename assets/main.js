function listaJogos(){
    var $jogo = document.getElementById("jogo").value
    var url = 'http://127.0.0.1:75/jogos/api/v1/lista/' + $jogo;
    var request = new XMLHttpRequest();
    
    request.open('GET', url);
    request.onerror = function (e) {
        document.getElementById('return').innerHTML = 'API OFFLINE';
    }

    request.onload  = () => {
        var response = JSON.parse(request.responseText);
        console.log(response.lista.id)
        console.log(response.lista.nome)
        console.log(response.lista.plataforma)
        console.log(response.lista.preco)
        if (response.erro === true) {
            document.getElementById('return').innerHTML = 'CEP NÂO ENCONTRADO';
        }else{
            document.getElementById('return').innerHTML = 'ID: ' + response.lista.id + '<br>' +
                                                            'Nome: ' + response.lista.nome + '<br>' +
                                                            'Plataforma: ' + response.lista.plataforma + '<br>' +
                                                            'Preço: ' + response.lista.preco ;
        }
    }
    request.send()
}


const novoGame = async () => {
    const nome = document.getElementById('nome')
    const plataforma = document.getElementById('plataforma')
    const preco = document.getElementById('preco')

    const game = [
        {
            nome: nome.value,
            plataforma: plataforma.value,
            preco: Number(preco.value)
        }
    ]

    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(game)
    }

    const response = await fetch('http://127.0.0.1:75/jogos/api/v1/lista/add/', init)
    const dados = await response.json()
    console.log(dados)
}


window.onload = () => {
    const btnAddGame = document.getElementById('btnAddGame')
    btnAddGame.onclick = novoGame
    console.log('Iniciado')
}