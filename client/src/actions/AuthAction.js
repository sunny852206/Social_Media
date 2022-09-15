import * as AuthApi from "../api/AuthRequest";

// action for redux
export const logIn = (formData, navigate) => async (dispatch) => {
  //telling reducer that authentication has started
  dispatch({ type: "AUTH_START" });
  try {
    // after receiving data from server side
    const { data } = await AuthApi.logIn(formData);
    // tell reducer that authentication has completed
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
