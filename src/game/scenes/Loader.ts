import { Scene } from 'phaser';

/**
 * 게임 로딩 화면 클래스
 */
export class LoaderScene extends Scene {
    constructor() {
        super('loader');
    }

    preload() {}

    create() {
        const loadingText = this.add
            .text(
                this.game.canvas.width / 2,
                this.game.canvas.height / 3,
                'Loading...',
                {
                    fontSize: '32px',
                    color: '#fff',
                    align: 'center',
                }
            )
            .setOrigin(0.5);

        const participantsText = this.add
            .text(
                this.game.canvas.width / 2,
                this.game.canvas.height / 2,
                this.registry.get('participants').join(', '),
                {
                    fontSize: '24px',
                    color: '#fff',
                    align: 'center',
                }
            )
            .setOrigin(0.5);

        this.time.delayedCall(1000, () => {
            this.scene.launch('game');
            this.scene.remove();
        });
    }
}
