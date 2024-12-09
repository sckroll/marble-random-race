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
    /** `Scene`의 `update()` 메소드에서 일괄적으로 호출할 메소드 리스트 */
    updateFunctions: (() => void)[];
};

/** 벽 타일 객체 생성자 타입 */
type WallProps = {
    /** 현재 게임 화면 클래스 */
    scene: Scene;
    /** 타일 좌표계의 X 위치 */
    tileX: number;
    /** 타일 좌표계의 Y 위치 */
    tileY: number;
    /** 벽 타일 색상 */
    color: number;
};
