const log = require('logger');
//log.debug('loaded logger');
require('util.errorCodes');
//log.debug('loaded error codes');
const spawnAi = require('spawnLogic');
//log.debug('loader spawnLogic');
const Roles = require('Roles');
//log.debug('loaded Roles');
const maths = require('util.maths');
//log.debug('loaded maths');
var consts = require('util.constants');
//log.debug('loaded constants');
require('prototype.room')();
//log.debug('loaded room prototype');
require('Traveller.js');
//log.debug('loaded Traveller');
//var action = require('aiActions');
var util = require('util.util');

global.roomCreepCount = maths.calcRRC();

module.exports.loop = function(){
    log.debug(Game.time);
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
		log.status('running creep \'' + name + '\'');
		Roles[creep.memory.role].Ai.run(creep);
	}
};