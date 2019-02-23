const initialState = { list: [] };
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
  }
  return {
    list: state.list
  };
};
