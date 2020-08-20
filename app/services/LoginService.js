import jwtDecode from 'jwt-decode';
import http from './HttpService';
import commons from '../config/constants';

export async function loginUser(emailId, password) {
  const {data: jwt} = await http.post(`${commons.API_URL}/login`, {
    emailId,
    password,
  });
  return jwtDecode(jwt);
}

export default {
  loginUser,
};
