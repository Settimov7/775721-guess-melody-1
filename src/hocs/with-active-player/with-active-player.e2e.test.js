import * as React from 'react';
import {shallow} from 'enzyme';

import {withActivePlayer} from "./with-active-player";


const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should change activePlayerIndex when call _playerButtonHandler`, () => {
  const wrappedComponent = shallow(<MockComponentWrapped />);

  wrappedComponent.instance()._playerButtonHandler(1);
  wrappedComponent.update();

  expect(wrappedComponent.state().activePlayerIndex).toEqual(1);
});
