/*const roleHarvest = require('roleHarvest');
const roleUpgrade = require('roleUpgrade');
const roleBuilder = require('roleBuilder');*/

/*
the counts defined here are to be set manually
this allows for full conrol over these counts
although methods for doing this from console
may be implemented later on.
*/

module.exports = {
    'harvester': {
        name: 'Harvester',
        count: 1,
        Ai: require('roleHarvest'),
        body: [WORK,CARRY,MOVE],
    },
    'upgrader': {
        name: 'Upgrader',
        count: 1,
        Ai: require('roleUpgrade'),
        body: [WORK,CARRY,MOVE],
    },
    'builder': {
        name: 'Builder',
        count: 1,
        Ai: require('roleBuilder'),
        body: [WORK,CARRY,MOVE],
    }
};