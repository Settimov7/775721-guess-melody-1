import * as React from 'react';
import * as PropTypes from "prop-types";

export const withAudio = (Component) => {
  class WithAudio extends React.PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._playerButtonHandle = this._playerButtonHandle.bind(this);
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
      const {isLoading, isPlaying} = this.state;

      return <Component
        {...this.props}
        audio={<audio ref={this._audioRef} src={src} />}
        isLoading={isLoading}
        isPlaying={isPlaying}
        onPlayerButtonClick={this._playerButtonHandle}
      />;
    }

    _changeIsPlayingFromProps() {
      if (typeof this.props.isPlaying !== `undefined`) {
        this.setState({
          isPlaying: this.props.isPlaying,
        });
      }
    }

    _playerButtonHandle() {
      const {onPlayerButtonClick} = this.props;

      if (onPlayerButtonClick) {
        onPlayerButtonClick();
      }


      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }
  }

  WithAudio.propTypes = {
    src: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool,
    onPlayerButtonClick: PropTypes.func,
  };

  return WithAudio;
};

