import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from "./components/app/app";

const settings = {
  gameTime: 5,
  errorsCount: 3,
};

const init = () => {
  ReactDOM.render(<App {...settings} />, document.querySelector(`.main`));
};

init();
