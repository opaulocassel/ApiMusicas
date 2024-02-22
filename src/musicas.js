document.addEventListener('DOMContentLoaded', function () {
    loadMusicasList();
    document.getElementById('formAdicionarMusica').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarMusica();
    });
});

function adicionarMusica() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeMusica').value;
    const imagem = document.getElementById('imagemMusica').value;
    const cantor = document.getElementById('cantorMusica').value;
    const album = document.getElementById('albumMusica').value;

    if (!id || !nome || !imagem || !cantor || !album) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('http://localhost:3000/api/musicas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            cantor: cantor,
            album: album,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadMusicasList();
        })
        .catch(error => console.error('Error:', error));
}
function loadMusicasList() {
    fetch('http://localhost:3000/api/musicas')
        .then(response => response.json())
        .then(data => displayMusicasList(data))
        .catch(error => console.error('Error:', error));
}

function displayMusicasList(data) {
    const listaMusicas = document.getElementById('listaMusicas');
    listaMusicas.innerHTML = '';
    data.forEach(musica => {
        const listItem = document.createElement('div');
        listItem.classList = `musica`
        listItem.innerHTML = 
        `
            <img src="${musica.imagem}" id="iconeMusica">
            <h3 id="texto">${musica.nome}
            <h4 id="texto2">${musica.cantor}
        `
        listItem.addEventListener('click', function() {
            ver(musica.id);
        });
        listaMusicas.appendChild(listItem);
    });

    let tela = document.getElementById('tudo');
    tela.style.display = "none";

    const vish2 = document.getElementById('tudo2');
    vish2.style.display = "none";

    function ver(id) {
        const musica = data.find(musica => musica.id === id);
        if (musica) {
            tela.style.display = "block";
            const vish = document.getElementById('quadrado-preto');
            vish.innerHTML = 
            `
            <h4 onclick="sair()">Voltar</h4>
            <div id="dentro">
                <img src="${musica.imagem}" id="iconeMusica">
                <br>
                <h3>ID: ${id}</p>
                <p>Nome: ${musica.nome}</p>
                <p>Cantor: ${musica.cantor}</p>
                <p>Álbum: ${musica.album}</p>
                
            </div>
                <button type="button" onClick="deletarMusica(${musica.id})" class="botao">Deletar</button>
                <button type="button" class="botao">Alterar</button>
            `;
        }
    }
}
function sair() {
    let tela = document.getElementById('tudo');
    tela.style.display = "none";
    const vish2 = document.getElementById('tudo2');
    vish2.style.display = "none";
}
    
function adicionar() {
    const vish2 = document.getElementById('tudo2');
    vish2.style.display = "block";
}

function deletarMusica(id) {
    fetch(`http://localhost:3000/api/musicas/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log(`Música com ID ${id} deletada com sucesso.`);
            } else {
                console.error('Erro ao deletar música.');
            }
        })
        .catch(error => console.error('Error:', error));
}