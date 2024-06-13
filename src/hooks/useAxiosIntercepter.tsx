import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import store from '../store/index.ts';
import userSlice from '../slices/user';

const useAxiosInterceptor = () => {
  const dispatch = useAppDispatch();

  axios.interceptors.request.use(
    config => {
      const accessToken = store.getState().user.accessToken;
      // console.log(accessToken)
      if (config.headers['Content-Type'] == undefined) {
        config.headers['Content-Type'] = 'application/json';
      }
      if (config.headers['Authorization'] == undefined)
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    error => {
      // console.log(error.data);
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    res => {
      return res;
    },
    async error => {
      // console.log(error)
      if (error.response?.data.statusCode === 1000) {
        try {
          console.log('access denied');
          const refreshToken = await EncryptedStorage.getItem('refreshToken');
          if (!refreshToken) {
            dispatch(
              userSlice.actions.setToken({
                accessToken: '',
              }),
            );
            return;
          }
          const resp = await axios.post(`${Config.API_URL}/reissue`, {
            refreshToken: refreshToken,
          });
          await dispatch(
            userSlice.actions.setToken({
              accessToken: resp.data.accessToken,
            }),
          );
          await EncryptedStorage.setItem(
            'refreshToken',
            resp.data.refreshToken,
          );
          console.log('Token 재발급');

          const accessToken = resp.data.accessToken;

          error.config.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          };

          const response = await axios.request(error.config);
          return response;
        } catch (error2: any) {
          const douleErrorResponseStatusCode = error2.response?.data.statusCode;
          if (
            douleErrorResponseStatusCode == 1070 ||
            douleErrorResponseStatusCode == 1080 ||
            douleErrorResponseStatusCode == 1060
          ) {
            await EncryptedStorage.removeItem('refreshToken');
            dispatch(
              userSlice.actions.setToken({
                accessToken: '',
              }),
            );
            return false;
          }

          return Promise.reject(error2);
        }
      }
      return Promise.reject(error);
    },
  );
  return null;
};
export default useAxiosInterceptor;
