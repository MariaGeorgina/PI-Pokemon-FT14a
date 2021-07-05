const server = require ('express').Router();
const { Type } = require ('./../db');

server.get('/', async function (req, res) {
    try {
        const everySorts = await Type.findAll({
            attributes: [
                'id', 
                'name'
            ]
        })
        res.status(200).json(everySorts)
    } catch (error) {
        res.send(error)
    }
})
module.exports = server;