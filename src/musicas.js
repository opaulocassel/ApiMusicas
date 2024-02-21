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
        `
        listaMusicas.appendChild(listItem);
    });
}