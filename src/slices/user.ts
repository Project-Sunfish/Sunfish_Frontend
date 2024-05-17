import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  username: '',
  password: '',
  tabBar: 'show',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    setPerson(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setTabBar(state, action) {
      if (state.tabBar === undefined) state.tabBar = 'show';
      else state.tabBar = action.payload.tabBar;
    },
  },
  extraReducers: builder => {},
});

export const {setToken} = userSlice.actions;
export default userSlice;
