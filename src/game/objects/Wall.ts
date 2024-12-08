import { GameObjects, Scene } from 'phaser';
import { TILE_WIDTH } from '../consts';

/** 벽 타일 객체 생성자 타입 */
type WallProps = {
    /** 현재 게임 화면 클래스 */
    scene: Scene;
    /** 타일 좌표계의 X 위치 */
    tileX: number;
    /** 타일 좌표계의 Y 위치 */
    tileY: number;
    /** 벽 타일 색상 */
    color: number;
};

/**
 * 벽 타일 객체 클래스
 */
export class Wall extends GameObjects.Rectangle {
    constructor({ scene, tileX, tileY, color }: WallProps) {
        super(
            scene,
            tileX * TILE_WIDTH + TILE_WIDTH / 2,
            tileY * TILE_WIDTH + TILE_WIDTH / 2,
            TILE_WIDTH,
            TILE_WIDTH,
            color
        );

        // this.setOrigin(0);
        scene.add.existing(this);
        scene.matter.add.gameObject(this, { isStatic: true }, true);
    }
}
