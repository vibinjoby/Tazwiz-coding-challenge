import httpService from './HttpService';
import constants from '../config/constants';

httpService.setHeader(process.env.EXPLORE_API_KEY);

export const getExploreData = async () => {
  const {data} = await httpService.get(constants.EXPLORE_URL);
  return data;
};

export default {
  getExploreData,
};
