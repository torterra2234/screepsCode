/*
the counts defined here are to be set manually
this allows for full conrol over these counts
although methods for doing this from console
may be implemented later on.
*/

module.exports = {
    'harvester': {
        name: 'Harvester',
        count: 0,
        Ai: require('harvesterAi'),
    },
    'upgrader': {
        name: 'Upgrader',
        count: 0,
        Ai: require('upgraderAi'),
    },
    'builder': {
        name: 'Builder',
        count: 0,
        Ai: require('builderAi'),
    }
};