import Axios from 'axios';

import { ITEMS_PER_PAGE } from "../Constants";

const instance = Axios.create({
  baseURL: 'https://api.github.com/search/repositories',
});

const fetch = async ({ query, sort, order }) => {
  try {
    const { data } = await instance.get('', {
      params: {
        per_page: ITEMS_PER_PAGE,
        q: query,
        sort,
        order,
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
