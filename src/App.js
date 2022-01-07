import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched : false  },
  { "src": "/img/potion-1.png", matched : false },
  { "src": "/img/ring-1.png", matched : false },
  { "src": "/img/scroll-1.png", matched : false },
  { "src": "/img/shield-1.png", matched : false },
  { "src": "/img/sword-1.png", matched : false }
]

function App() {
  const [cards, setCards ] = useState([]) 
  const [turns, setTurns ] = useState(0) // initially no. of turns will be 0
  const [firstChoice , setFirstChoice] = useState(null) // CHOICE OF FIRST choosen card
  const [secondChoice , setSecondChoice] = useState(null) // Choice of second choosen card 

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()})) 

    setFirstChoice(null)
    setSecondChoice(null) // when we start a new game first and second choice will be reset

    setCards(shuffledCards)
    setTurns(0)
  }

    // handle a choice
    const handleChoice = (card) =>{
      firstChoice ? setSecondChoice(card) : setFirstChoice(card) // if the FirstChoice is false it will  set setFirstChoice of the card otherwise it will set setSecondChoice.
    }

    // compare two selected cards
    useEffect(() => {
      if(firstChoice && secondChoice){
        if(firstChoice.src === secondChoice.src){
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === firstChoice.src){
                return {...card, matched: true}
              }
              else{
                return card
              }
            })
          })
          resetTurn()
        }else{
          setTimeout(() => resetTurn(), 1000) // if the cards don't match we see them for a second i.e 1000ms
        }
      }

    }, [firstChoice, secondChoice]
    )

    console.log(cards)

    //resets choices and updates turn
    const resetTurn = () =>{
      setFirstChoice(null)
      setSecondChoice(null) // sets both the choices to null. 
      setTurns(prevTurns => prevTurns + 1) // updates turns by 1
    }

    // starts the game automatically
    useEffect(() => {
      shuffleCards()
    }, [])



  

  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick = { shuffleCards }>Let's Begin!</button>
     <div className='card-grid'>{cards.map(card => (
     <SingleCard 
     key={card.id} 
     card = {card} 
     handleChoice = {handleChoice} // passing handleChoice function as a prop in SingleCard
     flipped = {card === firstChoice || card === secondChoice || card.matched } /> // card will be flipped if card is the firstchooce or second choice or it is matched
     ))}
     </div>
     <p>Turns : {turns}</p>
    </div>
  );
}

export default App ;
