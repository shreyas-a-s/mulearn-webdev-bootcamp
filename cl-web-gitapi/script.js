const profilePicture = document.getElementById('profile-pic');
const fullName = document.getElementById('full-name');
const userName = document.getElementById('username');
const repoGrid = document.getElementById('repo-grid');


axios.get('https://api.github.com/users/shreyas-a-s')
  .then(response => {
    const userInfo = response.data;
    profilePicture.src = userInfo.avatar_url;
    fullName.textContent = userInfo.name;
    userName.textContent = userInfo.login;
  })
  .catch(error => {
    console.log('Error while fetching user info: ' + error);
  });

axios.get('https://api.github.com/users/shreyas-a-s/repos?per_page=9')
  .then(response => {
    const reposInfo = response.data;
    console.log(reposInfo);
    reposInfo.forEach(repo => {
      // Create the card element
      const card = document.createElement('div');
      card.className = 'repo-card';

      // Create the repository name element
      const repoName = document.createElement('h3');
      repoName.className = 'repo-name';
      repoName.textContent = repo.name;

      // Create the repository description element
      const repoDescription = document.createElement('p');
      repoDescription.className = 'repo-description';
      repoDescription.textContent = repo.description || 'No description';

      // Create the link element
      const repoLink = document.createElement('a');
      repoLink.className = 'repo-link';
      repoLink.href = repo.html_url;
      repoLink.target = '_blank';
      repoLink.textContent = 'View on GitHub';

      // Append the elements to the card
      card.appendChild(repoName);
      card.appendChild(repoDescription);
      card.appendChild(repoLink);

      // Append the card to the repo grid
      repoGrid.appendChild(card);
    });
  })
  .catch(error => {
    console.log('Error while fetching repos info: ' + error);
  });
