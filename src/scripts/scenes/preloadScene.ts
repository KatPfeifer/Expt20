export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('bluebackground', "assets/images/bluebackground.jpg");
    this.load.image('unknown1button', "assets/images/background.png");
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    //this.load.bitmapFont("font1", "assets/font/font1.fnt");
    this.load.image("emptybeaker", "assets/images/emptybeaker.png");
    this.load.image("filledbeaker", "assets/images/filledbeaker.png");
    this.load.image("pHmeter", "assets/images/pHmeter.png");
    this.load.image("resetbutton", "assets/images/resetButton.png");
    this.load.image("acidButton", "assets/images/acidButton.png");
    this.load.image("baseButton", "assets/images/baseButton.png");
    this.load.image("protons", "assets/images/protons.png");
    this.load.image("hydroxides", "assets/images/hydroxides.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
