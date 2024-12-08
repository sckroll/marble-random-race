import { Chunk } from './Chunk';

/**
 * 레이스 도착 청크 클래스
 */
export class EndChunk extends Chunk {
    constructor({ scene, tiles, offsetY }: ChunkProps) {
        super({ scene, tiles, offsetY });
        scene.add.existing(this);
    }
}
