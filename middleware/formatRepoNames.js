function formatRepoTitle(title) {
  const text = title
    .toLowerCase()
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return text;
}

function formatRepoNames(repos) {
  const reposFormatted = repos.map(repo => {
    return {
      ...repo,
      name: formatRepoTitle(repo.name)
    };
  });

  return reposFormatted;
}

module.exports = formatRepoNames;
