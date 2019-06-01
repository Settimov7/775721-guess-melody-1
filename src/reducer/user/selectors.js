import {NameSpace} from "../name-spaces";

const NAME_SPACE = NameSpace.USER;

export const getIsAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};
