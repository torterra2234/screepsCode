module.exports = function() {
    /**
     * Retrieves all spawners in the room
     * @returns {StructureSpawn[]} An array of all spawners in the room
     */
    Room.prototype.getSpawners = function(){
        return this.find(FIND_MY_SPAWNS);
    };
    Room.prototype.getStructures = function(){
        let thisRoom = this;
        return _.filter(Game.structures, Structure, function(structure){
            return structure.room.name === thisRoom.name;
        });
    };
    Room.prototype.getContainers = function(){
        let thisRoom = this;
        return _filter(Game.structures, Structure, function(structure){
            return structure.structureType === STRUCTURE_CONTAINER;
            }).filter(function(structure){
                return structure.room.name === thisRoom.name;
                })
        ;
    };
    Room.prototype.getConstructionSites = function(){
        let thisRoom = this;
        return _.filter(Game.constructionSites, ConstructionSite, function(constructionsSite){
            return constructionsSite.room.name === thisRoom.name;
        });
    };
    Room.prototype.getCreeps = function(){
        let thisRoom = this;
        return _.filter(Game.creeps, function(creep){
            return creep.room.name === thisRoom.name;
        })
    };
    Object.defineProperty(Room.prototype, 'sources', {
        get: function(){
            if(!this._sources){
                if(!this.memory.sources){
                    this.memory.sources = _.map(this.find(FIND_SOURCES), source => source.id);
                }
                this._sources = _.map(this.memory.sources, id => Game.getObjectById(id));
            }
            return this._sources;
        },
        set: function(newValue){
            this._sources = newValue;
            this.memory.sources = _.map(newValue, source => source.id);
        },
        enumerable: false,
        configurable: true
    });
    Room.prototype.checkSources = function(){
        // 'checks' by forcing a recreation next time the value is accessed
        this.memory.sources = undefined;
        this.sources = undefined;
    };
    Object.defineProperty(Room.prototype, 'spawnQueue', {
        get: function() {
            if(!this._spawnQueue){
                if(!this.memory.spawnQueue){
                    this.memory.spawnQueue = ['dumb'];
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
        this.memory.SpawnQueue = this.spawnQueue;
    };
    Room.prototype.spawnedNext = function(){
        this.spawnQueue.shift();
        this.memory.SpawnQueue = this.spawnQueue;
    };
    Room.prototype.spawnNext = function(role){
        this.spawnQueue.unshift(role);
        this.memory.SpawnQueue = this.spawnQueue;
    };
    Room.prototype.getCountInQueue = function(roleType){
        return _.filter(this.spawnQueue, function(role){
            return role === roleType;
        }).length;
    };
    Room.prototype.removeFromQueue = function(delRole, pushToEnd = false){
        let count = this.getCountInQueue(role);
        this.spawnQueue = _.filter(spawnQueue, function(role){
            return role !== delRole;
        });
        this.memory.SpawnQueue = this.spawnQueue;
        if(pushToEnd){
            for(;count > 0;count--){
                this.addToQueue(role);
            }
        }
    };
};