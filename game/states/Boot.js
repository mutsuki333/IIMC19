import * as Global from "../functions/Global"


class Boot extends Phaser.State {

  preload() {
    this.load.image('icon', 'system/IIMC_icon.jpg');
    this.load.image('loadbar', 'system/ProgressBar.png');
    $.getJSON('map/config/map0.json',(data)=>{Global.MapInfo=data;});
    $.getJSON('monster/config/monster0.json',null,(data)=>{Global.MonsInfo=data;this.game.state.start('PreMain');});

  }

  create() {
    this.game.stage.backgroundColor = '#fff';
    //this.game.plugins.add(Fabrique.Plugins.InputField);

  }
}

export default Boot;
