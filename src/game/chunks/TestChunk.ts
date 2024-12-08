import { GameObjects } from 'phaser';
import { Chunk } from './Chunk';
import { TILE_WIDTH } from '../consts';

export class TestChunk extends Chunk {
    /** 장애물 */
    private _obstacle: GameObjects.Rectangle;

    constructor({ scene, tiles, offsetY }: ChunkProps) {
        super({ scene, tiles, offsetY });
        scene.add.existing(this);

        this._renderObstacles();
    }

    /**
     * 청크의 장애물을 렌더링하는 메소드
     */
    private _renderObstacles() {
        this._obstacle = this.scene.add.rectangle(
            (this.tiles[0].length * TILE_WIDTH) / 2,
            this.offsetY * TILE_WIDTH + (this.tiles.length * TILE_WIDTH) / 2,
            100,
            100,
            0xeeeeee
        );
        this.scene.matter.add.gameObject(
            this._obstacle,
            { isStatic: true, restitution: 1, angle: 45 * (Math.PI / 180) },
            true
        );
    }

    update() {
        this._obstacle?.setAngle(this._obstacle.angle + 1.5);
    }
}
