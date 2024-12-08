/** 현재 페이지 상태 (`main`: 메인 화면, `game`: 게임 화면, `result`: 결과 화면) */
type PageState = 'main' | 'game' | 'result';

/** 청크 공통 클래스의 생성자 타입 */
type ChunkProps = {
    /** 현재 게임 화면 클래스 */
    scene: Scene;
    /** 청크의 타일 배열 */
    tiles: number[][];
    /** 청크의 타일 좌표계 Y 오프셋 값 (맨 위를 기준으로) */
    offsetY: number;
};
