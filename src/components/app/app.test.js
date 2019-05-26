import * as React from 'react';
import renderer from 'react-test-renderer';

import {App} from "./app";

const MockScreen = <div />;
const MockError = <div key={1}/>;

it(`App correctly renders`, () => {
  const props = {
    screen: MockScreen,
    errors: [MockError],
    questionType: `questionType`,
  };
  const tree = renderer.create(<App {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
