import { Scene } from 'phaser';
import { Marble } from '../objects/Marble';
import { MARBLE_COLORS, MARBLE_RADIUS } from '../consts';
import { StartChunk } from '../chunks/StartChunk';
import { EndChunk } from '../chunks/EndChunk';

/**
 * 메인 게임 화면 클래스
 */
export class GameScene extends Scene {
    private _participants: Marble[];

    constructor() {
        super('game');
        this._participants = [];
    }

    create() {
        this.cameras.main.setBackgroundColor(0xeeeeee);

        // 시작 청크 생성
        const startChunk = new StartChunk({
            scene: this,
            participants: this._participants,
            y: 0,
        });
        const endChunk = new EndChunk({
            scene: this,
            participants: this._participants,
            y: startChunk.background.height,
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
                    this.game.canvas.width / 2 -
                    _availableAreaWidth / 2 +
                    MARBLE_RADIUS +
                    (MARBLE_RADIUS * 2 + _gap) * index,
                y: startChunk.background.y,
                radius: MARBLE_RADIUS,
                color: _color,
                name,
            });
            this._participants.push(_marble);
        });

        this.physics.pause();
        this.time.delayedCall(1000, () => {
            this.physics.resume();
        });
    }

    update() {
        // 참가자 이름 위치 업데이트
        this._participants.forEach(participant =>
            participant.updateNamePosition()
        );
    }
}
