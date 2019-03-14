const initialState = { list: [], selected: null };
export default (state = initialState, action) => {
  switch (action.type) {
    case "socket":
      const requests = state.list;

      return {
        list: [
          ...requests.filter(
            request => request.packetId !== action.data.packetId
          ),
          {
            ...action.data.requestInfo,
            packetId: action.data.packetId
          }
        ]
      };
    case "select":
      return { ...state, selected: action.request };
    case "clear":
      return { state };
  }
  return {
    list: state.list,
    selected: state.selected
  };
};
