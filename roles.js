// expanded roles file, to replace current version once ready

 //counts eventually need to be moved to the room prototype, potentially as a fetch, rather than fully assigned

module.exports = {
    'dumb': {
        name: 'DHAR',
        count: 0,
        Ai: require('aiDumbHarvester'),
        body: [WORK,CARRY,MOVE],
    },
    'h': {
        name: 'HARV',
        count: 1,
        Ai: require('aiHarvester'),
        body: [WORK,WORK,CARRY,MOVE],
    },
    'c': {
        name: 'CARR',
        count: 1,
        Ai: require('aiCourier'),
        body: [CARRY,CARRY,MOVE],
    },
    'u': {
        name: 'UPGR',
        count: 1,
        Ai: require('aiUpgrader'),
        body: [WORK,CARRY,MOVE],
    },
    'b': {
        name: 'BUIL',
        count: 1,
        Ai: require('aiBuilder'),
        body: [WORK,CARRY,MOVE],
    },
    /*
    'a': {
        name: 'ATT',
        count: 1,
        Ai: require('aiAttacker'),
        body: [ATTACK,CARRY,MOVE],
    },
    'h': {
        name: 'HLR',
        count: 1,
        Ai: require('aiHealer'),
        body: [HEAL,CARRY,MOVE],
    },
    'r': {
        name: 'RNG',
        count: 1,
        Ai: require('aiRanged'),
        body: [RANGED,CARRY,MOVE],
    },
    /*
    future possible roles
    't': {
        name: 'TNK',
        count: 0,
        Ai: require('aiTank'),
        body: [TOUGH,TOUGH,MOVE],
    },
    */
};