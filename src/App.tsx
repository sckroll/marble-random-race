import { FormEvent, useState } from 'react';
import { Game } from './game/Game';
import { MainModal } from './components/MainModal';

function App() {
    /** 현재 페이지 */
    const [page, setPage] = useState<PageState>('main');
    /** 게임 참가자 이름 리스트 */
    const [participants, setParticipants] = useState<string[]>([]);

    /**
     * 새로운 참가자를 추가하는 메소드
     * @param e 참가자 추가 폼 이벤트 객체
     */
    const addParticipant = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const _input = e.currentTarget[0] as HTMLInputElement;
        const newParticipant = _input.value.trim();
        if (newParticipant) {
            setParticipants([...participants, newParticipant]);
            _input.value = '';
        }
    };

    /**
     * 게임을 시작하는 메소드
     */
    const handleGameStart = () => {
        setPage('game');
    };

    return (
        <div id='app'>
            {page === 'main' && (
                <MainModal
                    participants={participants}
                    onStart={handleGameStart}
                    onAddParticipant={addParticipant}
                />
            )}
            {page === 'game' && <Game participants={participants} />}
        </div>
    );
}

export default App;
