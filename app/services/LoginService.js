import jwtDecode from 'jwt-decode';
import http from './HttpService';
import commons from '../config/constants';
import Utils from '../helpers/Utils';

export async function loginUser(emailId, password) {
  const {data: jwt} = await http.post(`${commons.API_URL}/login`, {
    emailId,
    password,
  });
  //Store the token to local storage if the email is confirmed so that next time the app loads, user is navigated to home screen
  if (jwtDecode(jwt).isEmailConfirmed)
    Utils.storeAsyncStorageData('token', jwt);
  return jwtDecode(jwt);
}

export default {
  loginUser,
};
