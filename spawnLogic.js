const consts = require('constants');

module.exports.spawnAllNeeded = function(room){
    let roomCreeps = room.getCreeps();
    if(roomCreeps < consts.ROOMCOUNT.TOTAL){
        spawnNeededHarvester(room, roomCreeps);
        spawnNeededUpgrader(room, roomCreeps);
        spawnNeededBuilder(room, roomCreeps);
        return OK;
    }
    return ERR_NOT_FOUND;
};

module.exports.spawnHarvesterNeeded = function(room, roomCreeps){

};