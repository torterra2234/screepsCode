module.exports.getRoleNeededSpawns = function(role, room, roomCreeps){
    let missing = Roles[role].count
    missing -= room.getCountInQueue(role);
    missing -= roomCreeps.filter(creep => Roles[role].name === Roles[creep.memory.role].name).length;
    log.status('adding ' + missing + ' ' + Roles[role].name + (missing === 1 ? '' : 's') + ' to the spawn queue');
    while(missing > 0){
        room.addToQueue(role);
        missing--;
    }
};

module.exports.spawnNext = function(room){
    if(room.spawnQueue.length === 0){
        return 0;
    }
    let role = room.spawnQueue[0];
    let Spawner = room.getSpawners()[0];
    Spawner.cooldown--;
    if(Spawner.cooldown > 0){
        if(Spawner.renewQueue[0]){
            return Spawner.renewFromQueue();
        }
        return ERR_BUSY;
    }
    if(Spawner.spawnCreep(Roles[role].body, newName(role), {memory: {role: role, targetMain: util.findTarget(role)}})){
        room.spawnedNext();
        Spawner.cooldown = Roles[role].body.length;
    }
};

module.exports.getAllNeededSpawns = function(room){
    let roomCreeps = _.filter(Game.creeps, creep => creep.room.name === room.name).filter(creep => creep.my);
    //log.debug(roomCreeps);
    if(roomCreeps.length <= roomCreepCount + 1){
        for(let role in Roles){
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
