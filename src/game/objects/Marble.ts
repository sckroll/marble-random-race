import { GameObjects, Scene } from 'phaser';
import { MARBLE_RADIUS } from '../consts';

/** 구슬 객체 생성자 타입 */
type MarbleProps = {
    /** 현재 게임 화면 클래스 */
    scene: Scene;
    /** X 좌표 */
    x: number;
    /** Y 좌표 */
    y: number;
    /** 구슬 반지름 */
    radius: number;
    /** 구슬 색상 */
    color: number;
    /** 구슬 상단에 보여줄 참가자 이름 */
    name: string;
};

/**
 * 구슬 객체 클래스
 */
export class Marble extends GameObjects.Arc {
    private _name: GameObjects.Text;

    constructor({ scene, x, y, radius, color, name }: MarbleProps) {
        super(scene, x, y, radius, 0, 360, false, color);

        this._name = scene.add
            .text(0, 0, name, {
                fontSize: '12px',
                color: '#ffffff',
                align: 'center',
            })
            .setOrigin(0.5, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        const _body = this.body as Phaser.Physics.Arcade.Body;
        _body.setCircle(MARBLE_RADIUS);
        _body.setBounce(0.5);
    }

    updateNamePosition() {
        this._name.setPosition(this.x, this.y - MARBLE_RADIUS * 1.5);
    }
}
