const consts = require('constants');

module.exports = {
    getBody: function(room, role){
        //get room max energy
        let roomEnergy = 300;
        let tier = 0;
        if(roomEnergy <= consts.tiers.T1){
            tier = 1
        };
        switch(tier){
            case(consts.tiers.T1):
                return tier1(role);
                break;
            default:
                log.error('impossible energy maximum in room \'' + room.name + '\'');
                return ERR_NOT_ENOUGH_ENERGY;
        }
    }

};

function tier1(role){
    switch(role){
        case(consts.roles.names.HARVEST):
            return [WORK,CARRY,MOVE];
        default:
            return [WORK,CARRY,MOVE];
    }
}