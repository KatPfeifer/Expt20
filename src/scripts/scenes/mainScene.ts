import ExampleObject from '../objects/exampleObject';
import { GameObjects } from 'phaser';
import { Beam } from '../objects/Beam';

export default class MainScene extends Phaser.Scene {
  private background: any;
  private box: any;
  private unknown1button: any;
  private unknown2button: any;
  private unknown3button: any;
  private unknown4button: any;
  private ammoniumNitrateButton: any;
  private sodiumAcetateButton: any;
  private sodiumChlorideButton: any;
  private compound: any;
  private pHlabel: any;
  private pH: any;
  private compoundLabel: any;
  private beakerimage: any;
  private otherbox: any;
  private filledbeaker: any;
  private pHmeter: any;
  private notUpdated: boolean;

  constructor() {
    super({ key: 'MainScene' });
  }


  create() {
    this.notUpdated=true;
    this.add.text(5, 10, "Experiment 20: pH and its Applications", {fill: "#000000", fontSize: '16px'});
    this.add.text(5, 40, "Select a \ncompound:", {fill: "#0000ff", fontSize: "12px"});
    this.box=this.add.image(75,360,"bluebackground");
    this.box.rotation+=0.00;
    this.box.setScale(0.1);

    this.otherbox=this.physics.add.image(300, 360, "bluebackground");
    this.otherbox.setScale(0.05);
    this.otherbox.setAlpha(0.0);

    this.beakerimage=this.add.image(300, 300, "emptybeaker");
    this.beakerimage.setScale(0.4);
    this.beakerimage.setAlpha(1);

    this.filledbeaker=this.add.image(300, 300, "filledbeaker");
    this.filledbeaker.setScale(0.4);
    this.filledbeaker.setAlpha(0.0);
    
    

    this.unknown1button= this.add.text(5, 75, "20-39X", {fill: "#0f0"})
     .setInteractive()
     .on('pointerdown', ()=>this.updateCompound("unknown 1"))
     .on('pointerover', ()=>this.enterButton1HoverState())
     .on('pointerout', ()=>this.enterButton1RestState());

  
    this.unknown2button=this.add.text(5, 105, "20-40X", {fill: "#0f0"})
     .setInteractive()
     .on('pointerdown', ()=>this.updateCompound("unknown 2"))
     .on('pointerover', ()=>this.enterButton2HoverState())
     .on('pointerout', ()=>this.enterButton2RestState());

    this.unknown3button=this.add.text(5, 135, "20-77X", {fill: "#0f0"})
     .setInteractive()
     .on('pointerdown', ()=>this.updateCompound("unknown 3"))
     .on('pointerover', ()=>this.enterButton3HoverState())
     .on('pointerout', ()=>this.enterButton3RestState());
    
    this.unknown4button=this.add.text(5, 165, "20-87X", {fill: "#0f0"})
     .setInteractive()
     .on('pointerdown', ()=>this.updateCompound("unknown 4"))
     .on('pointerover', ()=>this.enterButton4HoverState())
     .on('pointerout', ()=>this.enterButton4RestState());
    
    this.ammoniumNitrateButton=this.add.text(5, 195, "NH4NO3", {fill: "#0f0"})
     .setInteractive()
     .on('pointerdown', ()=>this.updateCompound("ammonium nitrate"))
     .on('pointerover', ()=>this.enterButton5HoverState())
     .on('pointerout', ()=>this.enterButton5RestState());

    this.sodiumAcetateButton=this.add.text(5, 225, "NaC2H3O2", {fill: "#0f0"})
     .setInteractive()
     .on('pointerdown', ()=>this.updateCompound("sodium acetate"))
     .on('pointerover', ()=>this.enterButton6HoverState())
     .on('pointerout', ()=>this.enterButton6RestState());

    this.sodiumChlorideButton=this.add.text(5, 255, "NaCl", {fill: "#0f0"})
     .setInteractive()
     .on('pointerdown', ()=>this.updateCompound("sodium chloride"))
     .on('pointerover', ()=>this.enterButton7HoverState())
     .on('pointerout', ()=>this.enterButton7RestState());

    this.pHlabel=this.add.bitmapText(30, 350, "pixelFont", "pH: ", 40);
    this.pH="-.--"
    this.pHlabel.text="pH: "+ this.pH;

    this.compound="N/A";

    this.compoundLabel=this.add.bitmapText(5, 300, "pixelFont");
    this.compoundLabel.fontSize=20;
    this.compoundLabel.text=this.compound + " has \nbeen selected";

    this.pHmeter=this.physics.add.image(300, 100, "pHmeter");
    this.pHmeter.setScale(0.8);
    this.pHmeter.setInteractive();
    this.input.setDraggable(this.pHmeter);

    this.input.on('drag', this.doDrag, this)

    this.physics.add.overlap(this.otherbox, this.pHmeter, this.updatepH, undefined, this);

    //this.player=this.physics.add.image(this.scale.width/2, this.scale.height-64, "dog");
    //this.player.setScale(.1);
    //this.cursorKeys=this.input.keyboard.createCursorKeys();
  
    //this.scoreLabel=this.add.bitmapText(10,5,"pixelFont", "SCORE", 16);
    //this.score=0;
    //this.scoreLabel.text="SCORE: "+ this.score;

    //this.physics.add.overlap(this.phmeter, this.liquid, this.calculateph, undefined, this);
  } 

