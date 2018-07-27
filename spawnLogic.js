const log = require('logger');
const Roles = require('Roles');
const roomProto = require('room');

var _spawnQueue = [];

function _addToQueue(role){
    _spawnQueue.push(role);
}

function _addToQueueFront(role){
    _spawnqueue.unshift(role);
}

function _popQueueStart(){
    return _spawnQueue.shift();
}

function _removeAllFromQueue(delRole){
    _spawnQueue = _.filter(_spawnQueue, role => role.name !== Roles[delRole].name);
}

function _removeFirstFromQueue(role){
    _spawnQueue = _spawnQueue.splice(_spawnQueue.indexOf(role), 1);
}

function _removeLastFromQueue(role){
    _spawnQueue = _spawnQueue.splice(_spawnQueue.lastIndexOf(role),1);
}

function _getQueueCount(roleFind){
    return _.filter(_spawnQueue, role => Roles[role].name === Roles[roleFind].name).length;
}

module.exports.bumpSpawnNext = function(role){
    _removeFirstFromQueue(role);
    _addToQueueFront(role);
};

module.exports.getRoleNeededSpawns = function(role, room, roomCreeps){
    let missing = Roles[role].count
    missing -= _getQueueCount(role);
    missing -= roomCreeps.filter(creep => Roles[role].name === creep.memory.role).length;
    log.status('adding ' + missing + ' ' + Roles[role].name + (missing === 1 ? '' : 's') + ' to the spawn queue');
    while(missing > 0){
        _addToQueue(role);
        missing--;
    }
};

module.exports.spawnNext = function(room){
    log.debug(_spawnQueue);
    if(_spawnQueue.length === 0){
        return 0;
    }
    let role = _spawnQueue[0];
    //log.debug('role' + role);
    let Spawner = roomProto.getSpawner(room);
    //log.debug(Spawner);
    if(Spawner.spawnCreep(Roles[role].body, newName(role), {memory: {role: role}})){
        _popQueueStart();
    }
};

module.exports.getAllNeededSpawns = function(room){
    let roomCreeps = _.filter(Game.creeps, creep => creep.room.name === room).filter(creep => creep.my);
    //log.debug(roomCreeps);
    if(roomCreeps < roomCreepCount){
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
