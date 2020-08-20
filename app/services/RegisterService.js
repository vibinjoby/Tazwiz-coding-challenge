import http from './HttpService';
import commons from '../config/constants';

const registerUser = async (name, email, password) => {
  const {data} = await http.post(`${commons.API_URL}/register/createAccount`, {
    name,
    email,
    password,
  });
  return data;
};

const sendEmailConfirmation = async (username, toEmail) => {
  const {data} = await http.post(
    `${commons.API_URL}/register/confirmationEmail`,
    {
      username,
      toEmail,
    },
  );
  return data;
};

const confirmUserRegistration = async email => {
  const {data} = await http.post(
    `${commons.API_URL}/register/confirmUserRegistration/${email}`,
  );
  return data;
};

export default {
  registerUser,
  sendEmailConfirmation,
  confirmUserRegistration,
};
