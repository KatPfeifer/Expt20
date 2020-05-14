import MainScene from "../scenes/mainScene";

type Color = string;

export default class CompoundButton extends Phaser.GameObjects.Text {
    fillColor: string;
    compoundName: string;

    HOVER_COLOR : Color = "#ff0";
    REST_COLOR : Color = "#0f0";

    constructor(scene: MainScene, x: number, y: number,
        text: string, name: string) {
        super(scene, x, y, text, {});
        this.setFill(this.REST_COLOR);
        this.compoundName = name;
        scene.add.existing(this);

        this.setInteractive();
        this.on('pointerdown', ()=>scene.updateCompound(name));
        this.on('pointerover', this.enterHoverState, this);
        this.on('pointerout', this.enterRestState, this);
    }

    enterHoverState() {
        this.setFill(this.HOVER_COLOR);
    }

    enterRestState() {
        this.setFill(this.REST_COLOR);
    }
}
