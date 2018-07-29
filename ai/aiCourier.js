/**
 * AI for the Courier role
 * Moves between static bots to provide energy where needed
 * Will also move energy to the spawn/extentions/turrets/stores
 */

const action = require('aiActions');

module.exports = {
    /**
     * Runs the AI for this role
     * @param {creep} creep The creep to run
     * @returns {Int} Value based on task undertaken
     */
    run: function(creep){
        if(creep.memory.dying){
            if(creep.ticksToLive === CREEP_LIFE_TIME){
                creep.memory.dying = false;
            } else {
                action.renew(creep);
                return ERR_NEEDS_LIFE;
            }

        }
        if(creep.ticksToLive <= 200){
            creep.memory.dying = true;
            action.renew(creep);
            return ERR_NEEDS_LIFE;
        }
        if(!creep.memory.target){
            for(let name in creep.room.getCreeps()){
                let unit = Game.creeps[name];
                if(unit.memory.needsEnergy){
                    action.assignTarget(creep, unit.id);
                    break;
                }
            }
        }
        target = Game.getObjectById(creep.memory.target);
        if(creep.carry.energy < target.carryCapacity){
            if(action.withdrawEnergy(creep) === ERR_NOT_IN_RANGE){
                action.goToValidContainer(creep);
                return ERR_NOT_IN_RANGE;
            }
            return ERR_NOT_ENOUGH_ENERGY;
        }
        if(action.transferToCreep(creep) === ERR_NOT_IN_RANGE){
            action.goToTarget(creep);
            return ERR_NOT_IN_RANGE;
        }
        return OK;
    }
}