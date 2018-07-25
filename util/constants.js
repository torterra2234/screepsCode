const maths = require('maths');

module.exports = {};

module.exports.roles = {
    HARVEST: 1,
    UPGRADE: 2,
    BUILDER: 3,
};

module.exports.units = {
    roomCount: {
    HARVEST: 1,
    UPGRADE: 1,
    BUILDER: 1,
    TOTAL: 3,
    },
};

module.exports.colours = {
    path: {
    HARVEST: '#ffffff',
    UPGRADE: '#ff00ff',
    BUILDER: '#ffff00',
    ATTACKER: '#ff0000',
    DEFENDER: '#0000ff',
    HEALER: '#00ff00',
    RANGER: '#00ffff',
    RANGEDHEALER: '#00ff88',
    },
};

module.exports.templates = {
    harvest: {
        TIER1: [MOVE,WORK,CARRY],
    },
    upgrade: {
        TIER1: [MOVE,WORK,CARRY],
    },
    builder: {
        TIER1: [MOVE,WORK,CARRY],
    },
};