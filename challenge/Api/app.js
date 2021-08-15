// Get the GitHub username input form
const project = document.getElementById("project");

project.onload = function (e) {
  e.preventDefault();

  // Get the GitHub username input field on the DOM
  let usernameInput = document.getElementById("usernameInput");

  // Get the value of the GitHub username input field
  let gitHubUsername = "takenet";

  // Run GitHub API function, passing in the GitHub username
  requestUserRepos(gitHubUsername);
};

function checkLanguage(data) {
  return toString(data.language) == "C#";
}

function requestUserRepos(username) {
  // Create new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // GitHub endpoint, dynamically passing in specified username
  const url = `https://api.github.com/users/${username}/repos`;

  // Open a new connection, using a GET request via URL endpoint
  // Providing 3 arguments (GET/POST, The URL, Async True/False)
  xhr.open("GET", url, true);

  // When request is received
  // Process it here
  xhr.onload = function () {
    // Parse API data into JSON
    const data = JSON.parse(this.response);

    data.filter(checkLanguage);

    // Loop over each object in data array
    for (let i in data) {
      if (data[i].language == "C#") {
        let ul = document.getElementById("userRepos");

        // Create variable that will create li's to be added to ul
        let li = document.createElement("li");

        // Add Bootstrap list item class to each li
        li.classList.add("list-group-item");

        // Create the html markup for each li
        li.innerHTML = `
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>Created at:</strong> ${data[i].created_at}</p>
                <p><strong>Language:</strong> ${data[i].language}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `;

        // Append each li to the ul
        ul.appendChild(li);
      }
      // Get the ul with id of of userRepos
    }
  };

  // Send the request to the server
  xhr.send();
}
