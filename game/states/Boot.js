import * as Global from "../functions/Global"


class Boot extends Phaser.State {

  preload() {
    this.load.image('icon', 'system/IIMC_icon.jpg');
    this.load.image('loadbar', 'system/ProgressBar.png');
    $.getJSON('map/config/map0.json',(data)=>{Global.MapInfo=data;});

  }

  create() {
    this.game.stage.backgroundColor = '#fff';
    //this.game.plugins.add(Fabrique.Plugins.InputField);
    this.state.start('PreMain');
  }
}

export default Boot;
