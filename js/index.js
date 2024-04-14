// app.js
document.querySelector('#search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchInput = document.querySelector('#search-input').value.trim();
    if (searchInput === '') {
      alert('Please enter a username.');
      return;
    }
    const searchURL = `https://api.github.com/search/users?q=${searchInput}`;
    
    try {
      const response = await fetch(searchURL, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      displayUsers(data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  function displayUsers(users) {
    const userList = document.querySelector('#user-list');
    userList.innerHTML = '';
  
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.innerHTML = `
        <div>
          <img src="${user.avatar_url}" alt="Avatar" />
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        </div>
      `;
      userElement.addEventListener('click', async function() {
        await displayUserRepositories(user.login);
      });
      userList.appendChild(userElement);
    });
  }
  
  async function displayUserRepositories(username) {
    const reposURL = `https://api.github.com/users/${username}/repos`;
  
    try {
      const response = await fetch(reposURL, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      displayRepositories(data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }
  
  function displayRepositories(repositories) {
    const repoList = document.querySelector('#repo-list');
    repoList.innerHTML = '';
  
    repositories.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.innerHTML = `
        <div>
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </div>
      `;
      repoList.appendChild(repoElement);
    });
  }