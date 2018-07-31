module.exports = function() {
    /**
     * Retrieves all spawners in the room
     * @returns {StructureSpawn[]} An array of all spawners in the room
     */
    Room.prototype.getSpawners = function(){
        return this.find(FIND_MY_SPAWNS);
    };
    Room.prototype.getExtentions = function(){
        return this.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
    };
    Room.prototype.getSpawnEnergyProviders = function(){
        log.debug(this.find(FIND_STRUCTURES));
        return this.find(FIND_STRUCTURES).filter(function(structure){
            log.debug('structure: ' + structure);
            log.debug('structureType: ' + structure.structureType);
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType ==  STRUCTURE_SPAWN)
        });
    }
    Room.prototype.getStructures = function(){
        return this.find(FIND_STRUCTURES);
    };
    /**
     * Get array of construction sites
     * @returns {ConstructionSite[]} Array of Construction site IDs
     */
    Room.prototype.getConstructionSites = function(){
        return this.find(FIND_CONSTRUCTION_SITES);
    };
    Room.prototype.getCreeps = function(){
        let thisRoom = this;
        return _.filter(Game.creeps, function(creep){
            return creep.room === thisRoom.name;
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
    /**
     * Gets the remaining untapped sources in the room
     * @returns {StructureSource[]} list of sources
     */
    Room.prototype.getOpenSources = function(){
        //i mean, it's on gitHub, should probably just return true :P
        let sourceIDs = [];
        for(let name in this.getCreeps){
            const creep = Game.creeps[name];
            if(creep.role = 'h'){
                sourceIDs.push(creep.memory.target);
            }
        }
        return this.sources.filter(source => !sourceIDs.includes(source.id));
    }
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
        this.memory.spawnQueue = this.spawnQueue;
    };
    Room.prototype.spawnedNext = function(){
        this.spawnQueue.shift();
        this.memory.spawnQueue = this.spawnQueue;
    };
    Room.prototype.spawnNext = function(role){
        this.spawnQueue.unshift(role);
        this.memory.spawnQueue = this.spawnQueue;
    };
    Room.prototype.getCountInQueue = function(roleType){
        return _.filter(this.spawnQueue, function(role){
            return Roles[role].name === Roles[roleType].name;
        }).length;
    };
    Room.prototype.removeFromQueue = function(delRole, pushToEnd = false){
        let count = this.getCountInQueue(role);
        this.spawnQueue = _.filter(spawnQueue, function(role){
            return role !== delRole;
        });
        this.memory.spawnQueue = this.spawnQueue;
        if(pushToEnd){
            for(;count > 0;count--){
                this.addToQueue(role);
            }
        }
    };
};