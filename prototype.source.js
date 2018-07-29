module.exports = function(){
    Source.prototype.getOpenSpots = function(){
        let x = this.pos.x;
        let y = this.pos.y;
        return this.room.lookForAtArea(LOOK_TERRAIN, x-1, y-1, x+1, y+1, true).filter(terrain, function(terrain){
            return terrain !== 'wall';
        });
    }
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