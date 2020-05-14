import ExampleObject from '../objects/exampleObject';
import CompoundButton from '../objects/compoundButton';

export default class MainScene extends Phaser.Scene {
  private background: any;
  private compoundButtons: CompoundButton[];
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
  private resetButton: any;
  private acidButton: any;
  private baseButton: any;
  private acidAdded: any;
  private baseAdded: any;
  private protons: any;
  private hydroxides: any;

  constructor() {
    super({ key: 'MainScene' });
  }


  create() {
    this.notUpdated=true;
    this.acidAdded=false;
    this.baseAdded=false;

    this.add.text(5, 10, "Experiment 20: pH and its Applications", {fill: "#000000", fontSize: '16px'});
    this.add.text(5, 40, "Select a \ncompound:", {fill: "#0000ff", fontSize: "12px"});
    this.box=this.add.image(75,360,"bluebackground");
    this.box.rotation+=0.00;
    this.box.setScale(0.1);

    this.otherbox=this.physics.add.image(300, 360, "bluebackground");
    this.otherbox.setScale(0.05);
    this.otherbox.setAlpha(0.0);

    this.pHmeter=this.physics.add.image(300, 100, "pHmeter");
    this.pHmeter.setScale(0.8);
    this.pHmeter.setInteractive();
    this.input.setDraggable(this.pHmeter);

    this.input.on('drag', this.doDrag, this)

    this.beakerimage=this.add.image(300, 300, "emptybeaker");
    this.beakerimage.setScale(0.4);
    this.beakerimage.setAlpha(1);

    this.filledbeaker=this.add.image(300, 300, "filledbeaker");
    this.filledbeaker.setScale(0.4);
    this.filledbeaker.setAlpha(0.0);

    this.protons=this.add.image(300, 350, "protons");
    this.protons.setScale(0.5);
    this.protons.setAlpha(0);

    this.hydroxides=this.add.image(300,350, "hydroxides");
    this.hydroxides.setScale(0.5);
    this.hydroxides.setAlpha(0);
    
    this.resetButton=this.add.image(140, 60, "resetbutton")
     .setInteractive()
     .on('pointerdown', ()=>this.reset());
    this.resetButton.setScale(0.8);

    this.acidButton=this.add.image(140, 120, "acidButton")
     .setInteractive()
     .on('pointerdown', ()=>this.addAcid());
    this.acidButton.setScale(0.8);

    this.baseButton=this.add.image(140, 180, "baseButton")
     .setInteractive()
     .on('pointerdown', ()=>this.addBase());
    this.baseButton.setScale(0.8);

    this.compoundButtons = [
      new CompoundButton(this, 5, 75, "20-392", "unknown 1"),
      new CompoundButton(this, 5, 100, "20-406", "unknown 2"),
      new CompoundButton(this, 5, 125, "20-770", "unknown 3"),
      new CompoundButton(this, 5, 150, "20-879", "unknown 4"),
      new CompoundButton(this, 5, 175, "NH4NO3", "ammonium nitrate"),
      new CompoundButton(this, 5, 200, "NaC2H3O2", "sodium acetate"),
      new CompoundButton(this, 5, 225, "NaCl", "sodium chloride"),
      new CompoundButton(this, 5, 250, "H2O", "water")
    ];

    this.pHlabel=this.add.bitmapText(30, 350, "pixelFont", "pH: ", 40);
    this.pH="-.--"
    this.pHlabel.text="pH: "+ this.pH;

    this.compound="N/A";

    this.compoundLabel=this.add.bitmapText(5, 300, "pixelFont");
    this.compoundLabel.fontSize=20;
    this.compoundLabel.text=this.compound + " has \nbeen selected";

  

    this.physics.add.overlap(this.otherbox, this.pHmeter, this.updatepH, undefined, this);
  } 

  update() {
    this.pHlabel.text="pH: "+this.pH;
    this.displaySelected();
  }

  addAcid(){
    this.hydroxides.setAlpha(0.0);
    this.acidAdded=true;
    this.baseAdded=false;
    this.protons.setAlpha(1.0);
    this.notUpdated=true;
  }

