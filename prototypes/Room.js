// interim location for methods to end up in room prototype

const log = require('logger');

module.exports.getSpawner = function(room){
    return _.filter(Game.spawns, structureSpawn => structureSpawn.room.name === room)[0];
};