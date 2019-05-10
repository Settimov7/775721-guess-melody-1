import * as React from 'react';
import * as PropTypes from "prop-types";

export const Welcome = (props) => {
  const {time, errorsCount, onStartButtonClick} = props;

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>

      <button className="welcome__button" onClick={onStartButtonClick}>
        <span className="visually-hidden">Начать игру</span>
      </button>

      <h2 className="welcome__rules-title">Правила игры</h2>

      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>За {time} минут нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorsCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

Welcome.propTypes = {
  time: PropTypes.number.isRequired,
  errorsCount: PropTypes.number.isRequired,
  onStartButtonClick: PropTypes.func,
};
