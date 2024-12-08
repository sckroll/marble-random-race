import { GameObjects } from 'phaser';
import { Wall } from '../objects/Wall';
import { TILE_WIDTH } from '../consts';

/**
 * 청크 공통 클래스
 */
export class Chunk extends GameObjects.Container {
    /** 청크의 타일 좌표계 Y 오프셋 값 (맨 위를 기준으로) */
    protected offsetY: number;
    /** 청크의 타일 배열 */
    protected tiles: number[][];

    constructor({ scene, tiles, offsetY }: ChunkProps) {
        super(scene);
        scene.add.existing(this);

        this.scene = scene;
        this.tiles = tiles;
        this.offsetY = offsetY;

        this._renderBackground();
        this._renderWalls();
    }

    /**
     * 구슬이 지나갈 수 있는 영역의 배경을 렌더링하는 메소드
     */
    private _renderBackground() {
        const background = this.scene.add.rectangle(
            0,
            this.offsetY * TILE_WIDTH,
            this.tiles[0].length * TILE_WIDTH,
            this.tiles.length * TILE_WIDTH,
            0xaaaaaa
        );
        background.setOrigin(0);
        this.add(background);
    }

    /**
     * 청크의 벽을 렌더링하는 메소드
     */
    private _renderWalls() {
        this.tiles.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col === 1) {
                    new Wall({
                        scene: this.scene,
                        tileX: colIndex,
                        tileY: rowIndex + this.offsetY,
                        color: 0xeeeeee,
                    });
                }
            });
        });
    }
}
