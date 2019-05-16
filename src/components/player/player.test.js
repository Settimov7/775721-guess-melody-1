import * as React from 'react';
import renderer from 'react-test-renderer';

import {Player} from "./player";

it(`Player correctly renders`, () => {
  const props = {
    src: `path.mp3`,
  };

  const createNodeMock = () => {
    return {
      focus() {
        return true;
      }
    };
  };

  const tree = renderer.create(<Player{...props} />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
