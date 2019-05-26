import * as React from 'react';
import renderer from 'react-test-renderer';

import {Player} from "./player";

const mockComponent = <audio />;

it(`Player correctly renders`, () => {
  const props = {
    audio: mockComponent,
    isLoading: false,
    isPlaying: false,
    onPlayerButtonClick: jest.fn(),
  };

  const player = renderer.create(<Player{...props} />).toJSON();

  expect(player).toMatchSnapshot();
});
