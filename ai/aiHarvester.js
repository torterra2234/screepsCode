/**
 * AI for the static Harvester role
 * goes to a source, then lives there
 */

 /**
  * needs to use some form of internal neededs heals flag
  * should not EVER go back to the spawn to recharge
  * 
  * turn out this works differently, will have to check options for this
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
        switch(creep.carry.energy){
            case creep.carryCapacity:
                // this needs redoing to use a container
                if(action.transferEnergy(creep) === OK){
                    return 'transfer';
                }
                new RoomVisual(creep.room.name).circle(creep.pos, {radius: .6, fill: 'transparent', stroke: '#ff0000', opacity: 0.5});
                creep.say('i\'m full!');
                return 'transfer incomplete';
            case 0:
                if(creep.ticksToLive <= 200){
                    actions.renew(creep);
                    creep.memory.dying = true;
                    return 'renew';
                }
            default:
                if(action.harvest(creep) !== OK){
                    action.goToTarget(creep, Game.getObjectById(creep.memory.target).containerPos, 0);
                    return ERR_NOT_IN_RANGE;
                }
                return 'harvest';
        }
    }
};