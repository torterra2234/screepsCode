module.exports.getRoleNeededSpawns = function(role, room, roomCreeps){
    let missing = Roles[role].count
    missing -= room.getCountInQueue(role);
    missing -= roomCreeps.filter(creep => Roles[role].name === Roles[creep.memory.role].name).length;
    //log.status('adding ' + missing + ' ' + Roles[role].name + (missing === 1 ? '' : 's') + ' to the spawn queue');
    while(missing > 0){
        room.addToQueue(role);
        missing--;
    }
};

module.exports.spawnNext = function(room){
    let Spawner = room.getSpawners()[0]
    if(room.spawnQueue.length === 0){
        if(Spawner.renewQueue[0]){
            return Spawner.renewFromQueue();
        }
        return OK;
    }
    let roleKey = room.spawnQueue[0];
    Spawner.cooldown--;
    if(Spawner.cooldown > 0){
        return ERR_BUSY;
    }
    if(Spawner.spawnCreep(Roles[roleKey].body, newName(roleKey), {memory: {role: roleKey, targetMain: util.findTarget(roleKey)}})){
        room.spawnedNext();
        Spawner.cooldown = Roles[roleKey].body.length;
    }
};

module.exports.getAllNeededSpawns = function(room){
    let roomCreeps = _.filter(Game.creeps, creep => (creep.room.name === room.name) && (creep.role !== 'dumb')).filter(creep => creep.my);
    log.debug(roomCreeps.length + ' creeps in Room, of target ' + roomCreepCount);
    if(roomCreeps.length <= roomCreepCount){
        for(let role in Roles){
            //log.status('checking role \'' + role + '\'');
            if(role == 'dumb'){
                continue;
            }
            //log.status('checking role \'' + role + '\'');
            module.exports.getRoleNeededSpawns(role, room, roomCreeps);
        }
    }
};

function newName(role){
    let i = 0;
    do{
        if(!Game.creeps[Roles[role].name + i]){
            return (Roles[role].name + i);
        }
        i++;
    }while(i < Roles[role].count)
}
