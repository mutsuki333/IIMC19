import * as Global from "../functions/Global"

import _Monster from "../custom_class/Monster"
import _Map from "../custom_class/Map"
import _Player from "../custom_class/Player"

let map,player,mons;
let keys, jump, cursors, attack;

// flags bool
let onTrans;
// flags num
let onTransID;


class Main extends Phaser.State{

  create(){
    this.game.stage.backgroundColor = '#fff';
    map = _Map(this);
    mons = _Monster(this);
    if(Global.char===undefined){
      player = _Player(this,map.born.x,map.born.y);
      Global.char = player;
    }
    else {
      player = Global.char;
      player.addToStage(this);
    }

    jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    attack = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    cursors = this.game.input.keyboard.createCursorKeys();

  }

  update(){

    this.game.physics.arcade.collide(mons, map.base);
    this.game.physics.arcade.collide(mons, map.collide);
    this.game.physics.arcade.collide(mons, map.monsBound);

    this.game.physics.arcade.collide(player, map.base);
    this.game.physics.arcade.collide(player, map.collide);
    this.game.physics.arcade.collide(player, mons, this.MhitP);

    this.game.physics.arcade.collide(mons, player.eraser, this.hitMons);

    onTrans = this.game.physics.arcade.overlap(player,map.trans, (player, tran)=>{onTransID=tran.name;});


    if (cursors.left.isDown)
    {
      player.LeftPressed=true;
    }
    else if (cursors.right.isDown)
    {
      player.RightPressed=true;
    }
    if(cursors.up.isDown){
      player.UpPressed=true;
    }
    else if(cursors.down.isDown){
      player.DownPressed=true;
    }
    if (attack.isDown){
      player.AttackPressed=true;
    }
    if (jump.isDown)
    {
      player.JumpPressed=true;
    }

    if (cursors.up.isDown && player.body.onFloor() && onTrans){
      Global.fromMap=GlobalVar.onMap;
      Global.onMap=onTransID;
      this.game.state.start('Reload');
    }


  }

  hitMons(mon, eraser){
    eraser.kill();
    if(mon.name=="boss"){
      mon.health-=10;
      if(mon.health<=0)mon.kill();
    }
    else {
      mon.kill();
      Global.score+=10;
    }
  }

  MhitP(p, m){
    Global.score-=10;
    if(Global.score<=0)this.game.state.start('PreMain');
  }


}
