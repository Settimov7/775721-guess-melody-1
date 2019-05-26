import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Player} from "../player/player";
import {withAudio} from "../../hocs/with-audio/with-audio";

const AudioPlayer = withAudio(Player);

export const ArtistQuestion = ({question, onAnswer}) => {
  const {answers, song} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>

      <AudioPlayer src={song.src}/>

      <form
        className="game__artist"
      >
        {answers.map(({artist, picture}, index) => (
          <div
            key={artist}
            className="artist"
          >
            <input
              className="artist__input visually-hidden"
              type="radio"
              name="answer"
              value={`artist-${index}`}
              id={`artist-${index}`}
              onClick={() => onAnswer(artist)}
            />
            <label className="artist__name" htmlFor={`artist-${index}`}>
              <img className="artist__picture" src={picture} alt={artist}/>
              {artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

ArtistQuestion.propTypes = {
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
