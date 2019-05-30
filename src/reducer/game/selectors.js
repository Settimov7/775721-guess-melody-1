import {NameSpace} from "../name-spaces";

const NAME_SPACE = NameSpace.GAME;

export const getCurrentQuestionIndex = (state) => {
  return state[NAME_SPACE].currentQuestionIndex;
};

export const getErrorsCount = (state) => {
  return state[NAME_SPACE].errorsCount;
};
