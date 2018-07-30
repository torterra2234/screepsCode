module.exports = function(){
    Source.prototype.getOpenSpots = function(){
        thisSource = this;
        let x = this.pos.x;
        let y = this.pos.y;
        return this.room.lookForAtArea(LOOK_TERRAIN, y-1, x-1, y+1, x+1, true).filter(function(idx){
            return idx.terrain !== 'wall';
            }).map(function(idx){
                return new RoomPosition(idx.x, idx.y, thisSource.room.name);
                })
        ;
    }

    /**
     * allows for use of memory on the source
     */
    Object.defineProperty(Source.prototype, 'memory', {
        get: function(){
            if(_.isUndefined(Memory.sources)){
                Memory.sources = {};
            }
            return Memory.sources[this.id] = Memory.sources[this.id] || {};
        },
        set: function(newValue){
            if(_.isUndefined(Memory.sources)){
                Memory.sources = {};
            }
            Memory.sources[this.id] = newValue;
        }
    });

    Object.defineProperty(Source.prototype, 'containerPos', {
        get: function(){
            if(!this._cP){
                if(!this.memory.cP){
                    this.memory.cP = 0;
                }
                this._cP = this.memory.cP;
            }
            return new RoomPosition(this._cP & 0x3F, this._cP >> 6, this.room.name);
        },
        set: function(newPos){
            /**
             * code for storing location (0-49) as a character
             * uses x pos as is, stores y pos shifted 6 bits (63)
             */
            this._cP = newPos.x + (newPos.y << 6);
            this.memory.cP = newPos.x + (newPos.y << 6);
        }
    });
}