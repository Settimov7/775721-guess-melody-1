import * as React from 'react';
import {render} from 'react-dom';

import {App} from "./components/app/app";
import {settings} from "./mocks/settings";
import {questions} from "./mocks/questions";

const init = () => {
  render(<App settings={settings} questions={questions}/>, document.querySelector(`.main`));
};

init();
