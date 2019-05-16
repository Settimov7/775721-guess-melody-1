import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Player} from "../player/player";

export const ArtistQuestionScreen = ({question, onAnswer}) => {
  const {answers, song} = question;

  return (
    <section className="game game--artist">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{
              filter: `url(#blur)`,
              transform: `rotate(-90deg) scaleY(-1)`,
              transformOrigin: `center`,
            }}/>
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"/>
          <div className="wrong"/>
          <div className="wrong"/>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>

        <Player src={song.src}/>

        <form
          className="game__artist"
          onChange={onAnswer}
        >
          {answers.map(({artist, picture}, index) => (
            <div
              key={artist}
              className="artist"
            >
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${index}`}
                id={`artist-${index}`}/>
              <label className="artist__name" htmlFor={`artist-${index}`}>
                <img className="artist__picture" src={picture} alt={artist}/>
                {artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
