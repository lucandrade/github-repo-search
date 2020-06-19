import Axios from 'axios';

import { ITEMS_PER_PAGE } from "../Constants";

const instance = Axios.create({
  baseURL: 'https://api.github.com/search/repositories',
});

const fetch = async ({ query, sort, order }, page = 1) => {
  const { data } = await instance.get('', {
    params: {
      per_page: ITEMS_PER_PAGE,
      q: query,
      sort,
      order,
      page,
    },
  });

  if (data && data.items) {
    return data;
  }

  return {};
};

export default fetch;
