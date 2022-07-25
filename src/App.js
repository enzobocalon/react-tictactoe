import Board from './components/Board';
import './App.css';
import { useState, useRef } from 'react';
import Footer from './components/Footer';

const table = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

function App() {
  let shouldReset = useRef(false);
  const [player, setPlayer] = useState('')
  const handleData = (winner) => {
    setPlayer(winner);
  }


  return (
    <>
    <div className='result'>
      {
        player !== '' && player !== 'TIE' ? 
        (<>
          <span className = {player === 'X' ? 'X' : 'O'}>{player}</span>
          <span id="wins">WINS!</span>
        </>
        ) : player === 'TIE' ? (<>
          <span className = {player === 'X' ? 'X' : 'O'}>{player}</span>
        </>) : ''
}
    </div>
    <div className="container">
      {table.flat().map((table, i) => (
            <Board value={table} key={i} handleData = {handleData} shouldReset = {shouldReset}/>
          ))}

        

     <div className='bottom'>
      <button onClick = {() => {shouldReset.current.reset()}} className='reset'>RESET</button>  
    </div>
    </div>

    <Footer />
    </>
  );
}

export default App;
