const initialState = { list: [], selected: null, filter: [] };
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
            packetId: action.data.packetId,
            filtered: false
          }
        ],
        selected: state.selected,
        filtered: state.filtered
      };
    case "select":
      return { ...state, selected: action.request };
    case "filter":
      return { ...state, filtered: action.updatedList };
    case "clear":
      return { state };
  }
  return {
    list: state.list,
    selected: state.selected,
    filtered: state.filtered
  };
};
