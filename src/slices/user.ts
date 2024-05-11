import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  username: '',
  password: '',
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
  },
  extraReducers: builder => {},
});

export const {setToken} = userSlice.actions;
export default userSlice;