  addBase(){
    this.protons.setAlpha(0.0);
    this.baseAdded=true;
    this.acidAdded=false;
    this.hydroxides.setAlpha(1.0);
    this.notUpdated=true;
  }

  reset(){
    this.filledbeaker.setAlpha(0);
    this.beakerimage.setAlpha(1);
    this.compound="N/A";
    this.notUpdated=true;
    this.updatepH();
    this.acidAdded=false;
    this.baseAdded=false;
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
    this.acidAdded=false;
    this.baseAdded=false;
    this.protons.setAlpha(0.0);
    this.hydroxides.setAlpha(0.0);
    this.notUpdated=true;
    this.pH="-.--";
  }

  updatepH(){
    var x = (Math.random()-0.5)/Math.pow(10,1);
    if (this.compound==="unknown 1"&&this.notUpdated){
      if (this.acidAdded){
        this.pH=(1.92+x-0.3).toString().substring(0,4);
      }
      if (this.baseAdded){
        this.pH=(1.92+x+0.3).toString().substring(0,4);
      }
      if ((!this.acidAdded)&&(!this.baseAdded)){
        this.pH=(1.92+x).toString().substring(0,4);
      }
      this.notUpdated=false;
    }
    if (this.compound==="unknown 2"&& this.notUpdated){
      if (this.acidAdded){
        this.pH=(4.1+x-0.3).toString().substring(0,4);
      }
      if (this.baseAdded){
        this.pH=(4.1+x+0.3).toString().substring(0,4);
      }
      if ((!this.acidAdded)&&(!this.baseAdded)){
        this.pH=(4.1+x).toString().substring(0,4);
      }
      this.notUpdated=false;
    }
    if (this.compound==="unknown 3"&&this.notUpdated){
      if (this.acidAdded){
        this.pH=(5.51+x-0.3).toString().substring(0,4);  
      }
      if (this.baseAdded){
        this.pH=(5.51+x+0.3).toString().substring(0,4);
      }
      if ((!this.acidAdded)&&(!this.baseAdded)){
        this.pH=(5.51+x).toString().substring(0,4);
      }
      this.notUpdated=false;
    }
    if (this.compound==="unknown 4"&&this.notUpdated){
      if (this.acidAdded){
        this.pH=(6.91+x-0.3).toString().substring(0,4);
      }
      if (this.baseAdded){
        this.pH=(6.91+x+0.3).toString().substring(0,4);
      }
      if ((!this.acidAdded)&&(!this.baseAdded)){
        this.pH=(6.91+x).toString().substring(0,4);
      }
      this.notUpdated=false;
    }
    if (this.compound==="ammonium nitrate"&&this.notUpdated){
      if (this.acidAdded){
        this.pH=(3+x).toString().substring(0,4);
      }
      if (this.baseAdded){
        this.pH=(9.3+x).toString().substring(0,4);
      }
      if ((!this.acidAdded)&&(!this.baseAdded)){
        this.pH=(5.15+x).toString().substring(0,4);
      }
      this.notUpdated=false;
    }
    if (this.compound==="sodium acetate"&&this.notUpdated){
      if (this.acidAdded){
        this.pH=(4.75+x).toString().substring(0,4);
      }
      if (this.baseAdded){
        this.pH=(11+x).toString().substring(0,4);
      }
      if ((!this.acidAdded)&&(!this.baseAdded)){
        this.pH=(8.87+x).toString().substring(0,4);
      }
      this.notUpdated=false;
    }
    if ((this.compound==="water"&&this.notUpdated)||(this.compound==="sodium chloride"&&this.notUpdated)){
      if (this.acidAdded){
        this.pH=(3+x).toString().substring(0,4);
      }
      if (this.baseAdded){
        this.pH=(11+x).toString().substring(0,4);
      }
      if ((!this.acidAdded)&&(!this.baseAdded)) {
        this.pH=(7+x).toString().substring(0,4);
      }
      this.notUpdated=false;
    }
    if (this.compound==="N/A"){
      this.pH="-.--";
    }
  }
}
