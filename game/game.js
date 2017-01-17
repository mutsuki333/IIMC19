import * as Global from './functions/Global';

import Boot from './states/Boot';
import PreMain from './states/PreMain';
import Main from './states/Main';
import Reload from './states/Reload';

class Game extends Phaser.Game{

  constructor(){
    super(1280, 720, Phaser.AUTO, 'IIMC19th');

    this.state.add('Boot', Boot);
    this.state.add('PreMain', PreMain);
    this.state.add('Main', Main);
    this.state.add('Reload', Reload);

    this.state.start('Boot');
  }

}


new Game();
