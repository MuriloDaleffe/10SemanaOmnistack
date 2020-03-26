const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Métodos -> GET, POST, PUT, DELETE
//Tipos de parametros: 
// Query Params: request.query(Filtros, ordenação, paginação...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/dev', DevController.create);
routes.put('/editdevs', DevController.update);
routes.delete('/deldevs', DevController.delete);

routes.get('/search', SearchController.index);

module.exports = routes;