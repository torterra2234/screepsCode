/**
 * AI for the Builder role
 * Will move to a point near a buildable structure and stay uintil built
 * Will receive energy from Couriers during the process
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
            log.debug('dying!');
            creep.memory.dying = true;
            action.renew(creep);
            return ERR_NEEDS_LIFE;
        }
        if(!creep.memory.target){
            log.debug('flag1');
            const roomStructs = creep.room.getStructures();
            log.debug('flag2');
            for(let idx in roomStructs){
                //log.debug('flag3');
                const structure = roomStructs[idx];
                //log.debug('structure ' + idx+ ': ' + structure);
                if(structure.hits <= 0.25*structure.maxHits){
                    log.debug(structure + ' needs repairs');
                    action.assignTarget(creep, structure.id);
                    creep.memory.repair = true;
                    break;
                }
            }
            log.debug('flag3');
            roomSites = creep.room.getConstructionSites();
            log.debug(roomSites);
            //this NEEDS a priority system later on
            action.assignTarget(creep, roomSites[0].id);
            log.debug(creep.memory.target);
        }
        switch(creep.carry.energy){
            case 0:
                new RoomVisual(creep.room.name).circle(creep.pos, {radius: .5, fill: 'transparent', stroke: '#ff0000', opacity: 0.5});
                creep.say('need ⚡');
                return ERR_NOT_ENOUGH_ENERGY;
            case creep.carryCapacity:
                creep.memory.needEnergy = false;
            default:
                if(creep.memory.repair){
                    if(creep.carry.energy <= creep.getActiveBodyparts(WORK)*20){ //20 ticks worth
                        creep.memory.needEnergy = true;                        
                    }
                    if(action.repair(creep) === ERR_NOT_IN_RANGE){
                        action.gotToTarget(creep);
                        return ERR_NOT_IN_RANGE;
                    }
                    return OK;
                } else {
                    if(creep.carry.energy <= creep.getActiveBodyparts(WORK)*100){ //20 ticks worth
                        creep.memory.needEnergy = true;                       
                    }
                    if(action.build(creep) === ERR_NOT_IN_RANGE){
                        action.gotToTarget(creep);
                        return ERR_NOT_IN_RANGE;
                    }
                    return OK;
                }
        }
    }
};