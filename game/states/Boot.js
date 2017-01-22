import * as Global from "../functions/Global"


class Boot extends Phaser.State {

  preload() {
    this.load.image('icon', 'system/IIMC_icon.jpg');
    this.load.image('loadbar', 'system/ProgressBar.png');

    $.getJSON('map/config/map0.json',(data)=>{
      Global.MapInfo=data;
      $.getJSON('monster/config/monster0.json',(data)=>{
        Global.MonsInfo=data;
        $.getJSON('character/config/character0.json',(data)=>{
          Global.char=data;
          this.game.state.start('PreMain');
        });
      });
    });

  }

  create() {
    this.game.stage.backgroundColor = '#fff';
    //this.game.plugins.add(Fabrique.Plugins.InputField);
    // this.game.state.start('PreMain');

  }
}

export default Boot;
