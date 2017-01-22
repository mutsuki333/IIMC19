import * as Global from '../functions/Global'

import Monster_parent from '../objects/Monster_parent';

class Monster extends Monster_parent{
  constructor(state){
    super(state);
    /*
    */
    this.speed=250;
    this.jump=500;
    this.bounce=1;
    // this.gravity=500;
    // this.size=1;
    // this.friction=50;
    // this.opacity=1;

  }


}

export default Monster;
