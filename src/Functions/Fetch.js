import Axios from 'axios';

import { ITEMS_PER_PAGE } from "../Constants";

Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'X-Requested-With';

const instance = Axios.create({
  baseURL: 'https://api.github.com/search/repositories',
});

const fetch = async ({ query, sort, order }, page = 1) => {
  try {
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
  } catch (e) {
    return {};
  }
};

export default fetch;
