export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('bluebackground', "assets/images/bluebackground.jpg");
    this.load.image('unknown1button', "assets/images/background.png");
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    this.load.bitmapFont("font1", "assets/font/font1.fnt");
  }

  create() {
    this.scene.start('MainScene');
  }
}
