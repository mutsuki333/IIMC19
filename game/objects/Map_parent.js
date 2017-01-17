import * as Global from "../functions/GlobalVar"
import Func from "../functions/func"

class Map_parent {
  constructor(state){
    this.state = state;
    let bg = state.game.add.sprite(0, 0, Global.MapInfo.bg[0]);
    bg.scale.setTo(Global.MapInfo.bg[1]);
    bg.fixedToCamera = true;

    this.map = state.game.add.tilemap('tilemap');
    for (const pix of Global.MapInfo.source){
      this.map.addTilesetImage(pix,pix);
    }

    this.base = this.map.createLayer('base');
    this.base.resizeWorld();

    this.collide = this.map.createLayer('collide');
    for (let i=1;i<=Global.MapInfo.Layers;i++){
      this.map.createLayer('layer'+i);
    }

    this.monsBound = map.createLayer('monsBound');

    map.setCollisionByExclusion([0], true, this.base);
    map.setCollisionByExclusion([0], true, this.monsBound);
    map.setCollisionByExclusion([0], true, this.collide);
    Func.setTileCollisionForAll(this.collide, {
      top: true,
      bottom: false,
      left: false,
      right: false
    })
    state.game.physics.arcade.TILE_BIAS = 20


    this.born.x=Global.MapInfo.TransPoint[0][0];
    this.born.y=Global.MapInfo.TransPoint[0][1];
  }

  createTop(){
    this.map.createLayer('top');
  }

}

export default Map_parent;
