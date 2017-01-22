import * as Global from "../functions/Global"
import Func from "../functions/func"
import MonsterChild from "../objects/MonsterChild"
import _Monster from "../custom_class/Monster"
import _Map from "../custom_class/Map"
import _Player from "../custom_class/Player"

let map,player,mons;
let state;
let jump, cursors, attack, skill;

let scoreText, scoretmp, collections;

//map
let bg, base, collide, trans, monsBound;

// flags bool
let onTrans;
// flags num
let onTransID;

// flag player
let immortal=false;


class Main extends Phaser.State{

  create(){
    state = this;
    Global.bgm = this.game.add.audio('bgm', Global.MapInfo.bgm[1],true);
    Global.bgm.play();
    this.game.stage.backgroundColor = '#fff';
    // map = new _Map(this);

    bg = this.game.add.sprite(0, 0, 'bg');
    bg.scale.setTo(Global.MapInfo.bg[1]);
    bg.fixedToCamera = true;

    map = this.game.add.tilemap('tilemap');
    for (const pix of Global.MapInfo.source)map.addTilesetImage(pix,pix);
    base = map.createLayer('base');
    base.resizeWorld();
    collide = map.createLayer('collide');
    map.createLayer('layer');
    monsBound = map.createLayer('monsBound');
    monsBound.visible = false;

    map.setCollisionByExclusion([0], true, base);
    map.setCollisionByExclusion([0], true, monsBound);
    Func.setTileCollisionForAll(collide, {
      top: true,
      bottom: false,
      left: false,
      right: false
    });
    this.game.physics.arcade.TILE_BIAS = 20

    let bx, by;
    for (let i in Global.MapInfo.TransPoint){
      if(i=='0')continue;
      if(Global.MapInfo.TransPoint[i][2] == Global.fromMap){
        bx=Global.MapInfo.TransPoint[0][0];
        by=Global.MapInfo.TransPoint[0][1];
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

    mons = new _Monster(this);
    for(let i=0;i<Global.MapInfo.monsLayer;i++){
      map.createFromObjects('monster'+(i+1), 'monster', 'mons', 2, true, true, mons, MonsterChild);
      mons.setupMons();
    }
    mons.reborn();
    mons.forEach((b)=>{b.resetFlag();});

    immortal=false;


    player = new _Player(this, 500, 500);
    player.setup();



    //get point
    player.inputEnabled = true;
    player.events.onInputOver.add(this.getPoint, this);

    let style = {
      font: 'bold 45px Arial',
      align: 'center',
      strokeThickness: 5,
      fill: '#f9eb1d'
    }
    map.createLayer('top');
    scoretmp = Global.score;
    scoreText = this.game.add.text(this.game.camera.x+this.game.camera.width/2,0, 'Score: '+scoretmp, style);
    scoreText.anchor.set(0.5,0);
    scoreText.fixedToCamera = true;



    jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    attack = this.game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);
    cursors = this.game.input.keyboard.createCursorKeys();
    skill = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

  }

  update(){

    this.game.physics.arcade.collide(mons, base);
    this.game.physics.arcade.collide(mons, collide);
    this.game.physics.arcade.collide(mons, monsBound);

    this.game.physics.arcade.collide(player, base);
    this.game.physics.arcade.collide(player, collide);
    if(!immortal)this.game.physics.arcade.overlap(player, mons, this.MhitP);

    this.game.physics.arcade.collide(mons, player.weapon.bullets, this.hitMons);

    onTrans = this.game.physics.arcade.overlap(player, trans, (player, tran)=>{onTransID=tran.name;});

    if (cursors.left.isDown)
    {
      player.LeftPressed=true;
    }
    else if (cursors.right.isDown)
    {
      player.RightPressed=true;
    }

    if (attack.isDown){
      player.AttackPressed=true;
    }
    if (jump.isDown)
    {
      player.JumpPressed=true;
    }
    if (skill.isDown){
      player.SkillPressed=true;
    }

    if(scoretmp!=Global.score){
      scoretmp = Global.score;
      scoreText.setText('Score: '+scoretmp)
    }

    if (cursors.up.isDown && player.body.onFloor() && onTrans){
      console.log('ontrans: '+ onTransID);
      // Global.fromMap=GlobalVar.onMap;
      // Global.onMap=onTransID;
      // this.game.state.start('Reload');
    }
    mons.Action();
    player.Action();


  }

  hitMons(mon, eraser){
    eraser.kill();
    if(mon.name=="boss"){
      mon.health-=10;
      if(mon.health<=0){
        mon.kill();
      }
    }
    else {
      mon.kill();
      Global.score+=10;
    }
  }

  MhitP(p, m){
    if(immortal)return;
    if(!p.superMode)Global.score-=10;
    immortal = true;
    p.body.velocity.y=-250;
    if(p.x>m.x)p.body.velocity.x=300;
    else p.body.velocity.x=-300;
    if(p.alpha==p.opacity)p.alpha/=3;
    if(Global.score<=0){state.game.state.start('PreMain');return;}
    setTimeout(()=>{immortal = false; player.alpha=player.opacity;}, 1000);
  }

  getPoint(){
    console.log('X: '+player.x+' Y: '+player.y);
  }


}

export default Main;
