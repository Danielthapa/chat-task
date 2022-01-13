export const messageData = ({ message, user }) => {
  console.log(message);
  return (dispatch) => {
    dispatch({ type: "getMessages", payload: message, user: user });
  };
};
