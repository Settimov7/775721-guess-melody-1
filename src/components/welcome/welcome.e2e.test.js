import * as React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Welcome} from "./welcome";

Enzyme.configure({adapter: new Adapter()});

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
