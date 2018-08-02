/**
 * AI for the static Harvester role
 * goes to a source, then lives there
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
                return 'renew';
            }

        }
        if(creep.ticksToLive <= 200){
            creep.memory.dying = true;
            action.renew(creep);
            return ERR_NEEDS_LIFE;
        }
        if(!creep.memory.target){
            const remainingSources = creep.room.getOpenSources();
            log.debug(remainingSources);
            action.assignTarget(creep, remainingSources[0].id);
            log.debug('assigned source: ' + creep.memory.target);
        }
        switch(creep.carry.energy){
            case creep.carryCapacity:
                harvest = action.transferEnergyH(creep);
                log.debug(harvest);
                if(harvest === OK){
                    log.debug('tranfer \'successful\'');
                    return 'transfer';
                }
                new RoomVisual(creep.room.name).circle(creep.pos, {radius: .5, fill: 'transparent', stroke: '#ff0000', opacity: 0.5});
                creep.say('i\'m full!');
                return 'transfer incomplete';
            default:
                if(action.harvest(creep) !== OK){
                    action.goToTarget(creep, Game.getObjectById(creep.memory.target).containerPos, 0);
                    return ERR_NOT_IN_RANGE;
                }
                return 'harvest';
        }
    }
};