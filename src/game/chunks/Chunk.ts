import { GameObjects } from 'phaser';
import { Wall } from '../objects/Wall';
import { TILE_WIDTH } from '../consts';
import { DynamicObstacle } from '../objects/DynamicObstacle';

/**
 * 청크 공통 클래스
 */
export class Chunk extends GameObjects.Container {
    /** 청크의 타일 좌표계 Y 오프셋 값 (맨 위를 기준으로) */
    protected offsetY: number;
    /** 청크의 타일 배열 */
    protected tiles: number[][];

    updateFunctions: (() => void)[];

    constructor({ scene, tiles, offsetY, updateFunctions }: ChunkProps) {
        super(scene);
        scene.add.existing(this);

        this.scene = scene;
        this.tiles = tiles;
        this.offsetY = offsetY;
        this.updateFunctions = updateFunctions;

        this._renderBackground();
        this._renderTiles();
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
     * 청크의 타일을 렌더링하는 메소드
     */
    private _renderTiles() {
        this.tiles.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col === 1) {
                    new Wall({
                        scene: this.scene,
                        tileX: colIndex,
                        tileY: rowIndex + this.offsetY,
                        color: 0xeeeeee,
                    });
                } else if (col === 2) {
                    const _dynamicObstacle = new DynamicObstacle({
                        scene: this.scene,
                        tileX: colIndex,
                        tileY: rowIndex + this.offsetY,
                        color: 0xeeeeee,
                        width: 1,
                        height: 1,
                        initialDegree: 45,
                        deltaDegree: 1.5,
                        clockwise: true,
                    });
                    this.updateFunctions.push(
                        _dynamicObstacle.update.bind(_dynamicObstacle)
                    );
                } else if (col === 3) {
                    const _dynamicObstacle = new DynamicObstacle({
                        scene: this.scene,
                        tileX: colIndex,
                        tileY: rowIndex + this.offsetY,
                        color: 0xeeeeee,
                        width: 1,
                        height: 1,
                        initialDegree: 45,
                        deltaDegree: 1.5,
                        clockwise: false,
                    });
                    this.updateFunctions.push(
                        _dynamicObstacle.update.bind(_dynamicObstacle)
                    );
                } else if (col === 4) {
                    const _dynamicObstacle = new DynamicObstacle({
                        scene: this.scene,
                        tileX: colIndex,
                        tileY: rowIndex + this.offsetY,
                        color: 0xeeeeee,
                        width: 5,
                        height: 1,
                        initialDegree: 0,
                        deltaDegree: 3,
                        clockwise: true,
                    });
                    this.updateFunctions.push(
                        _dynamicObstacle.update.bind(_dynamicObstacle)
                    );
                }
            });
        });
    }
}
