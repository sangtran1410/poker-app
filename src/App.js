import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import Card from './components/Card';

const allCards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const allSuits = ['Spade', 'Club', 'Diamond', 'Heart'];
const getRandomCard = (limit = 5) => {
  const result = [];

  while (result.length < limit) {
    const card = allCards[Math.floor(Math.random()*allCards.length)];
    const suits = allSuits[Math.floor(Math.random()*allSuits.length)];
    const exist = result.filter(item => item.card === card && item.suits === suits);

    if (!exist.length) {
      result.push({ card, suits });
    }
  }
  return result;
}

function App() {
  const [deckResult, setDeckResult] = useState('');
  const [rdCards, setRdCards] = useState([
    { card: 'A', suits: 'Spade' },
    { card: 'K', suits: 'Spade' },
    { card: 'Q', suits: 'Spade' },
    { card: '10', suits: 'Spade' },
    { card: 'J', suits: 'Spade' },
  ]);

  const handleRandomCard = () => {
    const getRdCard = getRandomCard();
    setRdCards(getRdCard);
  }

  const isOnePair = useCallback(() => {
    const cardArr = rdCards.map((item) => item.card);
    return cardArr.filter((item, index) => cardArr.indexOf(item) !== index).length === 1;
  }, [rdCards]);

  const repeatDecks = useCallback((times = 3) => {
    const cardArr = rdCards.map((item) => item.card);
    const result = cardArr.reduce((acc, item) => {
      if (acc[item]) {
        acc[item] = ++acc[item];
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});

    const tripsCard = Object.keys(result).filter(item => result[item] === times);
    return !!tripsCard.length;
  }, [rdCards]);

  const isThreeOfKind = useCallback(() => {
    const cardArr = rdCards.map((item) => item.card);
    return repeatDecks(3) && new Set(cardArr).size === 3;
  }, [repeatDecks, rdCards]);

  const isTwoPair = useCallback(() => {
    const cardArr = rdCards.map((item) => item.card);
    return repeatDecks(2) && new Set(cardArr).size === 3;
  }, [rdCards, repeatDecks]);

  const isFullHouse = useCallback(() => {
    const cardArr = rdCards.map((item) => item.card);
    return repeatDecks(3) && new Set(cardArr).size === 2;
  }, [repeatDecks, rdCards]);

  const checkIsStraight = useCallback((cardArr, isNut = false) => {
    cardArr = cardArr.map((item) => {
      let changedCard = item;
      switch(item) {
        case 'J':
          changedCard = '11';
          break; 
        case 'Q':
          changedCard = '12';
          break;
        case 'K':
          changedCard = '13';
          break;
        case 'A':
          changedCard = isNut ? '14' : '1';
          break;
        default:
          break;
      }

      return Number(changedCard);
    });

    cardArr.sort((a, b) => a - b);
    let isStraight = false;

    for (let i = 0; i < cardArr.length; i++) {
      if (i === cardArr.length - 1) { break; }
      if (cardArr[i] + 1 !== cardArr[i + 1]) {
        isStraight = false;
        break;
      } else {
        isStraight = true;
      }
    }

    return isStraight;
  }, []);

  const isFlush = useCallback(() => {
    const suitsArr = rdCards.map((item) => item.suits);
    return suitsArr.every(item => item === suitsArr[0])
  }, [rdCards]);

  const isStraight = useCallback(() => {
    const cardArr = rdCards.map((item) => item.card);
    return (checkIsStraight(cardArr) || checkIsStraight(cardArr, true))
  }, [rdCards, checkIsStraight]);

  const checkWhatHandIs = useCallback(() => {
    const cardArr = rdCards.map((item) => item.card);

    if (isStraight() && isFlush() && (cardArr.indexOf('A') !== -1 && cardArr.indexOf('K') !== -1)) return setDeckResult('Royal Flush');
    if (isStraight() && isFlush()) return setDeckResult('Straight Flush');
    if (repeatDecks(4)) return setDeckResult('Quads');
    if (isFullHouse()) return setDeckResult('Full House');
    if (isFlush()) return setDeckResult('Flush');
    if (isStraight()) return setDeckResult('Straight');
    if (isThreeOfKind()) return setDeckResult('Three Of A Kind');
    if (isTwoPair()) return setDeckResult('Two Pair');
    if (isOnePair()) return setDeckResult('One pair');
    return setDeckResult('High Card');
  }, [
    rdCards,
    isStraight,
    isFlush,
    repeatDecks,
    isFullHouse,
    isThreeOfKind,
    isTwoPair,
    isOnePair,
  ]);

  useEffect(() => {
    checkWhatHandIs();
  }, [rdCards, checkWhatHandIs]);
  
  return (
    <div className="App">
      <button className='btn-random' onClick={handleRandomCard}>Random card</button>
      <div className='card-wrapper'>
        {rdCards.map((rdCard, indx) => <Card key={indx} suits={rdCard.suits} card={rdCard.card} front={true} />)}
      </div>
      <div className='result'>{deckResult}</div>
    </div>
  );
}

export default App;
