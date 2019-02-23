const initialState = { list: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case "socket":
      const devices = state.list;

      return {
        list: [
          ...devices.filter(
            device => device.deviceId !== action.data.device.deviceId
          ),
          action.data.device
        ]
      };
  }
  return {
    list: state.list
  };
};
