import { Chunk } from './Chunk';
/**
 * 레이스 시작 청크 클래스
 */
export class StartChunk extends Chunk {
    constructor({ scene, tiles, offsetY }: ChunkProps) {
        super({ scene, tiles, offsetY });
        scene.add.existing(this);
    }
}
