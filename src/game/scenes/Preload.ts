import { Scene } from 'phaser';

/** 프리로딩 화면 클래스 생성자 타입 */
type PreloaderSceneProps = {
    participants: string[];
};

/**
 * 게임 로딩 화면을 위한 프리로딩 화면 클래스
 */
export class PreloaderScene extends Scene {
    participants: string[];

    constructor({ participants }: PreloaderSceneProps) {
        super('preloader');
        this.participants = participants;
    }

    preload() {}

    create() {
        this.registry.set('participants', this.participants);
        this.scene.launch('loader');
        this.scene.remove();
    }
}
