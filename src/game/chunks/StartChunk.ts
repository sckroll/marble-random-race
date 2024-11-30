import { GameObjects, Scene } from 'phaser';
import { chunkConfig } from './consts';
import { Marble } from '../objects/Marble';

/** 청크 설정 객체 */
const { common, startChunk } = chunkConfig;

/** 레이스 시작 청크 생성자 타입 */
type StartChunkProps = {
    /** 현재 게임 화면 클래스 */
    scene: Scene;
    /** 참가자 구슬 리스트 */
    participants: Marble[];
    /** 청크의 Y 좌표 (맨 위를 기준으로) */
    y: number;
};

/**
 * 레이스 시작 청크 클래스
 */
export class StartChunk extends GameObjects.Container {
    /** 현재 게임 화면 클래스 */
    private _scene: Scene;
    /** 참가자 구슬 리스트 */
    private _participants: Marble[];
    /** 청크의 Y 좌표 (맨 위를 기준으로) */
    private _y: number;
    /** 구슬이 지나갈 수 있는 영역의 배경 */
    background: GameObjects.Rectangle;

    constructor({ scene, participants, y }: StartChunkProps) {
        super(scene);
        scene.add.existing(this);

        this._scene = scene;
        this._participants = participants;
        this._y = y;

        this._renderBackground();
        this._renderWalls();
    }

    /**
     * 구슬이 지나갈 수 있는 영역의 배경을 렌더링하는 메소드
     */
    private _renderBackground() {
        this.background = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2,
            this._y + startChunk.height / 2,
            startChunk.width,
            startChunk.height,
            0xaaaaaa
        );
        this.add(this.background);
    }

    /**
     * 청크의 벽을 렌더링하는 메소드
     */
    private _renderWalls() {
        const _ceil = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2,
            this._y + common.wallThickness / 2,
            startChunk.width,
            common.wallThickness,
            0xeeeeee
        );
        this._scene.matter.add.gameObject(
            _ceil,
            { isStatic: true, restitution: 1 },
            true
        );
        // this._scene.physics.add.existing(_ceil, true);
        // this._scene.physics.add.collider(_ceil, this._participants);
        // this.add(_ceil);

        const _leftWall = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2 -
                startChunk.width / 2 +
                common.wallThickness / 2,
            this._y + startChunk.height / 2,
            common.wallThickness,
            startChunk.height,
            0xeeeeee
        );
        this._scene.matter.add.gameObject(
            _leftWall,
            { isStatic: true, restitution: 1 },
            true
        );
        // this._scene.physics.add.existing(_leftWall, true);
        // this._scene.physics.add.collider(_leftWall, this._participants);
        // this.add(_leftWall);

        const _rightWall = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2 +
                startChunk.width / 2 -
                common.wallThickness / 2,
            this._y + startChunk.height / 2,
            common.wallThickness,
            startChunk.height,
            0xeeeeee
        );
        this._scene.matter.add.gameObject(
            _rightWall,
            { isStatic: true, restitution: 1 },
            true
        );
        // this._scene.physics.add.existing(_rightWall, true);
        // this._scene.physics.add.collider(_rightWall, this._participants);
        // this.add(_rightWall);
    }
}
