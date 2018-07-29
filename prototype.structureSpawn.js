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
        this.renewQueue.push(creepName);
        this.memory.renewQueue = this.renewQueue;
    };

    StructureSpawn.prototype.renewFromQueue = function(){
        if(this.renewCreep(Game.creeps[this.renewQueue[0]]) === ERR_FULL){
            this.renewQueue.shift();
            
        }
    }
}