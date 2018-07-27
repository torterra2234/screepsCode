const log = require('logger');
const spawnAi = require('spawnLogic');
const Roles = require('Roles');
const maths = require('maths');

global.roomCreepCount = maths.calcRRC();

module.exports.loop = function(){
    //log.debug(roomCreepCount);
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
	for(let room in Game.rooms){
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