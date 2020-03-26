const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude), 
      },
      techs: parseStringAsArray(techs),
    })

  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connections => {
    return calculateDistance(coordinates, connections.coordinates) < 10 
            && connections.techs.some(item => techs.include(item))
  })
}

exports.sendMessage = (to, Message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(Message, data)
  });
}