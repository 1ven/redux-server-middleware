import { pick } from "ramda";
import { symbol } from "../createApi";

export default (spec, types) => request => ({
  [symbol]: true,
  types,
  requestData: {
    ...pick(["url", "method", "headers", "query"], spec),
    payload: pick(["body", "params", "custom"], request || {})
  },
  map: spec.map
});
