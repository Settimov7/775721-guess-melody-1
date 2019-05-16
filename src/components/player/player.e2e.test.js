import * as React from 'react';
import {mount} from 'enzyme';

import {Player} from "./player";

it(`On button click start playing`, () => {
  const props = {
    src: `path.mp3`,
  };
  const player = mount(<Player{...props} />);
  const PlayerButton = player.find(`button`);

  PlayerButton.simulate(`click`);
  player.update();
  expect(player.state(`isPlaying`)).toEqual(true);
});

it(`When player playing on button click stop player`, () => {
  const props = {
    src: `path.mp3`,
  };
  const player = mount(<Player{...props} />);
  const PlayerButton = player.find(`button`);

  player.setState({
    isPlaying: true
  });
  player.update();

  PlayerButton.simulate(`click`);
  player.update();

  expect(player.state(`isPlaying`)).toEqual(false);
});
