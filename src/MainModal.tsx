import { FormEvent, useState } from 'react';
import styles from './MainModal.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type MainModalProps = {
    onStart: () => void;
};

export const MainModal = ({ onStart }: MainModalProps) => {
    const [participants, setParticipants] = useState<string[]>([]);

    const addParticipant = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const _input = e.currentTarget[0] as HTMLInputElement;
        const newParticipant = (e.currentTarget[0] as HTMLInputElement).value;
        if (newParticipant) {
            setParticipants([...participants, newParticipant]);
            _input.value = '';
        }
    };

    const handleGameStart = () => {
        onStart();
    };

    return (
        <div className={cx('overlay')}>
            <section className={cx('modal')}>
                <div className=''>
                    <div className=''>참가자 리스트</div>
                    <div className=''>{participants}</div>
                </div>
                <form onSubmit={addParticipant}>
                    <label>
                        참가자
                        <input type='text' name='new-participant' />
                    </label>
                    <button>추가</button>
                </form>
                <button onClick={handleGameStart}>게임 시작</button>
            </section>
        </div>
    );
};
