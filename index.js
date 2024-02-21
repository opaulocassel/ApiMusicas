const express = require('express');
const server = express();
const dados = require('./data/dados.json');
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json());

// Função para verificar o servidor
server.listen(3000, () =>{
console.log("Servidor está funcionando!");
});

// salvar
function salvarDados(dados){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}

//---------------------------MUSICAS-------------------------------------------
server.post('/musica', (req, res) => {
    const novaMusica = req.body

    if(!novaMusica.id || !novaMusica.nome || !novaMusica.imagem || !novaMusica.cantor || !novaMusica.album) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.musica.push(novaMusica)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Nova música cadastrado com sucesso!"})
    }
})

server.get('/musica', (req, res) => {
    return res.json(dados.users)
})

server.put('/musica/:id', (req, res) => {

    const musicaId = parseInt(req.params.id)

    const atualizarMusica = req.body

    const idMusica = dados.musica.findIndex(m => m.id === musicaId)

    if(idMusica === -1) {
        return res.status(404).json({mensagem: "Música não encontrada :/"})
    } else {
        dados.musica[idMusica].nome = atualizarMusica.nome || dados.musica[idMusica].nome

        dados.musica[idMusica].imagem = atualizarMusica.imagem || dados.musica[idMusica].imagem

        dados.musica[idMusica].cantor = atualizarMusica.cantor || dados.musica[idMusica].cantor

        dados.musica[idMusica].album = atualizarMusica.album || dados.musica[idMusica].album

        salvarDados(dados)

        return res.json({mensagem: "Música atualizada com sucesso!"})
    }
})

server.delete("/musica/:id", (req, res) => {
    const musicaId = parseInt(req.params.id)

    dados.musica = dados.musica.filter(m => m.id !== musicaId)

    salvarDados(dados)
    
    return res.status(200).json({mensagem: "Música excluida com sucesso!"})
})
//----------------------------FIM----------------------------------