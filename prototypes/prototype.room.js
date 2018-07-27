module.exports = function(){
    Object.defineProperty(Room.prototype, 'creeps',{
        get: function(){
            return _.filter(Game.creeps, creep => creep.room.name === room.name);
        },
        enumerable: false,
        configurable: true,
    });
};
/*
    Room.prototype._getSpawn = function(){
        return Game.spawns.filter(creep => Game.spawns.room == room);
    };

    Room.prototype.setSpawners = function(){
        this._spawners = this._getSpawn();
    };

    Room.prototype.getSpawners = function(){
        return this._spawners;
    };
};
*/

//will revisit this at a later time, will not run...