import * as React from 'react';
import {render} from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";

import {reducer} from "./reducer";
import App from "./components/app/app";
import {settings} from "./mocks/settings";
import {questions} from "./mocks/questions";

const init = () => {
  const appStore = createStore(reducer);

  render(
      <Provider store={appStore}>
        <App settings={settings} questions={questions}/>
      </Provider>,
      document.querySelector(`.main`)
  );
};

init();
