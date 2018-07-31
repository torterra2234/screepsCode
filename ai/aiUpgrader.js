/**
 * AI for the Upgrader role
 * essentially a very specialised builder, will simply sit outside of the controller and throw energy at it
 * may move this to a sub-class of courier, we'll see
 */

const action = require('aiActions');

module.exports = {
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
        if(creep.carry.energy <= creep.getActiveBodyparts(WORK)*20){
            if(creep.ticksToLive <= 200){
                actions.renew(creep);
                creep.memory.dying = true;
                return 'renew';
            }
            creep.memory.needEnergy = true;
        }
        if(creep.carry.energy > 0){
            if(action.upgrade(creep) === ERR_NOT_IN_RANGE){
                action.goToTarget(creep);
                return ERR_NOT_IN_RANGE;
            }
        } else {
            new RoomVisual(creep.room.name).circle(creep.pos, {radius: .5, fill: 'transparent', stroke: '#ff0000', opacity: 0.5});
            creep.say('need ⚡');
            return ERR_NOT_ENOUGH_ENERGY;
        }
    }
};