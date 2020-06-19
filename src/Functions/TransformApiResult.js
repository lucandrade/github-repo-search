import { ITEMS_PER_PAGE } from "../Constants";

export default function TransformApiResult({ items = [], total_count }) {
  const repos = items.map(i => ({
    name: i.name,
    description: i.description,
    url: i.html_url,
    avatarUrl: i.owner && i.owner.avatar_url ? i.owner.avatar_url : null,
    stars: i.stargazers_count,
    forks: i.forks,
  }));

  let pages = Math.ceil(total_count / ITEMS_PER_PAGE);

  if (pages > 50) {
    pages = 50;
  }

  return { repos, pages };
}
