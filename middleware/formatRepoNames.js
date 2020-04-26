function formatRepoTitle(title) {
  const text = title
    .toLowerCase()
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return text;
}

function formatSearchName(title) {
  const searchName = title
    .toLowerCase()
    .split("-")
    .join("");
  return searchName;
}

function formatRepoNames(repos) {
  const reposFormatted = repos.map(repo => {
    return {
      ...repo,
      name: formatRepoTitle(repo.name),
      searchName: formatSearchName(repo.name)
    };
  });

  return reposFormatted;
}

module.exports = formatRepoNames;
