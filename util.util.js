/**
 * arbitrary utility functions
 */


module.exports.getOpenSource = function(room){
    for(let id in room.sources){
        let open = Game.getObjectById(id).getOpenSpotCount();
        open -= _.filter(room.getCreeps, creep => creep.memory.targetMain === id);
        if(open > 0){
            return id
        }
    }
    return ERR_FULL;
};

module.exports.findMainTarget = function(role){
    switch(Roles[role].name){
        case 'harvester':
            return this.getOpenSource(creep.room, true);
        default:
            return ERR_INVALID_ARGS;
    }
};