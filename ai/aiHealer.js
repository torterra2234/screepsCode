/**
 * AI for the Healer role
 * Will need to seek out creeps with 'low' (%TBD) health and fix them
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
        } else {
            if(creep.ticksToLive <= 200){
                creep.memory.dying = true;
                actions.renew(creep);
                return ERR_NEEDS_LIFE;
            }
        }
        if(!creep.target){
            for(let name in Game.creeps){
                unit = Game.creeps[name];
                if(unit.memory.needsHP){
                    assignTarget(creep, unit.id);
                }
            }
        }
        switch(action.heal(creep)){
            case ERR_NOT_IN_RANGE:
                action.goToTarget(creep);
                return ERR_NOT_IN_RANGE;
            case OK:
                return OK;
            case ERR_FULL:
                creep.memory.target = undefined;
                return ERR_FULL;
            default:
                return ERR_UNKNOWN;
        }
        
    }
};