export default function TransformApiResult({ items = [] }) {
  const repos = items.map(i => ({
    name: i.name,
    description: i.description,
    url: i.html_url,
    avatarUrl: i.owner && i.owner.avatar_url ? i.owner.avatar_url : null,
    stars: i.stargazers_count,
    forks: i.forks,
  }));

  return { repos };
}
