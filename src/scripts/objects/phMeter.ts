export class PHMeter extends Phaser.Physics.Arcade.Image {
    private pHlabel: Phaser.GameObjects.BitmapText;
    private pH: string;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'pHmeter');
        scene.add.existing(this);
        this.setScale(0.8);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on('drag', this.doDrag, this)

        this.pHlabel=scene.add.bitmapText(30, 350, "pixelFont", "pH: ", 40);
        console.log(this.pHlabel);
        this.resetPH();
    }

    doDrag(pointer){
        this.x=pointer.x;
        this.y=pointer.y;
    }

    resetPH() {
        this.pH = "-.--";
        this.refreshPHLabel();
    }

    updatePH(newPH: number) {
        this.pH = newPH.toString().substring(0, 4);
        this.refreshPHLabel();
    }

    private refreshPHLabel() {
        this.pHlabel.text="pH: "+this.pH;
    }
}