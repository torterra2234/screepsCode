const log = require('log');
const roleHarvest = require('roleHarvest');
const roleUpgrade = require('roleUpgrade');
const roleBuilder = require('roleBuilder');

const Harvester = new Role('Harvester', 1, 'harvesterAi');

module.exports.loop = function(){

	// deleting old creeps
	// needs forcibly automating later if possible
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            log.debug('deleting unit \'' + name + '\'');
        }
	}
	// creep create code
	
	// creep move loop
	for(let name in Game.creeps){
		unit = Game.creeps[name];
		switch(unit.memory.role){
			case ROLE_HARVEST:
				log.debug('running harvester \'' + name + '\'');
				roleHarvest.run(unit);
				break;
			case ROLE_UPGRADE:
				log.debug('running upgrader \'' + name + '\'');
				roleUpgrade.run(unit);
				break;
			case ROLE_BUILDER:
				log.debug('running builder \'' + name + '\'');
				roleBuilder.run(unit);
				break;
			default:
				debug.error('Creep \'' + name + '\'has invalid role ' + unit.memory.role);
				break;
			
		}
	}
}