import { pick, isEmpty } from "ramda";
import { fetchApi } from "./utils";
import { symbol } from "./createApi";

export default store => next => action => {
  if (!action[symbol]) {
    return next(action);
  }

  const { requestData, types } = action;
  const requestPayload = getRequestPayload(requestData);

  next({
    type: types.request,
    payload: requestPayload
  });

  fetchApi(
    requestData,
    action.map,
    store.getState(),
    (body, meta) => {
      next({
        type: types.success,
        payload: {
          request: requestPayload,
          body,
          meta
        }
      });
    },
    (message, body, meta) => {
      next({
        type: types.failure,
        payload: {
          request: requestPayload,
          message,
          body,
          meta
        }
      });
    }
  );
};

const getRequestPayload = requestData => {
  const result = pick(["params", "body"], requestData);
  return !isEmpty(result) ? result : void 0;
};
