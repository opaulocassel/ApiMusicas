const express = require('express');
const server = express();
const dadosMusicas = require('./data/dadosMusicas.json');
const fs = require('fs');
server.use(express.json());
server.post('/musicas', (req, res) => {
    const novaMusica = req.body;

    novaMusica.id = parseInt(novaMusica.id);

    if (!novaMusica.id || !novaMusica.nome || !novaMusica.imagem || !novaMusica.cantor || !novaMusica.album) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        const musicaExistente = dadosMusicas.Musica.find(musica => musica.id === novaMusica.id);
        if (musicaExistente) {
            return res.status(400).json({ mensagem: "ID já existe, tente novamente com um ID diferente" });
        } else {
            dadosMusicas.Musica.push(novaMusica);
            salvarDadosMusicas(dadosMusicas);
            return res.status(201).json({ mensagem: "Nova música cadastrada com sucesso!" });
        }
    }
});
server.get('/musicas', (req, res) => {
    return res.json(dadosMusicas.Musica);
});
server.put('/musicas/:id', (req, res) => {
    const musicaId = parseInt(req.params.id);
    const atualizarMusica = req.body;
    const idMusica = dadosMusicas.Musica.findIndex(m => m.id === musicaId);

    if (idMusica === -1) {
        return res.status(404).json({ mensagem: "Musica não encontrado :/" });
    } else {
        dadosMusicas.Musica[idMusica].id = atualizarMusica.id || dadosMusicas.Musica[idMusica].id;
        dadosMusicas.Musica[idMusica].nome = atualizarMusica.nome || dadosMusicas.Musica[idMusica].nome;
        dadosMusicas.Musica[idMusica].imagem = atualizarMusica.imagem || dadosMusicas.Musica[idMusica].imagem;
        dadosMusicas.Musica[idMusica].cantor = atualizarMusica.cantor || dadosMusicas.Musica[idMusica].cantor;
        dadosMusicas.Musica[idMusica].album = atualizarMusica.album || dadosMusicas.Musica[idMusica].album;
        salvarDadosMusicas(dadosMusicas);
        return res.json({ mensagem: "Musica atualizado com sucesso!" });
    }
});
server.delete("/musicas/:id", (req, res) => {
    const musicaId = parseInt(req.params.id);
    dadosMusicas.Musica = dadosMusicas.Musica.filter(m => m.id !== musicaId);
    salvarDadosMusicas(dadosMusicas);
    return res.status(200).json({ mensagem: "Musica excluído com sucesso" });
});
function salvarDadosMusicas() {
    fs.writeFileSync(__dirname + '/data/dadosMusicas.json', JSON.stringify(dadosMusicas, null, 2));
}
module.exports = { server, salvarDadosMusicas };