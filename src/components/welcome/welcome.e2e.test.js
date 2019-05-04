import * as React from 'react';
import {shallow} from 'enzyme';

import {Welcome} from "./welcome";

it(`Welcome correctly triggered click event `, () => {
  const props = {
    time: 5,
    errorsCount: 3,
  };
  const clickHandler = jest.fn();
  const app = shallow(<Welcome {...props} onClick={clickHandler}/>);
  const startButton = app.find(`button`);

  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
