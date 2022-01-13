const initialState = {
  messages: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getMessages":
      console.log("tesst", action.payload);
      return {
        messages: action.payload,
      };
    default:
      return state;
  }
};
