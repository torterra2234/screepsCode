// expanded roles file, to replace current version once ready

 //counts eventually need to be moved to the room prototype, potentially as a fetch, rather than fully assigned

module.exports = {
    'dumb': {
        name: 'DumbHarvester',
        count: 0,
        Ai: require('aiDumbHarvester'),
        body: [WORK,CARRY,MOVE],
    },
    'h': {
        name: 'Harvester',
        count: 1,
        Ai: require('aiHarvester'),
        body: [WORK,WORK,CARRY,MOVE],
    },
    'c': {
        name: 'Courier',
        count: 2,
        Ai: require('aiCourier'),
        body: [CARRY,CARRY,MOVE],
    },
    'u': {
        name: 'Upgrader',
        count: 1,
        Ai: require('aiUpgrader'),
        body: [WORK,CARRY,MOVE],
    },
    'b': {
        name: 'Builder',
        count: 1,
        Ai: require('aiBuilder'),
        body: [WORK,CARRY,MOVE],
    },
    'a': {
        name: 'Coal',
        count: 1,
        Ai: require('aiAttacker'),
        body: [ATTACK,CARRY,MOVE],
    },
    'h': {
        name: 'Healer',
        count: 1,
        Ai: require('aiHealer'),
        body: [HEAL,CARRY,MOVE],
    },
    'r': {
        name: 'Ranged',
        count: 1,
        Ai: require('aiRanged'),
        body: [RANGED,CARRY,MOVE],
    },
    /*
    future possible roles
    't': {
        name: 'tank',
        count: 0,
        Ai: require('aiTank'),
        body: [TOUGH,TOUGH,MOVE],
    },
    */
};