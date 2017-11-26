import { identity } from "ramda";
import { replaceParams } from "./";

export default (
  { url, headers, method, query, body, params } = {},
  { request: mapRequest = identity, response: mapResponse = identity } = {},
  config,
  state,
  onSuccess,
  onError
) => {
  fetch(config.host + replaceParams(withState(url, state), params), {
    headers: withState(headers, state),
    body: mapRequest(body),
    method
  })
    .then(response =>
      response
        .text()
        .then(body => ({ response, body: mapResponse(body, response) }))
    )
    .then(({ response, body }) => {
      const meta = {
        status: response.status,
        receivedAt: Date.now()
      };

      if (response.status >= 400) {
        return onError(void 0, body, meta);
      }

      onSuccess(body, meta);
    })
    .catch(err => onError(err.message));
};

const withState = (value, state) =>
  typeof value === "function" ? value(state) : value;
