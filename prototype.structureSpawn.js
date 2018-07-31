module.exports = function(){
    Object.defineProperty(StructureSpawn.prototype, 'renewQueue', {
        get: function(){
            if(!this._renewQueue){
                if(!this.memory.renewQueue){
                    this.memory.renewQueue = [];
                }
                this._renewQueue = this.memory.renewQueue;
            }
            return this._renewQueue;
        }
    });

    StructureSpawn.prototype.addToRenewQueue = function(creepName){
        if(!this.renewQueue.includes(creepName)){
            this.renewQueue.push(creepName);
            this.memory.renewQueue = this.renewQueue;
        }
    };

    StructureSpawn.prototype.renewFromQueue = function(){
        if(this.renewCreep(Game.creeps[this.renewQueue[0]]) === ERR_FULL){
            this.renewQueue.shift(); 
        }
        this.renewCreep(Game.creeps[this.renewQueue[0]]);
    }

    Object.defineProperty(StructureSpawn.prototype, 'cooldown', {
        get: function(){
            if(!this._cooldown){
                if(!this.memory.cooldown){
                    this.memory.cooldown = 0;
                }
                this._cooldown = this.memory.cooldown;
            }
            return this._cooldown;
        },
        set: function(newValue){
            this.memory.cooldown = newValue;
            this._cooldown = newValue;
        }
    });
}