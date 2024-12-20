import { Scene } from 'phaser';
import { Marble } from '../objects/Marble';
import { MARBLE_COLORS, MARBLE_RADIUS, TILE_WIDTH } from '../consts';
import { chunkConfig } from '../chunks/consts';
import { Chunk } from '../chunks/Chunk';

/**
 * 메인 게임 화면 클래스
 */
export class GameScene extends Scene {
    /** 참가자 구슬 리스트 */
    private _participants: Marble[];
    /** `update()` 메소드에서 일괄적으로 호출할 메소드 리스트 */
    private _updateFunctions: (() => void)[];
    /** 레이스가 시작되었는지 여부 */
    private _isRaceStarted: boolean;

    constructor() {
        super('game');

        this._participants = [];
        this._updateFunctions = [];
        this._isRaceStarted = false;
    }

    create() {
        this.cameras.main.setBackgroundColor(0xeeeeee);

        // 시작 청크 생성
        new Chunk({
            scene: this,
            tiles: chunkConfig.startChunk.tiles,
            offsetY: 0,
            updateFunctions: this._updateFunctions,
        });
        new Chunk({
            scene: this,
            tiles: chunkConfig.testChunk.tiles,
            offsetY: chunkConfig.startChunk.tiles.length,
            updateFunctions: this._updateFunctions,
        });
        new Chunk({
            scene: this,
            tiles: chunkConfig.endChunk.tiles,
            offsetY:
                chunkConfig.startChunk.tiles.length +
                chunkConfig.testChunk.tiles.length,
            updateFunctions: this._updateFunctions,
        });

        const _participants = this.registry.get('participants');
        const _gap = 10;
        const _availableAreaWidth =
            (MARBLE_RADIUS * 2 + _gap) * _participants.length - _gap;
        const _marbleColorSet = new Set(MARBLE_COLORS);

        // 참가자 구슬 생성
        _participants.forEach((name: string, index: number) => {
            // 랜덤 색상 선택
            const _color =
                Array.from(_marbleColorSet)[
                    Math.floor(Math.random() * _marbleColorSet.size)
                ];
            _marbleColorSet.delete(_color);

            const _marble = new Marble({
                scene: this,
                x:
                    (chunkConfig.startChunk.tiles[0].length * TILE_WIDTH) / 2 -
                    _availableAreaWidth / 2 +
                    MARBLE_RADIUS +
                    (MARBLE_RADIUS * 2 + _gap) * index,
                y:
                    (chunkConfig.startChunk.tiles.length * TILE_WIDTH) / 2 +
                    MARBLE_RADIUS / 2,
                radius: MARBLE_RADIUS,
                color: _color,
                name,
            });
            this._participants.push(_marble);
        });

        // 처음 카메라는 구슬이 모여있는 지점 중앙에 고정
        this.cameras.main.startFollow(
            this._participants[Math.floor(this._participants.length / 2)]
        );

        this.matter.pause();
        this.time.delayedCall(1000, () => {
            this._isRaceStarted = true;
            this.matter.resume();
        });
    }

    update() {
        // 카메라 위치 업데이트
        // TODO: 당첨 순위에 해당하는 구슬에 포커스를 맞추도록 수정
        if (this._isRaceStarted) {
            this.cameras.main.startFollow(
                this._participants[Math.floor(this._participants.length / 2)]
            );
        }

        // 참가자 이름 위치 업데이트
        this._participants.forEach(participant =>
            participant.updateNamePosition()
        );

        this._updateFunctions.forEach(updateFunction => updateFunction());
    }
}
