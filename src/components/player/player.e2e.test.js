import * as React from 'react';
import {shallow} from 'enzyme';

import {Player} from "./player";

const mockComponent = <audio />;

it(`On button click correctly trigger onClick event`, () => {
  const onClickMockFunction = jest.fn();
  const props = {
    audio: mockComponent,
    isLoading: false,
    isPlaying: false,
    onPlayerButtonClick: onClickMockFunction,
  };
  const player = shallow(<Player{...props} />);
  const PlayerButton = player.find(`button`);

  PlayerButton.simulate(`click`);

  expect(onClickMockFunction).toHaveBeenCalledTimes(1);
});
