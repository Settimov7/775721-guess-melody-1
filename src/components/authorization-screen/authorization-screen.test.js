import * as React from 'react';
import renderer from 'react-test-renderer';

import {AuthorizationScreen} from "./authorization-screen";

it(`Authorization screen correctly renders`, () => {
  const login = jest.fn();
  const props = {
    login,
  };
  const authorizationScreen = renderer.create(<AuthorizationScreen {...props} />).toJSON();

  expect(authorizationScreen).toMatchSnapshot();
});
