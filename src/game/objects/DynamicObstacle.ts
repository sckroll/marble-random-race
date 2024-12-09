import { GameObjects } from 'phaser';
import { TILE_WIDTH } from '../consts';

/** 움직이는 장애물 객체 생성자 타입 */
type DynamicObstacleProps = {
    /** 장애물 너비 (타일 사이즈 단위) */
    width: number;
    /** 장애물 높이 (타일 사이즈 단위) */
    height: number;
    /** 장애물 초기 각도 */
    initialDegree: number;
    /** 장애물 회전 변화량 (1프레임 기준) */
    deltaDegree: number;
    /** 시계 방향 회전 여부 */
    clockwise: boolean;
} & WallProps;

/**
 * 움직이는 장애물 객체 클래스
 */
export class DynamicObstacle extends GameObjects.Rectangle {
    /** 장애물 회전 변화량 (1프레임 기준) */
    deltaDegree: number;
    /** 시계 방향 회전 여부 */
    clockwise: boolean;

    constructor({
        scene,
        tileX,
        tileY,
        color,
        width,
        height,
        initialDegree,
        deltaDegree,
        clockwise,
    }: DynamicObstacleProps) {
        super(
            scene,
            tileX * TILE_WIDTH + TILE_WIDTH / 2,
            tileY * TILE_WIDTH + TILE_WIDTH / 2,
            width * TILE_WIDTH,
            height * TILE_WIDTH,
            color
        );

        this.deltaDegree = deltaDegree;
        this.clockwise = clockwise;

        scene.add.existing(this);
        scene.matter.add.gameObject(
            this,
            { isStatic: true, angle: initialDegree * (Math.PI / 180) },
            true
        );
    }

    update() {
        this.setAngle(
            this.angle + this.deltaDegree * (this.clockwise ? 1 : -1)
        );
    }
}
