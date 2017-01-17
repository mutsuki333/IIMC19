import * as Global from "../functions/Global"
import Func from "../functions/func"

class Reload extends Phaser.State{

  preload(){
    let loadMap = $.getJSON('map/config/map'+Global.onMap+'.json',(data)=>{Global.MapInfo=data;})
    $.getJSON('monster/config/monster'+Global.onMap+'.json',(data)=>{Global.MonsInfo=data;})
    .then(loadMap())
    .then(Func.load(this));
    this.state.start('Main');
  }


}

export default Reload;
