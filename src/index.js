import * as React from 'react';
import {render} from 'react-dom';

import {App} from "./components/app/app";

const settings = {
  gameTime: 5,
  errorsCount: 3,
};

const init = () => {
  render(<App {...settings} />, document.querySelector(`.main`));
};

init();
