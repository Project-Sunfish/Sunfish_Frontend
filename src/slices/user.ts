import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  preAcc: '',
  preRef: '',
  tabBar: 'show',
  isSmallScreen: false,
  // tutorialFlag: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    setPerson(state, action) {
      state.preAcc = action.payload.preAcc;
      state.preRef = action.payload.preRef;
    },
    setTabBar(state, action) {
      if (state.tabBar === undefined) state.tabBar = 'show';
      else state.tabBar = action.payload.tabBar;
    },
    setScreenSize(state, action) {
      state.isSmallScreen = action.payload.isSmallScreen;
    },
    // setTutorialFlag(state, action) {
    //   state.tutorialFlag = action.payload.tutorialFlag;
    // },
  },
  extraReducers: builder => {},
});

export const {setToken} = userSlice.actions;
export default userSlice;
