import * as Global from "../functions/Global"

class Player_parent extends Phaser.Sprite{

  constructor(state, x, y){
    super(state.game, x, y, 'spritePix', 0);

    this.faceLeft=false;
    this.game=state.game;
    this.camera=state.camera;

    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.SkillPressed=false
    this.JumpPressed=false;
    this.skilled=false;

    this.speed=150;
    this.jump=250;
    this.bounce=0.1;
    this.gravity=500;
    this.size=1;
    this.friction=50;
    this.opacity=1;

    this.bulletSpeed = 600;
    this.fireRate = 100;
    this.bulletGravity = 0;
    this.bulletSize = 1;

    this.superMode = false;


    this.skill_ = undefined;


    state.game.add.existing(this);
    state.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);
    this.body.collideWorldBounds = true;

    this.animations.add('left', [3, 4, 5], 10, true);
    this.animations.add('right', [6, 7, 8], 10, true);
    state.game.camera.follow(this);

    this.weapon = state.game.add.weapon(30, 'eraser');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.trackSprite(this, 4, 0);
  }
  setup(){
    this.body.bounce.y = this.bounce;
    this.body.gravity.y = this.gravity;
    this.alpha = this.opacity;

    this.weapon.bulletSpeed = this.bulletSpeed;
    this.weapon.fireRate = this.fireRate;
    this.weapon.bulletGravity.y = this.bulletGravity;
    this.weapon.bullets.forEach((b)=>{
      b.anchor.setTo(0, 0.5);
      b.scale.setTo(this.bulletSize*0.1, this.bulletSize*0.1);
      b.body.updateBounds();
    },this);

    // this.skill = new {
    //   speed:
    // };

    if(!this.superMode){
      this.weapon.onFire.add(()=>{
        --Global.score;
        if(Global.score<0)this.game.state.start('PreMain');
      });
    }
    console.log('setup');

  }
  
  skill(){
    if(this.skilled)return;
    this.skilled=true;
    this.weapon.onFire.forget();
    setTimeout(()=>{this.setup();this.skilled=false;console.log('over');}, 3000);
    console.log('skill');
  }

  attack(){
    if(this.faceLeft)
      this.weapon.fireAtXY(this.x-200, this.y);
    this.weapon.fireAtXY(this.x+200, this.y);
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
    this.resist();
    if(this.RightPressed){
      this.faceLeft=false;
      this.animations.play('right');
      this.body.velocity.x = this.body.velocity.x+this.speed>this.speed?this.speed:this.body.velocity.x+this.speed;
    }
    else if(this.LeftPressed){
      this.faceLeft=true;
      this.animations.play('left');
      this.body.velocity.x = this.body.velocity.x-this.speed<-this.speed?-this.speed:this.body.velocity.x-this.speed;
    }
    else {
      this.animations.stop();
      this.frame = 1;
    }

    if(this.JumpPressed && this.body.onFloor())this.body.velocity.y=-this.jump;
    if(this.SkillPressed)this.skill();
    if(this.AttackPressed)this.attack();
    this.resetFlag();

  }

  resetFlag(){
    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.SkillPressed=false
    this.JumpPressed=false;
  }

}

export default Player_parent;
