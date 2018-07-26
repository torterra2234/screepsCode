const consts = require('constants');
const log = require('logger');
const roles = require('roles');

module.exports.spawnAllNeeded = function(room){
    let roomCreeps = room.getCreeps().filter(unit => unit.my);
    if(roomCreeps < consts.ROOMCOUNT.TOTAL){
        for(let role in roles){
            spawnNeededRole(role, room, roomCreeps);
        }
        return OK;
    }
    return ERR_NOT_FOUND;
};

//this is so wrong, but i cant figure out why
module.exports.spawnNeededRoles = function(role, room, roomCreeps){
    missing = roles[role].count;
    missing-=roomCreeps.filter(thisRole => thisRole.role.name === role).length;
    while(missing > 0){
        spawn(room, role);
    }
};
/*
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
*/
module.exports.spawn = function(room, roleType){
    room.getSpawn().spawnCreep(templates.getBody(room, roleType.name), newName(roleType), {memory: {role: roleType.name}});
}

function newName(role){
    let i = 0;
    do{
        if(!Game.creeps[role.name + string(i)]){
            return (role.name + string(i));
        }
        i++;
    }while(i < role.count)
}