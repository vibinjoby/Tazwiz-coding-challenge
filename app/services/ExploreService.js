import httpService from './HttpService';
import constants from '../config/constants';

httpService.setHeader('Gh4v6eFZ1ysLK6K38CrA');

export const getExploreData = async () => {
  const {data} = await httpService.get(constants.EXPLORE_URL);
  return data;
};

export default {
  getExploreData,
};
