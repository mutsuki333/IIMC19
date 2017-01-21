import * as Global from "../functions/Global"
import MonsterChild from "./MonsterChild"

//import Player_parent from '../objects/Player_parent';

class Monster_parent extends Phaser.Group{
  constructor(state){
    super(state.game);
    this.game=state.game;
    state.game.add.existing(this);
    state.game.physics.arcade.enable(this);

    this.standFrame=Global.MonsInfo.stand;
    this.round=0;
    this.ctr=1;

    this.speed=150;
    this.jump=250;
    this.bounce=0.1;
    this.gravity=500;
    this.size=1;
    this.friction=50;
    this.opacity=1;
  }
  reborn(){
    ++this.ctr;
    if(this.ctr>this.round)this.ctr=1;
    this.forEachDead((b)=>{
      if(b.name == this.ctr){
        b.revive();
        b.resetFlag();
      }
    });
    setTimeout(()=>{this.reborn();}, 5000);
  }

  setupMons(){
    ++this.round;
    this.forEach((b)=>{
      if(b.name<this.round);
      else{
        this.game.physics.arcade.enable(this);
        b.anchor.setTo(0.5, 0.5);
        b.body.collideWorldBounds = true;
        b.name=this.round;
        b.standFrame = this.standFrame;
        b.friction = this.friction;
        b.speed = this.speed;
        b.jump = this.jump;

        b.animations.add('left', Global.MonsInfo.left, 10, true);
        b.animations.add('right', Global.MonsInfo.right, 10, true);

        b.scale.setTo(this.size);
        b.body.gravity.y = this.gravity;
        b.body.bounce.y = this.bounce;
        b.alpha = this.opacity;
        b.kill();
      }
    });

  }

  Action(){
    this.forEachAlive((b)=>{
      b.Action();
    });
  }

}

export default Monster_parent;
