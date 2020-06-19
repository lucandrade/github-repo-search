import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://api.github.com/search/repositories',
});

const fetch = async ({ query, sort, order }) => {
  try {
    const { data } = await instance.get('', {
      params: {
        per_page: 20,
        q: query,
        sort,
        order,
      },
    });

    if (data && data.items) {
      return data.items.map(i => ({
        name: i.name,
        description: i.description,
        url: i.url,
        avatarUrl: i.owner && i.owner.avatar_url ? i.owner.avatar_url : null,
      }));
    }

    return [];
  } catch (e) {
    return [];
  }
};

export default fetch;
