import ExampleObject from '../objects/exampleObject';
import CompoundButton from '../objects/compoundButton';
import { PHConstant } from '../objects/phConstant';

enum AcidBaseNeutral {
  Acid = "acid",
  Base = "base",
  Neutral = "neutral"
}

const COMPOUND_PH_CONSTANT = {
  "unknown 1": new PHConstant(1.92-.3, 1.92+.3, 1.92),
  "unknown 2": new PHConstant(4.1-.3, 4.1+.3, 4.1),
  "unknown 3": new PHConstant(5.51-.3, 5.51+.3, 5.51),
  "unknown 4": new PHConstant(6.91-.3, 6.91+.3, 6.91),
  "ammonium nitrate": new PHConstant(3, 9.3, 5.15),
  "sodium acetate": new PHConstant(4.75, 11, 8.87),
  "water": new PHConstant(3, 11, 7),
}

export default class MainScene extends Phaser.Scene {
  private background: any;
  private box: any;
  private compound: any;
  private pHlabel: any;
  private pH: any;
  private compoundLabel: any;
  private beakerimage: any;
  private otherbox: any;
  private filledbeaker: any;
  private pHmeter: any;
  private notUpdated: boolean;
  adding: AcidBaseNeutral;
  private protons: any;
  private hydroxides: any;

  constructor() {
    super({ key: 'MainScene' });
  }


  create() {
    this.notUpdated=true;
    this.adding = AcidBaseNeutral.Neutral;

    this.pHmeter=this.physics.add.image(300, 150, "pHmeter");
    this.pHmeter.setScale(0.8);
    this.pHmeter.setInteractive();
    this.input.setDraggable(this.pHmeter);
    this.input.on('drag', this.doDrag, this)

    this.createExplanations();
    this.createDecorativeImages();
    this.createButtons();
    this.createCompoundStuff();
    

    this.pHlabel=this.add.bitmapText(30, 350, "pixelFont", "pH: ", 40);
    this.pH="-.--";
    this.pHlabel.text="pH: "+ this.pH;

    this.physics.add.overlap(this.otherbox, this.pHmeter, this.updatepH, undefined, this);
  } 

  createExplanations() {
    this.add.text(5, 10, "Experiment 20: pH and its Applications", {fill: "#000000", fontSize: '16px'});
    this.add.text(5, 40, "Select a \ncompound:", {fill: "#0000ff", fontSize: "12px"});
    this.box=this.add.image(75,360,"bluebackground");
    this.box.setScale(0.1);
  }

  createDecorativeImages() {
    this.otherbox=this.physics.add.image(300, 360, "bluebackground");
    this.otherbox.setScale(0.05);
    this.otherbox.setAlpha(0.0);

    this.beakerimage=this.add.image(300, 300, "emptybeaker");
    this.beakerimage.setScale(0.4);

    this.filledbeaker=this.add.image(300, 300, "filledbeaker");
    this.filledbeaker.setScale(0.4);
    this.filledbeaker.setAlpha(0.0);

    this.protons=this.add.image(300, 350, "protons");
    this.protons.setScale(0.5);
    this.protons.setAlpha(0);

    this.hydroxides=this.add.image(300,350, "hydroxides");
    this.hydroxides.setScale(0.5);
    this.hydroxides.setAlpha(0);
  }

  createButtons() {
    const yPositions = [60, 120, 180];
    const textures = ["resetbutton", "acidButton", "baseButton"];
    const callbacks = [this.reset, this.addAcid, this.addBase];

    for (let i=0; i< yPositions.length; i+=1) {
      this.add.image(140, yPositions[i], textures[i])
        .setInteractive()
        .on('pointerdown', callbacks[i], this)
        .setScale(.8);
    }
  }

  createCompoundStuff() {
    new CompoundButton(this, 5, 75, "20-392", "unknown 1"),
    new CompoundButton(this, 5, 100, "20-406", "unknown 2"),
    new CompoundButton(this, 5, 125, "20-770", "unknown 3"),
    new CompoundButton(this, 5, 150, "20-879", "unknown 4"),
    new CompoundButton(this, 5, 175, "NH4NO3", "ammonium nitrate"),
    new CompoundButton(this, 5, 200, "NaC2H3O2", "sodium acetate"),
    new CompoundButton(this, 5, 225, "NaCl", "sodium chloride"),
    new CompoundButton(this, 5, 250, "H2O", "water")

    this.compound="N/A";
    this.compoundLabel=this.add.bitmapText(5, 300, "pixelFont");
    this.compoundLabel.fontSize=20;
    this.compoundLabel.text=this.compound + " has \nbeen selected";  
  }

  update() {
    this.pHlabel.text="pH: "+this.pH;
    this.displaySelected();
  }

  addAcid(){
    this.hydroxides.setAlpha(0.0);
    this.adding = AcidBaseNeutral.Acid;
    this.protons.setAlpha(1.0);
    this.notUpdated=true;
  }

  addBase(){
    this.protons.setAlpha(0.0);
    this.adding = AcidBaseNeutral.Base;
    this.hydroxides.setAlpha(1.0);
    this.notUpdated=true;
  }

  reset(){
    this.filledbeaker.setAlpha(0);
    this.beakerimage.setAlpha(1);
    this.compound="N/A";
    this.notUpdated=true;
    this.updatepH();
    this.adding = AcidBaseNeutral.Neutral;
    this.protons.setAlpha(0.0);
    this.hydroxides.setAlpha(0.0);
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
    this.adding = AcidBaseNeutral.Neutral;
    this.protons.setAlpha(0.0);
    this.hydroxides.setAlpha(0.0);
    this.notUpdated=true;
    this.pH="-.--";
  }

  

  updatepH(){
    if (this.compound==="N/A"){
      this.pH="-.--";
      return;
    }
    if (!this.notUpdated) {
      return;
    }
    let x = (Math.random()-0.5)/Math.pow(10,1);
    let phConstant = COMPOUND_PH_CONSTANT[this.compound][this.adding];
    let pH = (x+phConstant);
    this.pH = pH.toString().substring(0, 4);
    this.notUpdated=false;
  }
}
