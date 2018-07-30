/**
 * Functions for possible actions of any given creep, to keep them local
 * will likely need to move MOve actions to a second folder, i'm sure we'll end up with...a few...
 */

module.exports = {
    /**
     * Assigns a target to a creep.
     * @param {Creep} creep The creep to have its target assigned
     * @param {String|Numeric} target The target RoomObject or ID
     * @param {boolean} [isID=true] Is target an ID value
     */
    assignTarget: function(creep, target, isID = true){
        if(isID){
            creep.memory.target = target;
        } else {
            creep.memory.target = target.id;
        }
    },

    /**
     * Makes creep attempt to renew itself. UNFINISHED!
     * @param {Creep} creep The creep that needs renewing
     * @returns {int} Status code of action taken
     */
    renew: function(creep){
        let targetSpawn = creep.room.find(FIND_STRUCTURES, STRUCTURE_SPAWN)[0];
        if(creep.pos.getRangeTo(targetSpawn.pos) > 1){
            creep.travelTo(targetSpawn.pos);
            return ERR_NOT_IN_RANGE;
        }

    },

    /**
     * Makes creep try to harvest from target Source
     * @param {Creep} creep The creep attempting to harvest
     * @returns {Integer} Status code of action taken
     */
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

    withdrawEnergy: function(creep){
        return creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
    },

    /**
     * Transfers to creep in memory
     * @param {Creep} creep Creep doing the trasfer
     * @returns {number} status code of action
     */
    transferToCreep: function(creep){
        let target = Game.getObjectById(creep.memory.target);
        return creep.transfer(target, RESOURCE_ENERGY, target.carryCapacity - target.carry.capacity);
    },

    /**
     * Transfers to Object, creep or structure
     * @param {Creep} creep Creep doing the transfer
     * @returns {number} status code of action
     */
    transferToObject: function(creep){
        let target = Game.getObjectById(creep.memory.target);
        return creep.transfer(target, RESOURCE_ENERGY, target.energyCapacity - target.energy);
    },
    /**
     * Sends creep towards a target location
     * @param {Creep} creep Creep to move
     * @param {RoomPosition} [target=memorised target] Target position
     * @param {number} [range=1] How close the creep must be to qualify as there 
     */
    goToTarget: function(creep, target, range){
        target = target || Game.getObjectById(creep.memory.target).pos;
        range = range || 1;
        return creep.travelTo(target, {range: range});
    }
}