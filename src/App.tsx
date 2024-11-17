import { Game } from './game/Game';
import { MainModal } from './MainModal';

function App() {
    const handleGameStart = () => {
        console.log('game start');
    };

    return (
        <div id='app'>
            <Game />
            <MainModal onStart={handleGameStart} />
        </div>
    );
}

export default App;
