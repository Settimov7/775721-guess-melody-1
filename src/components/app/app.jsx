import * as React from 'react';
import * as PropTypes from 'prop-types';

import {Welcome} from "../welcome/welcome";

export const App = (props) => {
  const {gameTime, errorsCount} = props;
  return (
    <Welcome time={gameTime} errorsCount={errorsCount} />
  );
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorsCount: PropTypes.number.isRequired,
};
