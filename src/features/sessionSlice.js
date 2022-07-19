import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { getAccessToken, deleteAccessToken } from "../utils/localStorage";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    isAdmin: false,
  },
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = false;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        isAdmin: false,
      };
      state.isLoggedIn = false;
    },
  },
});

// actions
export const { setUserDetails, logout, setIsLoggedIn } = sessionSlice.actions;

export default sessionSlice.reducer;

// export states
export const selectSession = (state) => state.session;
export const selectUser = (state) => state.session.user;

// fetch
export const fetchLoginUser = () => async (dispatch) => {
  dispatch(setIsLoggedIn(true));
  const token = getAccessToken();

  if (!token) {
    dispatch(logout());
    dispatch(setIsLoggedIn(false));
  } else {
    const allData = jwtDecode(token);
    const user = {
      id: allData.id,
      name: allData.name,
      email: allData.email,
      isAdmin: allData.isAdmin,
    };
    dispatch(setUserDetails(user));
  }
};

export const fetchLogoutUser = () => (dispatch) => {
  dispatch(logout());
  deleteAccessToken();
  dispatch(setIsLoggedIn(false));
};
