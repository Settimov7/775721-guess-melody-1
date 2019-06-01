import * as React from 'react';
import {shallow} from 'enzyme';

import {AuthorizationScreen} from "./authorization-screen";

it(`On input name change correctly change state`, () => {
  const login = jest.fn();
  const props = {
    login,
  };
  const authorizationScreen = shallow(<AuthorizationScreen {...props} />);
  const nameInput = authorizationScreen.find(`input[name="name"]`);

  nameInput.simulate(`change`, {
    target: {
      name: `name`,
      value: `email@mail.com`,
    }
  });

  authorizationScreen.update();

  expect(authorizationScreen.state()).toEqual({
    name: `email@mail.com`,
    password: ``,
  });
});

it(`On input password change correctly change state`, () => {
  const login = jest.fn();
  const props = {
    login,
  };
  const authorizationScreen = shallow(<AuthorizationScreen {...props} />);
  const nameInput = authorizationScreen.find(`input[name="password"]`);

  nameInput.simulate(`change`, {
    target: {
      name: `password`,
      value: `password`,
    }
  });

  authorizationScreen.update();

  expect(authorizationScreen.state()).toEqual({
    name: ``,
    password: `password`,
  });
});

it(`On submit correctly trigger submit handle`, () => {
  const login = jest.fn();
  const formSendPrevention = jest.fn();
  const props = {
    login,
  };
  const authorizationScreen = shallow(<AuthorizationScreen {...props} />);
  const form = authorizationScreen.find(`form`);

  authorizationScreen.setState({
    name: `email@mail.com`,
    password: `password`,
  });

  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(formSendPrevention).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenCalledWith(`email@mail.com`, `password`);
});
