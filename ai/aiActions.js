/**
 * Functions for possible actions of any given creep, to keep them local
 * will likely need to move MOve actions to a second folder, i'm sure we'll end up with...a few...
 */

module.exports = {
    assignTarget: function(creep, target, isID = true){
        if(isID){
            return creep.memory.target = target;
        } else {
            creep.memory.target = target.id;
        }
    },

    renew: function(creep){
        let targetSpawn = creep.room.find(FIND_STRUCTURES, STRUCTURE_SPAWN)[0];
        if(creep.pos.getRangeTo(targetSpawn.pos) > 1){
            creep.travelTo(targetSpawn.pos);
            return ERR_NOT_IN_RANGE;
        }

    },

    harvest: function(creep){
        return creep.harvest(Game.getObjectById(creep.memory.target));
    },

    upgrade: function(creep){
        return creep.upgradeController(Game.getObjectById(creep.memory.target));
    },

    repair: function(creep){
        return creep.repair(Game.getObjectById(creep.memory.target));
    },

    build: function(creep){
        return creep.build(Game.getObjectById(creep.memory.target));
    },

    heal: function(creep){
        target = Game.getObjectById(creep.memory.target);
        if(!target.needsHP){
            return ERR_FULL;
        }
        return creep.heal(target);
    },

    // this needs improving to push top a given courier
    // x/y of energy requester in memory? sounds like alot, but can clear once transferred
    transferEnergy: function(creep){
        let x = creep.pos.x;
        let y = creep.pos.y;
        let courier = creep.room.lookForAtArea(LOOK_CREEP, x-1, y-1, x+1, y+1, true)[0];
        return creep.transfer(courier, RESOURCE_ENERGY, courier.carryCapacity - courier.carry.energy);
    },

    goToTarget: function(creep){
        return creep.travelTo(Game.getObjectById(creep.memory.targetCurr).pos);
    }
}