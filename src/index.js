import * as React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import {compose} from "recompose";
import thunk from "redux-thunk";

import {App} from "./components/app/app";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";
import {createAPI} from './api';
import {Operation} from "./reducer/data/data";

export const settings = {
  gameTime: 5,
  maxErrors: 3,
};
const WrappedApp = withScreenSwitch(App);

const init = () => {
  const api = createAPI((...args) => appStore.dispatch(...args));
  const appStore = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window[`__REDUX_DEVTOOLS_EXTENSION__`] && window[`__REDUX_DEVTOOLS_EXTENSION__`]()
      )
  );

  appStore.dispatch(Operation.loadQuestions());

  render(
      <Provider store={appStore}>
        <WrappedApp settings={settings}/>
      </Provider>,
      document.querySelector(`.main`)
  );
};

init();
