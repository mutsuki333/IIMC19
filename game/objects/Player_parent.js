import * as Global from "../functions/GlobalVar"

class Player_parent extends Phaser.Sprite{

  constructor(state, x, y){
    super(state.game, x, y);

    this.faceLeft=false;
    this.game=state.game;
    this.camera=state.camera;
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

}

export default Player_parent;
