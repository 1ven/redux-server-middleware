export default types => (
  state = {
    isFetching: false
  },
  action
) => {
  switch (action.type) {
    case types.request:
      return {
        ...state,
        isFetching: true
      };
    case types.success:
      return {
        ...state,
        isFetching: false,
        data: action.payload.body,
        lastUpdated: action.meta.receivedAt,
        error: void 0
      };
    case types.failure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      };
    default:
      return state;
  }
};
