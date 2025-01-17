// criar um servidor de api
import versionObject from "./api/version.js";
import * as http from 'http';
const server = http.createServer((req, res) => {
    // Configurar CORS para permitir requisições de qualquer origem
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    // Verificar se é uma requisição GET
    if (req.method === 'GET') {
        if (req.url === '/version') {
            res.statusCode = 200;
            res.end(JSON.stringify(versionObject));
        }
        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Rota não encontrada' }));
        }
    }
    else {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Método não permitido' }));
    }
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
