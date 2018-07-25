const consts = require('constants');
const log = require('logger');

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
    let missing = consts.units.roomcount.HARVEST;
    for(let name in roomCreeps){
        if(roomCreeps[name].memory.role === 'harvest'){
            missing--;
        }
    }
    if(missing === 0){
        do{
            spawn(room, 'harvester');
            missing--;
        }while(missing > 0);
        return OK;
    }else if(mising <= 0){
        log.warning('Too many Harvesters!');
    }
};

module.exports.spawn = function(room, roleName){
    room.getSpawn().spawnCreep(templates.getBody(room, roleName), newName(roleName), {memory: {role: roleName}});
}

function newName(rolename){
    let i = 0;
    do{
        if(!Game.creeps[roleName + string(i)]){
            return (roleName + string(i));
        }
        i++;
    }while(i < 3)
}