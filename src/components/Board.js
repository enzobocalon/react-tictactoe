import React, {useState, forwardRef, useImperativeHandle} from 'react'

const values = ['','','','','','','','','']
let isX = true;
let lastPlayer = ''

const Board = forwardRef(({value, handleData, shouldReset}) => {
    const [player, setPlayer] = useState('')  

    const handleClick = (e) => {
    if (values[value-1] === ''){
        if (isX) {
            setPlayer('X')
            lastPlayer='X'
            isX = false
            values[value-1] = 'X'
            checkWin();
        } else {
            setPlayer('O')
            isX = true
            lastPlayer='O'
            values[value-1] = 'O'
            checkWin()
        }
    }
}

    const checkThreeItems = (a, b, c) => {
        if (values[a] !== '' && values[b] !== '' && values[c] !== ''){
            return values[a] === values[b] && values[a] === values[c]
        }
    }

    const handleWin = () => {
        for (let i = 0; i < values.length; i++) {
            values[i] = 'GAME_ENDED'
        }
         handleData(lastPlayer)
    }

    const handleTie = () => {
        let empty = values.every(e => e !== "")
        if(empty) {
            handleData('TIE')
        }
    }

    const checkWin = () => {
        checkThreeItems(0, 1, 2) ? handleWin() :
        checkThreeItems(3, 4, 5) ? handleWin() :
        checkThreeItems(6, 7, 8) ? handleWin() :
        checkThreeItems(0, 3, 6) ? handleWin() : 
        checkThreeItems(1, 4, 7) ? handleWin() :
        checkThreeItems(2, 5, 8) ? handleWin() :
        checkThreeItems(0, 4, 8) ? handleWin() :
        checkThreeItems(2, 4, 6) ? handleWin() : handleTie()
    }  

    const reset = () => {
        window.location.reload();
    }

    useImperativeHandle(shouldReset, () => {
        return {
            reset: reset
        }
    })

  return (
    <>
    <div className='board' id={value} onClick={handleClick}>
        <span className={player === 'X' ? 'X' : 'O'}>{player}</span>
    </div>
    </>
  )
})

export default Board