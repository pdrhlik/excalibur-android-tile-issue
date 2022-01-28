import { Component } from '@angular/core';
import { TiledMapResource } from '@excaliburjs/plugin-tiled';
import { Color, DisplayMode, Engine, Input, Loader, Vector } from 'excalibur';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    this.initTileGame();
  }

  initTileGame() {
    const game = new Engine({
      backgroundColor: Color.fromHex('#000000'),
      displayMode: DisplayMode.FillScreen,
      maxFps: 30,
      antialiasing: false,
      suppressConsoleBootMessage: true,
      pointerScope: Input.PointerScope.Document,
      canvasElementId: "main-game",
      snapToPixel: true,
      suppressHiDPIScaling: true
    });

    const tiledMap = new TiledMapResource("assets/samplemap/samplemap.tmx");
    tiledMap.convertPath = function (originPath, relativePath) {
      return "/assets/samplemap/" + relativePath;
    }

    let loader = new Loader([tiledMap]);

    game.start(loader).then(function() {
      tiledMap.addTiledMapToScene(game.currentScene);
      game.currentScene.camera.move(new Vector(500, 1000), 0);
    });
  }

}
