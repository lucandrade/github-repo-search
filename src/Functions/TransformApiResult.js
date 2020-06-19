import { GITHUB_RESULT_LIMIT, ITEMS_PER_PAGE } from "../Constants";

export default function TransformApiResult({ items = [], total_count }) {
  const repos = items.map(i => ({
    name: i.name,
    description: i.description,
    url: i.html_url,
    avatarUrl: i.owner && i.owner.avatar_url ? i.owner.avatar_url : null,
    stars: i.stargazers_count,
    forks: i.forks,
  }));

  const total = total_count > GITHUB_RESULT_LIMIT ? GITHUB_RESULT_LIMIT : total_count;
  const pages = Math.ceil(total / ITEMS_PER_PAGE);

  return { repos, pages };
}
