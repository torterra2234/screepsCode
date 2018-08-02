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
        if(!creep.memory.tS){
            creep.memory.tS = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, STRUCTURE_SPAWN)).id;
        }
        let targetSpawn = Game.getObjectById(creep.memory.tS);
        if(creep.pos.getRangeTo(targetSpawn.pos) > 1){
            creep.travelTo(targetSpawn.pos);
            return ERR_NOT_IN_RANGE;
        } else {
            targetSpawn.addToRenewQueue(creep.name);
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

    transferEnergyH: function(creep){
        container = creep.room.lookForAt(LOOK_STRUCTURES, Game.getObjectById(creep.memory.target).containerPos);
        if(container instanceof StructureContainer){
            log.debug('empty is instance of?');
            return creep.transfer(container,RESOURCE_ENERGY, container.storeCapacity - container.store[RESOURCE_ENERGY]);
        }
        container = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, Game.getObjectById(creep.memory.target).containerPos);
        log.debug(container);
        if(creep.build(container) === ERR_INVALID_TARGET){
            if(this.moveOff(creep) === OK){
               return creep.moveTo(Game.getObjectById(creep.memory.target).pos, {flee:true});
            }
            return ERR_INVALID_TARGET;
        }
        return creep.build(container);
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
        range = (range === 0 ?  0 : range || 1);
        return creep.travelTo(target,{range: range});
    },

    /**
     * Nasty function for getting a creep OFF a tile forcibly
     */
    moveOff: function(creep){
        if(creep.move(TOP_LEFT) !== OK){
            if(creep.move(TOP) !== OK){
                if(creep.move(TOP_FIGHT) !== OK){
                    if(creep.move(RIGHT) !== OK){
                        if(creep.move(BOTTOM_RIGHT) !== OK){
                            if(creep.move(BOTTOM) !== OK){
                                if(creep.move(BOTTOM_LEFT) !== OK){
                                    if(creep.move(LEFT) !== OK){
                                        return ERR_NO_PATH;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return OK;
    }
}