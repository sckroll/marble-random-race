import { GameObjects } from 'phaser';
import { TILE_WIDTH } from '../consts';

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

        scene.add.existing(this);
        scene.matter.add.gameObject(this, { isStatic: true }, true);
    }
}
