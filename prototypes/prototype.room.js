module.exports = function() {
    Object.defineProperty(Room.prototype, {
        'spawners': {
            get: function() {
                if(this.spawners) return this.spawners;
            },
            set: function(newValue){
                this.spawers = newValue;
            },
            enumerable: false,
            configurable: true,
        },
    });
    Room.prototype.getCreeps = function(){
        return _.filter(Game.creeps, function(creep){
            return creep.room.name === this.name;
        })
    };
    Object.defineProperty(Room.prototype, {
        'spawnQueue': {
            get: function() {
                if(this.spawnQueue) return this.spawnQueue;
            }
        },
        enumerable = false,
        configurable = true,
    });
    Room.protoype.addToQueue = function(role){
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
        this.spawnQueue = _.filter(_spawnQueue, function(role){
            return role !== delRole;
        });
        if(pushToEnd){
            for(;count > 0;count--){
                this.addToQueue(role);
            }
        }
    };
};