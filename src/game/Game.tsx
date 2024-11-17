import { useEffect, useRef } from 'react';
import { AUTO } from 'phaser';

import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,

    // width: 1024,
    // height: 768,
    // parent: 'game-container',
    // backgroundColor: '#000000',
};

export function Game() {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        // if (gameRef.current) {
        //     return;
        // }

        gameRef.current = new Phaser.Game({
            ...config,
            parent: gameContainerRef.current?.id,
            scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
        });

        return () => {
            gameRef.current?.destroy(true);
        };
    }, []);

    return <div ref={gameContainerRef} id='game-container'></div>;
}
