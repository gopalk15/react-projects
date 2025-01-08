import Die from './Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(() => generateAllNewDieValues());

  const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
  console.log({gameWon})

  


  function generateAllNewDieValues(){
    return new Array(10).fill().map(() => ({
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }))
  }

  const toggleIsHeld = (id) => {
    setDice(prevDice => prevDice.map(die => ((die.id === id) ? {...die, isHeld: !die.isHeld} : die)))

  }

  const rollDice = () => {
    gameWon ? 
    setDice(generateAllNewDieValues()) 
    : setDice(prevDice => prevDice.map(die => (die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6) + 1})))
  }



  

  const dieElements = dice.map(dieState => (
    <Die key={dieState.id} value={dieState.value} isHeld={dieState.isHeld} handleToggle={() => toggleIsHeld(dieState.id)}/>
  ))




  return (
    <main className='game-container'>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className='title'>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='dice-container'>{dieElements}</div>
      <button onClick={rollDice} className='roll-button'>{ gameWon ? 'New Game' : 'Roll'}</button>
    </main>
  )
  
}