  update() {
    this.pHlabel.text="pH: "+this.pH;
    this.displaySelected();
  }

  displaySelected(){
    if (this.compound !== "N/A"){
      this.compoundLabel.setText(this.compound + " has \nbeen selected");
      this.beakerimage.setAlpha(0.0);
      this.filledbeaker.setAlpha(1.0);
      //this.add.text(5, 280, this.compound + "has been selected", {fill: "#000000", fontSize: "10"});
    }
  }

  doDrag(pointer){
    this.pHmeter.x=pointer.x;
    this.pHmeter.y=pointer.y;
  }

  updateCompound(name){
    this.compound=name;
  }

  updatepH(){
    var x = (Math.random()-0.5)/Math.pow(10,1);
    if (this.compound==="unknown 1"&&this.notUpdated){
      this.pH=(1.92+x).toString().substring(0,4);
      this.notUpdated=false;
    }
    if (this.compound==="unknown 2"){
      this.pH="4.1";
    }
    if (this.compound==="null"){
      this.pH="-.--";
    }
  }

  enterButton1HoverState(){
    this.unknown1button.setStyle({fill: '#ff0'});
  }

  enterButton1RestState(){
    this.unknown1button.setStyle({fill: '#0f0'});
  }

  enterButton2HoverState(){
    this.unknown2button.setStyle({fill: '#ff0'});
  }

  enterButton2RestState(){
    this.unknown2button.setStyle({fill: '#0f0'});
  }

  enterButton3HoverState(){
    this.unknown3button.setStyle({fill: '#ff0'});
  }

  enterButton3RestState(){
    this.unknown3button.setStyle({fill: '#0f0'});
  }

  enterButton4HoverState(){
    this.unknown4button.setStyle({fill: '#ff0'});
  }

  enterButton4RestState(){
    this.unknown4button.setStyle({fill: '#0f0'});
  }

  enterButton5HoverState(){
    this.ammoniumNitrateButton.setStyle({fill: '#ff0'});
  }

  enterButton5RestState(){
    this.ammoniumNitrateButton.setStyle({fill: '#0f0'});
  }

  enterButton6HoverState(){
    this.sodiumAcetateButton.setStyle({fill: '#ff0'});
  }

  enterButton6RestState(){
    this.sodiumAcetateButton.setStyle({fill: '#0f0'});
  }

  enterButton7HoverState(){
    this.sodiumChlorideButton.setStyle({fill: '#ff0'});
  }

  enterButton7RestState(){
    this.sodiumChlorideButton.setStyle({fill: '#0f0'});
  }

  /*
  movePlayerManager(){
    if (this.cursorKeys.left.isDown){
      //this.player.setVelocityX(-this.playerspeed);
    } else if (this.cursorKeys.right.isDown){
      //this.player.setVelocityX(this.playerspeed);
    } else {
      //this.player.setVelocityX(0);
    }
    if (this.cursorKeys.down.isDown){
      //this.player.setVelocityY(this.playerspeed);
    } else if (this.cursorKeys.up.isDown){
      //this.player.setVelocityY(-this.playerspeed);
    } else {
      //this.player.setVelocityY(0);
    }
  }
  */
}
