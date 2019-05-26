import * as React from 'react';

export const withActivePlayer = (Component) => {
  return class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerIndex: null,
      };

      this._playerButtonHandler = this._playerButtonHandler.bind(this);
    }

    render() {
      const {activePlayerIndex} = this.state;

      return <Component
        {...this.props}
        activePlayerIndex={activePlayerIndex}
        onPlayerButtonClick={this._playerButtonHandler}
      />;
    }

    _playerButtonHandler(index) {
      this.setState({
        activePlayerIndex: this.state.activePlayerIndex === index ? null : index,
      });
    }
  };
};
