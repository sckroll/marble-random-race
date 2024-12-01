import { GameObjects, Scene } from 'phaser';
import { chunkConfig } from './consts';
import { Marble } from '../objects/Marble';

/** 청크 설정 객체 */
const { common, testChunk } = chunkConfig;

type TestChunkProps = {
    /** 현재 게임 화면 클래스 */
    scene: Scene;
    /** 참가자 구슬 리스트 */
    participants: Marble[];
    /** 청크의 Y 좌표 (맨 위를 기준으로) */
    y: number;
};

export class TestChunk extends GameObjects.Container {
    /** 현재 게임 화면 클래스 */
    private _scene: Scene;
    /** 참가자 구슬 리스트 */
    private _participants: Marble[];
    /** 청크의 Y 좌표 (맨 위를 기준으로) */
    private _y: number;
    /** 구슬이 지나갈 수 있는 영역의 배경 */
    background: GameObjects.Rectangle;
    /** 장애물 */
    private _obstacle: GameObjects.Rectangle;

    constructor({ scene, participants, y }: TestChunkProps) {
        super(scene);
        scene.add.existing(this);

        this._scene = scene;
        this._participants = participants;
        this._y = y;

        this._renderBackground();
        this._renderWalls();
        this._renderObstacles();
    }

    /**
     * 구슬이 지나갈 수 있는 영역의 배경을 렌더링하는 메소드
     */
    private _renderBackground() {
        this.background = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2,
            this._y + testChunk.height / 2,
            testChunk.width,
            testChunk.height,
            0xaaaaaa
        );
        this.add(this.background);
    }

    /**
     * 청크의 벽을 렌더링하는 메소드
     */
    private _renderWalls() {
        const _leftWall = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2 -
                testChunk.width / 2 +
                common.wallThickness / 2,
            this._y + testChunk.height / 2,
            common.wallThickness,
            testChunk.height,
            0xeeeeee
        );
        this._scene.matter.add.gameObject(_leftWall, { isStatic: true }, true);

        const _rightWall = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2 +
                testChunk.width / 2 -
                common.wallThickness / 2,
            this._y + testChunk.height / 2,
            common.wallThickness,
            testChunk.height,
            0xeeeeee
        );
        this._scene.matter.add.gameObject(_rightWall, { isStatic: true }, true);
    }

    /**
     * 청크의 장애물을 렌더링하는 메소드
     */
    private _renderObstacles() {
        this._obstacle = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2,
            this._y + testChunk.height / 2,
            100,
            100,
            0xeeeeee
        );
        this._scene.matter.add.gameObject(
            this._obstacle,
            { isStatic: true, restitution: 1, angle: 45 * (Math.PI / 180) },
            true
        );
    }

    update() {
        this._obstacle?.setAngle(this._obstacle.angle + 1.5);
    }
}
