import * as Global from "../functions/Global"
import Func from "../functions/func"

class PreMain extends Phaser.State{

  preload(){
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'icon');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.6, 0.6);
    this.preloadBar = this.add.sprite(this.game.world.centerX, 620, 'loadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    Global.score=15;
    Global.fromMap=0;
    Global.onMap=0;

    //load character
    this.load.spritesheet('spritePix', Global.char.source[0], Global.char.source[1], Global.char.source[2]);
    this.load.image('eraser', 'system/eraser.png');
    //load monster
    // this.load.spritesheet('mons', '/monster/skeleton.png', 36, 48);
    this.load.spritesheet('mons', 'monster/'+Global.MonsInfo.source[0]+'.png', Global.MonsInfo.source[1], Global.MonsInfo.source[2]);

    //load map
    this.load.tilemap('tilemap', 'map/json/'+Global.MapInfo.json, null, Phaser.Tilemap.TILED_JSON);
    for (const pix of Global.MapInfo.source){
      this.load.image(pix, 'map/tiles/'+pix+'.png');
    }
    this.load.image('bg', 'map/tiles/'+Global.MapInfo.bg[0]+'.png');
    this.load.audio('bgm', 'sound/'Global.MapInfo.bgm[0]+'.mp3');
    this.load.image('trans', 'system/trans1.png');

  }

  create(){
    this.game.physics.startSystem(Phaser.Physics.ARCAD);
    this.game.stage.disableVisibilityChange = true;

    //this.add.plugin(Fabrique.Plugins.InputField);

    this.state.start('Main');
  }
  load(){

  }

}

export default PreMain;
