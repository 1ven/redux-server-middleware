import { pick } from "ramda";
import { symbol } from "../createApi";

export default (spec, types) => request => ({
  [symbol]: true,
  types,
  requestData: {
    ...pick(["url", "method", "headers", "query"], spec),
    ...pick(["body", "params"], request || {})
  },
  map: spec.map
});
