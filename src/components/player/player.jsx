import * as React from 'react';
import * as PropTypes from "prop-types";

export const Player = (props) => {
  const {audio, isPlaying, isLoading, onPlayerButtonClick} = props;

  return (
    <div className="game__track">
      <button
        className={`track__button track__button--${ isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayerButtonClick}
      />
      <div className="track__status">
        {audio}
      </div>
    </div>
  );
};

Player.propTypes = {
  audio: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onPlayerButtonClick: PropTypes.func,
};
