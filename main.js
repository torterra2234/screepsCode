log = require('logger');
//log.debug('loaded logger');
require('util.errorCodes');
//log.debug('loaded error codes');
const spawnAi = require('spawnLogic');
//log.debug('loader spawnLogic');
Roles = require('rolesEx');
//log.debug('loaded Roles');
maths = require('util.maths');
//log.debug('loaded maths');
consts = require('util.constants');
require('util.errorCodes');
//log.debug('loaded constants');
require('prototype.room')();
require('prototype.source')();
require('prototype.structureSpawn')();
//log.status('loaded prototypes');
require('Traveler');
//log.debug('loaded Traveller');
//var action = require('aiActions');
util = require('util.util');

global.roomCreepCount = maths.calcRRC();

module.exports.loop = function(){
    //log.status(Game.time);
	// deleting old creeps
	// needs forcibly automating later if possible
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            log.status('deleting unit \'' + name + '\'');
        }
	}
	// creep create code
	//need code for checking spawner is unoccupied, per room
	for(let name in Game.rooms){
		let room = Game.rooms[name];
		if(Game.time%10 === 0){
			spawnAi.getAllNeededSpawns(room);
		}
		spawnAi.spawnNext(room);
	}

	
	// creep move loop
	for(let name in Game.creeps){
		let creep = Game.creeps[name];
		//log.status('running creep \'' + name + '\'');
		Roles[creep.memory.role].Ai.run(creep);
	}
};