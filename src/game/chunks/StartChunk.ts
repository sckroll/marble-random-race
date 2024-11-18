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
};

/**
 * 레이스 시작 청크 클래스
 */
export class StartChunk extends GameObjects.Container {
    /** 현재 게임 화면 클래스 */
    private _scene: Scene;
    /** 참가자 구슬 리스트 */
    private _participants: Marble[];
    /** 구슬이 지나갈 수 있는 영역의 배경 */
    background: GameObjects.Rectangle;

    constructor({ scene, participants }: StartChunkProps) {
        super(scene);
        scene.add.existing(this);

        this._scene = scene;
        this._participants = participants;

        this._renderBackground();
        this._renderWalls();
    }

    /**
     * 구슬이 지나갈 수 있는 영역의 배경을 렌더링하는 메소드
     */
    private _renderBackground() {
        this.background = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2,
            startChunk.height / 2,
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
        let _wall = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2,
            common.wallThickness / 2,
            startChunk.width,
            common.wallThickness,
            0xeeeeee
        );
        this._scene.physics.add.existing(_wall, true);
        this._scene.physics.add.collider(_wall, this._participants);
        this.add(_wall);

        _wall = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2 -
                startChunk.width / 2 +
                common.wallThickness / 2,
            startChunk.height / 2,
            common.wallThickness,
            startChunk.height,
            0xeeeeee
        );
        this._scene.physics.add.existing(_wall, true);
        this._scene.physics.add.collider(_wall, this._participants);
        this.add(_wall);

        _wall = this._scene.add.rectangle(
            this._scene.game.canvas.width / 2 +
                startChunk.width / 2 -
                common.wallThickness / 2,
            startChunk.height / 2,
            common.wallThickness,
            startChunk.height,
            0xeeeeee
        );
        this._scene.physics.add.existing(_wall, true);
        this._scene.physics.add.collider(_wall, this._participants);
        this.add(_wall);
    }
}
