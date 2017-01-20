import * as Global from "../functions/Global"
import Func from "../functions/func"

import _Monster from "../custom_class/Monster"
// import Map_parent from "../objects/Map_parent"
import _Map from "../custom_class/Map"

import _Player from "../custom_class/Player"

let map,player,mons;
let keys, jump, cursors, attack;

//map
let bg, base, collide, monsBound, trans;

// flags bool
let onTrans;
// flags num
let onTransID;


class Main extends Phaser.State{

  create(){
    console.log('in');
    this.game.stage.backgroundColor = '#fff';
    // map = new _Map(this);
    //mons = new _Monster(this);
    // player = new _Player(this,map.born.x,map.born.y);

    bg = this.game.add.sprite(0, 0, Global.MapInfo.bg[0]);
    bg.scale.setTo(Global.MapInfo.bg[1]);
    bg.fixedToCamera = true;

    map = this.game.add.tilemap('tilemap');
    for (const pix of Global.MapInfo.source){
      map.addTilesetImage(pix,pix);
    }

    base = map.createLayer('base');
    base.resizeWorld();

    collide = map.createLayer('collide');
    map.createLayer('layer');

    monsBound = map.createLayer('monsBound');

    map.setCollisionByExclusion([0], true, base);
    map.setCollisionByExclusion([0], true, monsBound);
    map.setCollisionByExclusion([0], true, collide);
    Func.setTileCollisionForAll(collide, {
      top: true,
      bottom: false,
      left: false,
      right: false
    })
    this.game.physics.arcade.TILE_BIAS = 20

    let x, y;
    for (let i in Global.MapInfo.TransPoint){
      if(i=='0')continue;
      if(Global.MapInfo.TransPoint[i][2] == Global.fromMap){
        x=Global.MapInfo.TransPoint[0][0];
        y=Global.MapInfo.TransPoint[0][1];
      }
    }

  trans = this.add.group();
    for (let i in Global.MapInfo.TransPoint){
      if(i=='0')continue;
      let transBody = this.game.add.sprite(Global.MapInfo.TransPoint[i][0],Global.MapInfo.TransPoint[i][1],'trans');
      transBody.name=i;
      this.game.physics.arcade.enable(transBody);
      transBody.scale.setTo(0.5);
      if(Global.MapInfo.TransPoint[i][3]==false)transBody.kill();
      trans.add(transBody);
    }



    player = this.game.add.sprite(map.bx,map.by,'spritePix');
    this.game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
    player.animations.add('jump', [0, 1, 2],10 ,false);
    player.animations.add('left', [3, 4, 5], 10, true);
    player.animations.add('right', [6, 7, 8], 10, true);
    player.animations.add('up', [9, 10, 11], 10, true);


    jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    attack = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    cursors = this.game.input.keyboard.createCursorKeys();

  }

  update(){

    // this.game.physics.arcade.collide(mons, map.base);
    // this.game.physics.arcade.collide(mons, map.collide);
    // this.game.physics.arcade.collide(mons, map.monsBound);

    this.game.physics.arcade.collide(player, base);
    // this.game.physics.arcade.collide(player, collide);
    // this.game.physics.arcade.collide(player, mons, this.MhitP);

    // this.game.physics.arcade.collide(mons, player.eraser, this.hitMons);

    onTrans = this.game.physics.arcade.overlap(player,map.trans, (player, tran)=>{onTransID=tran.name;});

    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
      // player.LeftPressed=true;
      player.body.velocity.y=-150;
      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      // player.RightPressed=true;
      player.body.velocity.y=150;
      player.animations.play('right');
    }
    // if(cursors.up.isDown){
    //   player.UpPressed=true;
    // }
    // else if(cursors.down.isDown){
    //   player.DownPressed=true;
    // }
    // if (attack.isDown){
    //   player.AttackPressed=true;
    // }
    if (jump.isDown)
    {
      // player.JumpPressed=true;
      player.body.velocity.y = -250;
      player.animations.play('jump');
    }

    if (cursors.up.isDown && player.body.onFloor() && onTrans){
      Global.fromMap=GlobalVar.onMap;
      Global.onMap=onTransID;
      this.game.state.start('Reload');
    }
    // player.Action();


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

export default Main;
