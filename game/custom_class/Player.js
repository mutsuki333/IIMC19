import * as Global from '../functions/Global'

import Player_parent from '../objects/Player_parent';

class Player extends Player_parent{
  constructor(state, x, y){
    super(state, x, y);

    /*
    */

    // this.speed=150;
    // this.jump=250;
    // this.bounce=0.1;
    // this.gravity=500;
    // this.size=1;
    // this.friction=50;
    // this.opacity=1;
    //
    // this.bulletSpeed = 600;
    // this.fireRate = 100;
    // this.bulletGravity = 0;
    // this.bulletSize = 1;
    //
    this.superMode = true;


    /*
    */
    // this.Skill.speed=400;
    // this.Skill.jump=1000;
    // this.Skill.bounce=0.1;
    // this.Skill.gravity=500;
    // this.Skill.size=10;
    // this.Skill.friction=50;
    // this.Skill.opacity=1;
    //
    // this.Skill.bulletSpeed = 600;
    // this.Skill.fireRate = 50;
    // this.Skill.bulletGravity = 0;
    // this.Skill.bulletSize = 30;
    //
    // this.Skill.superMode = false;

  }


}

export default Player;
