import * as Global from "../functions/GlobalVar"

class Player_parent extends Phaser.Sprite{

  constructor(state, x, y){
    super(state.game, x, y, 'spritePix', 0);

    this.faceLeft=false;
    this.game=state.game;
    this.camera=state.camera;

    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.JumpPressed=false;
    this.UpPressed=false;
    this.DownPressed=false;

    state.game.add.existing(this);
    state.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;
    this.body.bounce.y=0.1;


  }

  addToStage(state){
    state.game.add.existing(this);
    state.game.physics.arcade.enable(this);
  }

  Action(){
    this.body.velocity.x=0;
    if(this.RightPressed)this.goRight();
    else if(this.LeftPressed)this.goLeft();
    else this.stand();

    if(this.JumpPressed)this.jump();
    if(this.AttackPressed)this.attack();
    this.resetFlag();

  }

  resetFlag(){
    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.JumpPressed=false;
    this.UpPressed=false;
    this.DownPressed=false;
    this.overLadder=false;
    this.overRope=false;
  }
//   unmodified
  stand(){
    this.anime.callAll('play', null, 'stand');
  }
  goRight(playAnimate){
    if(this.faceLeft==true){
      this.scale.x*=-1;
      this.faceLeft=false;
    }
    this.body.velocity.x = this.char.Speed;
    if(playAnimate)this.anime.callAll('play', null, 'walk');
  }
  goLeft(playAnimate){
    if(this.faceLeft==false){
      this.scale.x*=-1;
      this.faceLeft=true;
    }
    this.body.velocity.x = -this.char.Speed;
    if(playAnimate)this.anime.callAll('play', null, 'walk');
  }
  jump(){
    this.body.velocity.y = -this.char.Jump;
    this.anime.callAll('play', null, 'jump');
    this.onClimb=false;
  }
  Attack(){

  }

}

export default Player_parent;
