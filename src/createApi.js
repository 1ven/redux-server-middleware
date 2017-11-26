import * as helpers from "./helpers";

export const symbol = Symbol();

export default spec => {
  const types = helpers.createTypes(spec.name);
  return {
    selectors: helpers.createSelectors(spec.selector),
    reducer: helpers.createApiReducer(types),
    request: helpers.createAction(spec, types),
    types
  };
};
