import { compose, prop } from "ramda";

export default rootSelector => ({
  data: compose(prop("data"), rootSelector),
  error: compose(prop("error"), rootSelector),
  isFetching: compose(prop("isFetching"), rootSelector)
});
