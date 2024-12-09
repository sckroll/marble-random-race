import { FormEvent, useState } from 'react';
import { Game } from './game/Game';
import { MainModal } from './components/MainModal';

function App() {
    /** 현재 페이지 */
    const [page, setPage] = useState<PageState>('main');
    /** 게임 참가자 이름 리스트 */
    const [participants, setParticipants] = useState<string[]>(() => {
        const _participants = localStorage.getItem('mrr-participants');
        return _participants ? JSON.parse(_participants) : [];
    });

    /**
     * 새로운 참가자를 추가하는 메소드
     * @param e 참가자 추가 폼 이벤트 객체
     */
    const addParticipant = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const _input = e.currentTarget[0] as HTMLInputElement;
        const newParticipant = _input.value.trim();
        if (!newParticipant) return;

        // 이름이 중복되는 참가자가 있는지 확인
        if (participants.includes(newParticipant)) {
            alert('이미 등록된 참가자입니다.');
            return;
        }

        const _participants = [...participants, newParticipant];
        setParticipants(_participants);
        localStorage.setItem('mrr-participants', JSON.stringify(_participants));
        _input.value = '';
    };

    /**
     * 참가자를 제거하는 메소드
     * @param participant 제거할 참가자 이름
     */
    const removeParticipant = (participant: string) => {
        const _participants = participants.filter(p => p !== participant);
        localStorage.setItem('mrr-participants', JSON.stringify(_participants));
        setParticipants(_participants);
    }

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
                    onRemoveParticipant={removeParticipant}
                />
            )}
            {page === 'game' && <Game participants={participants} />}
        </div>
    );
}

export default App;
