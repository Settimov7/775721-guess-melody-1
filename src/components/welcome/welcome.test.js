import * as React from 'react';
import renderer from 'react-test-renderer';

import {Welcome} from "./welcome";

it(`Welcome correctly renders`, () => {
  const props = {
    time: 5,
    errorsCount: 3,
  };

  const tree = renderer.create(<Welcome {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
