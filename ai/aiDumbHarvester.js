/**
 * role for setting up the room, does basic harvesting to allow
 * productioon of the first harvester, builder, and courier
 * and will keep going until it dies off
 */

const action = require('aiActions');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.cP){
            for(let idx in creep.room.sources){
                let source = Game.getObjectById(creep.room.sources[idx].id);
                let closest = source.pos.findClosestByPath(source.getOpenSpots());
                closest.createConstructionSite(STRUCTURE_CONTAINER);
                source.containerPos = closest;
            }
            creep.memory.cP = true;
        }
        if(creep.carry.energy < creep.carryCapacity) {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: consts.colours.path.HARVEST}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: consts.colours.path.HARVEST}});
                }
            }
        }
    }
}