import * as Global from "../functions/Global"

class MonsterChild extends Phaser.Sprite{
  constructor(game, x, y, key, frame){
    super(game, x, y, key, frame);
    this.game = game;

    this.LeftPressed=false;
    this.RightPressed=false;
    this.JumpPressed=false;
    this.standFrame = 2;

    this.friction=50;
    this.speed=150;
    this.jump=250;

    // this.events.onRevived.add(this.resetFlag);
  }
  pattern(){
    let rand = this.game.rnd.frac()*100;
    if(rand>75)this.RightPressed=true;
    else if(rand>33)this.LeftPressed=true;

    rand = this.game.rnd.frac()*100;
    if(rand>80)this.JumpPressed=true;

  }
  resetFlag(){
    this.LeftPressed=false;
    this.RightPressed=false;
    this.JumpPressed=false;

    let rand = this.game.rnd.frac()*100;
    if(rand>70)this.RightPressed=true;
    else if(rand>40)this.LeftPressed=true;
    rand = this.game.rnd.frac()*100;
    if(rand>80)this.JumpPressed=true;
    if(this.alive)setTimeout(()=>{this.resetFlag();},500);
  }

  resist(){
    if(this.body.velocity.x==0)return;
    if(this.body.velocity.x>0) {
      this.body.velocity.x = (this.body.velocity.x-this.friction)<0?0:(this.body.velocity.x-this.friction);
    }
    if(this.body.velocity.x<0) {
      this.body.velocity.x = (this.body.velocity.x+this.friction)>0?0:(this.body.velocity.x+this.friction);
    }
  }

  Action(){
    if(!this.alive)return;
    this.resist();

    if(this.RightPressed){
      this.animations.play('right');
      this.body.velocity.x = this.body.velocity.x+this.speed>this.speed?this.speed:this.body.velocity.x+this.speed;
    }
    else if(this.LeftPressed){
      this.animations.play('left');
      this.body.velocity.x = this.body.velocity.x-this.speed<-this.speed?-this.speed:this.body.velocity.x-this.speed;
    }
    else {
      this.animations.stop();
      this.frame = this.standFrame;
    }
    if(this.JumpPressed && this.body.onFloor())this.body.velocity.y=-this.jump;
    return;
  }

  goLeft(){
    this.body.velocity.x=-100;
  }

}

export default MonsterChild;
