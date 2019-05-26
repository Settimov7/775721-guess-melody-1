import * as React from 'react';
import {render} from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";

import {App} from "./components/app/app";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";
import {settings} from "./mocks/settings";
import {questions} from "./mocks/questions";

const WrappedApp = withScreenSwitch(App);

const init = () => {
  /* eslint-disable no-underscore-dangle */
  const appStore = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
  render(
      <Provider store={appStore}>
        <WrappedApp settings={settings} questions={questions}/>
      </Provider>,
      document.querySelector(`.main`)
  );
};

init();
