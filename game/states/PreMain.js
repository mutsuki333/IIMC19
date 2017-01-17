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

    $.getJSON('map/config/map0.json',(data)=>{Global.MapInfo=data;}).then(Func.load(this));

  }

  create(){
    Global.score=10;
    Global.fromMap=0;
    Global.onMap=0;
    Global.char=undefined;
    this.game.stage.disableVisibilityChange = true;
    this.game.physics.startSystem(Phaser.Physics.ARCAD);
    //this.add.plugin(Fabrique.Plugins.InputField);

    this.state.start('Main');
  }

}

export default PreMain;
