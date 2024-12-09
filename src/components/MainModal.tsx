import { FormEvent } from 'react';
import styles from './MainModal.module.css';
import classNames from 'classnames/bind';

/** CSS Module을 위한 바인딩 */
const cx = classNames.bind(styles);

/** 메인 화면 모달 컴포넌트 props 타입 */
type MainModalProps = {
    participants: string[];
    onStart: () => void;
    onAddParticipant: (e: FormEvent<HTMLFormElement>) => void;
    onRemoveParticipant: (participant: string) => void;
};

/**
 * 메인 화면 모달 컴포넌트
 */
export const MainModal = ({
    participants,
    onStart,
    onAddParticipant,
    onRemoveParticipant
}: MainModalProps) => {
    return (
        <div className={cx('overlay')}>
            <section className={cx('modal')}>
                <div className={cx('participantList')}>
                    {participants.map(participant => (
                        <div className={cx('participantBadge')} key={participant}>
                            {participant}
                            <button onClick={() => onRemoveParticipant(participant)}>X</button>
                        </div>
                    ))}
                </div>
                <form onSubmit={onAddParticipant}>
                    <label>
                        참가자
                        <input type='text' name='new-participant' />
                    </label>
                    <button>추가</button>
                </form>
                <button disabled={participants.length < 2} onClick={onStart}>
                    게임 시작
                </button>
            </section>
        </div>
    );
};
