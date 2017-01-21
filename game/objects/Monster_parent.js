import * as Global from "../functions/Global"

//import Player_parent from '../objects/Player_parent';

class Monster_parent extends Phaser.Group{
  constructor(state){
    super(state.game);
    this.game=state.game;
    state.game.add.existing(this);
    state.game.physics.arcade.enable(this);
    this.round=0;
  }

  setupMons(){
    ++this.round;
    this.forEach((b)=>{
      this.game.physics.arcade.enable(this);
      b.anchor.setTo(0.5, 0.5);
      b.body.collideWorldBounds = true;
      b.name=this.round;

      b.scale.setTo(1, 1);
      b.body.gravity.y = 500;
      b.body.bounce.y=0.1;
    });
  }

}

export default Monster_parent;
