import * as Global from './Global'

class Func{
  /*Arcade set n-way tile collision
  ex. setTileCollision(Layer,[1,5]{
    top: true,
    bottom: false,
    left: false,
    right: false
  })*/
  static setTileCollision(mapLayer, idxOrArray, dirs) {

      let mFunc; // tile index matching function
      if (idxOrArray.length) {
          // if idxOrArray is an array, use a function with a loop
          mFunc = function(inp) {
              for (let i = 0; i < idxOrArray.length; i++) {
                  if (idxOrArray[i] === inp) {
                      return true;
                  }
              }
              return false;
          };
      } else {
          // if idxOrArray is a single number, use a simple function
          mFunc = function(inp) {
              return inp === idxOrArray;
          };
      }

      // get the 2-dimensional tiles array for this layer
      let d = mapLayer.map.layers[mapLayer.index].data;

      for (let i = 0; i < d.length; i++) {
          for (let j = 0; j < d[i].length; j++) {
              let t = d[i][j];
              if (mFunc(t.index)) {

                  t.collideUp = dirs.top;
                  t.collideDown = dirs.bottom;
                  t.collideLeft = dirs.left;
                  t.collideRight = dirs.right;

                  t.faceTop = dirs.top;
                  t.faceBottom = dirs.bottom;
                  t.faceLeft = dirs.left;
                  t.faceRight = dirs.right;

              }
          }
      }
  }

  static setTileCollisionForAll(mapLayer, dirs) {
      // get the 2-dimensional tiles array for this layer
      let d = mapLayer.map.layers[mapLayer.index].data;

      for (let i = 0; i < d.length; i++) {
          for (let j = 0; j < d[i].length; j++) {
              let t = d[i][j];
              if (t.index!==0) {

                  t.collideUp = dirs.top;
                  t.collideDown = dirs.bottom;
                  t.collideLeft = dirs.left;
                  t.collideRight = dirs.right;

                  t.faceTop = dirs.top;
                  t.faceBottom = dirs.bottom;
                  t.faceLeft = dirs.left;
                  t.faceRight = dirs.right;

              }
          }
      }
  }

  static load(state){
    //load character
    state.load.spritesheet('spritePix', 'character/heroine.png', 32, 32);
    //load monster
    if(Global.onMap!=0){


    }
    //load map
    state.load.tilemap('tilemap', 'map/json/'+Global.MapInfo.json, null, Phaser.Tilemap.TILED_JSON);
    for (const pix of Global.MapInfo.source){
      state.load.image(pix, 'map/tiles/'+pix+'.png');
    }
    state.load.image('trans', 'system/trans1.png');
  }

}

export default Func;
