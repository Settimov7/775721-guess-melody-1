import {ActionCreator, ActionType, reducer} from "./user";

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(false)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: false
    });
  });

  it(`Reducer should change status by a given value`, () => {
    expect(reducer({
      isAuthorizationRequired: false,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    })).toEqual({
      isAuthorizationRequired: true,
    });

    expect(reducer({
      isAuthorizationRequired: true,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    })).toEqual({
      isAuthorizationRequired: false,
    });
  });
});
