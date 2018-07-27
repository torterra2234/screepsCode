// descriptor must be an object, got undefined
// but where?

module.exports = function() {
    Room.prototype.getSpawners = function(){
        return this.find(FIND_MY_SPAWNS);
    };
    Room.prototype.getCreeps = function(){
        return _.filter(Game.creeps, function(creep){
            return creep.room.name === this.name;
        })
    };
    Object.defineProperty(Room.prototype,
        'spawnQueue', {
            get: function() {
                if(!this._spawnQueue){
                    if(!this.memory.spawnQueue){
                        this.memory.spawnQueue = [];
                    }
                    this._spawnQueue = this.memory.spawnQueue;
                }
                return this._spawnQueue;
            },
            enumerable: false,
            configurable: true,
    });
    Room.prototype.addToQueue = function(role){
        this.spawnQueue.push(role);
    };
    Room.prototype.spawnedNext = function(){
        this.spawnQueue.shift();
    };
    Room.prototype.spawnNext = function(role){
        this.spawnQueue.unshift(role);
    };
    Room.prototype.getCountInQueue = function(roleType){
        return _.filter(this.spawnQueue, function(role){
            return role === roleTytpe;
        }).length;
    };
    Room.prototype.removeFromQueue = function(delRole, pushToEnd = false){
        let count = this.getCountInQueue(role);
        this.spawnQueue = _.filter(spawnQueue, function(role){
            return role !== delRole;
        });
        if(pushToEnd){
            for(;count > 0;count--){
                this.addToQueue(role);
            }
        }
    };
};