const maths = require('maths');

global.ROOMCOUNT = {};
global.ROOMCOUNT.HARVEST = 1;
global.ROOMCOUNT.UPGRADE = 1;
global.ROOMCOUNT.BUILDER = 1;

global.ROOM_TOTAL = ROOMCOUNT.reduce(maths.add,0);

global.ROLE_HARVEST = 1;
global.ROLE_UPGRADE = 2;
global.ROLE_BUILDER = 3;

global.PATH_HARVEST = '#ffffff'
global.PATH_UPGRADE = '#ff00ff'
global.PATH_BUILDER = '#00ff00'

global.TMPLT_HARVEST = {};
global.TMPLT_HARVEST.TIER1 = [MOVE,WORK,CARRY];

global.TMPLT_UPGRADE = {};
global.TMPLT_UPGRADE.TIER1 = [MOVE,WORK,CARRY];

global.TMPLT_BUILDER = {};
global.TMPLT_BUILDER.TIER1 = [MOVE,WORK,CARRY];