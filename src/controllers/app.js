const express = require('express');
const server = express();
const musicasRouter = require('./controllerMusicas.js');
const cors = require('cors');
const fs = require('fs');

server.use(express.json());
server.use(cors());

server.use('/api', musicasRouter.server);

server.listen(3000, () => {
    console.log('O servidor está funcionando! :D');
});
