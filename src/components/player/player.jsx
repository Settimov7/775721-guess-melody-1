import * as React from 'react';
import * as PropTypes from "prop-types";

export class Player extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };

    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  componentDidMount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    audio.onplay = () => this.setState({
      isPlaying: true,
    });

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    this._changeIsPlayingFromProps();

    if (this.state.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
  }

  render() {
    const {src} = this.props;
    const {isPlaying} = this.state;

    return (
      <div className="game__track">
        <button
          className={`track__button track__button--${ isPlaying ? `pause` : `play`}`}
          type="button"
          onClick={this._handleButtonClick}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
            src={src}
          />
        </div>
      </div>
    );
  }

  _changeIsPlayingFromProps() {
    if (typeof this.props.isPlaying !== `undefined`) {
      this.setState({
        isPlaying: this.props.isPlaying,
      });
    }
  }

  _handleButtonClick() {
    const {onPlayerButtonClick} = this.props;

    if (onPlayerButtonClick) {
      onPlayerButtonClick();
    }

    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }
}

Player.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
  onPlayerButtonClick: PropTypes.func,
};
