import * as Global from "../functions/Global"
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
    this.map.createLayer('layer');

    this.monsBound = this.map.createLayer('monsBound');


    this.map.setCollisionByExclusion([0], true, this.base);
    this.map.setCollisionByExclusion([0], true, this.monsBound);
    this.map.setCollisionByExclusion([0], true, this.collide);
    Func.setTileCollisionForAll(this.collide, {
      top: true,
      bottom: false,
      left: false,
      right: false
    })
    state.game.physics.arcade.TILE_BIAS = 20


    for (let i in Global.MapInfo.TransPoint){
      if(i=='0')continue;
      if(Global.MapInfo.TransPoint[i][2] == Global.fromMap){
        this.bx=Global.MapInfo.TransPoint[0][0];
        this.by=Global.MapInfo.TransPoint[0][1];
      }
    }

    this.trans = state.add.group();
    for (let i in Global.MapInfo.TransPoint){
      if(i=='0')continue;
      let transBody = state.game.add.sprite(Global.MapInfo.TransPoint[i][0],Global.MapInfo.TransPoint[i][1],'trans');
      transBody.name=i;
      state.game.physics.arcade.enable(transBody);
      transBody.scale.setTo(0.5);
      if(Global.MapInfo.TransPoint[i][3]==false)transBody.kill();
      this.trans.add(transBody);
    }

  }

  transGrayish(){
    this.trans.forEachAlive((child)=>{
      if(!Global.MapInfo.TransPoint[child.name][3])child.alpha=0.5;
    },this);
  }
  showTrans(){
    this.trans.forEachDead((child)=>{child.revive()},this);
  }

  createTop(){
    this.map.createLayer('top');
  }

}

export default Map_parent;
