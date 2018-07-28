module.exports = function(){
    Source.prototype.getOpenSpotCount = function(){
        let x = this.pos.x;
        let y = this.pos.y;
        return this.room.lookForAtArea(LOOK_TERRAIN, x-1, y-1, x+1, y+1, true).filter(terrain, function(terrain){
            return terrain !== 'wall';
        });
    }
}