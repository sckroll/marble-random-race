import { useEffect, useRef } from 'react';
import { AUTO } from 'phaser';
import { PreloaderScene } from './scenes/Preload';
import { LoaderScene } from './scenes/Loader';
import { GameScene } from './scenes/Game';

/** Phaser 게임 설정 객체 */
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH,
    // },
    backgroundColor: '#000000',
    physics: {
        matter: {
            gravity: { x: 0, y: 1.5 },
            debug: true,
        },
        default: 'matter',
    },
};

/** 게임 화면 컴포넌트 props 타입 */
type GameProps = {
    participants: string[];
};

/**
 * 게임 화면 컴포넌트
 */
export function Game({ participants }: GameProps) {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (!gameRef.current) {
            gameRef.current = new Phaser.Game({
                ...config,
                parent: gameContainerRef.current?.id,
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                scene: [
                    new PreloaderScene({ participants }),
                    new LoaderScene(),
                    new GameScene(),
                ],
            });
            return;
        }

        return () => {
            gameRef.current?.destroy(true);
        };
    }, [participants]);

    return <div ref={gameContainerRef} id='game-container'></div>;
}
