const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')

//no máximo 5 funções, index, show, store, update, destroy

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            let { name =  login, avatar_url, bio } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                techs: techsArray,
                location,
            });

            const sendSocketMessageTo = findConnections(
                { latitude, longitude }, 
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }
    
        return response.json({ dev });
    },

    async create(request, response) {

        const { github_username, name, avatar_url, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                techs: techsArray,
                location,
            });
        } else {
            console.log("Esse desenvolvedor já está cadastrado no banco de dados")
        }
        console.log(dev);
        return response.json({ dev });
    },

    async update(request, response) {
        const { github_username, bio, techs, latitude, longitude } = request.body;

        await Dev.findOneAndUpdate({ github_username }, request.body, { upsert:true });

        let dev = await Dev.findOne({ github_username });

        return response.json({ dev });
    },
    
    async delete(request, response) {
        const { github_username } = request.body;

        await Dev.findOneAndDelete({ github_username });

        return response.json({ message: `Usuário ${ github_username } deletado com sucesso` });
    }
}