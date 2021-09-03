import React from "react";
import PropTypes from "prop-types";

import backCardImg from "../../images/backCardImg.png";
import heart from "../../images/heart.png";
import diamond from "../../images/diamond.png";
import club from "../../images/club.png";
import spade from "../../images/spade.png";

import "./style.scss";

const Card = ({ suits, card, front }) => {
  const getCardSymbol = (suits) => {
    let symbol;
    switch(suits) {
      case "Diamond":
        return symbol = { url: diamond, color: '#0000ff' };
      case "Heart":
        return symbol =  { url: heart, color: 'red' };
      case "Club":
        return symbol =  { url: club, color: '#008000' };
      case "Spade":
        return symbol =  { url: spade, color: 'black' };
      default:
        return symbol;
    };
  };

  const { url, color } = getCardSymbol(suits);

  if (front === true) {
    return (
      <div className="card-container" style={{ color: `${color}` }}>
        <div  style={{ position: "absolute", top: 5, left: 10 }}>
          <div style={{ maxWidth: 20, 'fontSize': '30px' }}>{card}</div>
          <img src={url} alt="suit-symbol" style={{ maxWidth: 20 }}/>
        </div>
        <div>
          <img src={url} alt="suit-symbol" style={{ height: 40, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/>
        </div>
        <div style={{ position: "absolute", bottom: 5, right: 10, transform: "rotate(-180deg)" }}>
          <div style={{ maxWidth: 20, 'fontSize': '30px' }}>{card}</div>
          <img src={url} alt="suit-symbol" style={{ maxWidth: 20 }}/>        
        </div>
      </div> 
    );
  }

  return (
    <div className="card-container" style={{ backgroundImage: `url(${backCardImg})`, color: `${color}` }}></div>
  );
};

Card.propTypes = {
  suits: PropTypes.string,
  // card: PropTypes.string | PropTypes.number,
  front: PropTypes.bool,
  color: PropTypes.string
};

export default Card;
