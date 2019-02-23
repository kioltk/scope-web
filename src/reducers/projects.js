const initialState = { list: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case "socket":
      const projects = state.list;

      return {
        list: [
          ...projects.filter(
            p => p.projectName !== action.data.project.projectName
          ),
        ]
      };
  }
  return {
    list: state.list
  };
};
