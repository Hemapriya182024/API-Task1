
const randomImageUrl = "https://dog.ceo/api/breeds/image/random";
const breedListUrl = "https://dog.ceo/api/breeds/list/all";
const breedImagesUrl = "https://dog.ceo/api/breed/";

// Fetch random dog image and update on button click
document.getElementById("fetchDogButton").addEventListener("click", function() {
  fetch(randomImageUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const imageUrl = data.message;
      updateDogImage(imageUrl);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('Failed to fetch a random dog image.');
    });
});

// Function to update the dog image on the webpage
function updateDogImage(imageUrl) {
  const dogImage = document.getElementById("dogImage");
  dogImage.src = imageUrl;
  dogImage.alt = "Random Dog Image";
}

// Fetch all dog breeds and populate the dropdown
fetch(breedListUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const breeds = Object.keys(data.message);
    const breedSelect = document.getElementById("breedSelect");
    
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed;
      option.textContent = breed;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
    alert('Failed to fetch dog breeds.');
  });

// Handle form submission to fetch and display breed images
document.getElementById("breedForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const selectedBreed = document.getElementById("breedSelect").value;
  const imageUrl = `${breedImagesUrl}${selectedBreed}/images/random`;

  fetch(imageUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const imageUrl = data.message;
      displayImage(imageUrl);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('Failed to fetch dog image.');
    });
});

// Function to display the breed image in a card format
function displayImage(imageUrl) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = `
    <div class="col-md-6 offset-md-3">
      <div class="card mb-3">
        <img src="${imageUrl}" class="card-img-top" alt="Dog Image">
        <div class="card-body">
          <h5 class="card-title text-center">Dog Image</h5>
        </div>
      </div>
    </div>
  `;
}

// Fetch all dog breeds and populate buttons in breeds container
function fetchAndDisplayBreeds() {
  fetch(breedListUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const breeds = Object.keys(data.message);
      const breedsContainer = document.getElementById("breedsContainer");
      breedsContainer.innerHTML = ""; // Clear previous content

      breeds.forEach(breed => {
        const button = document.createElement("button");
        button.textContent = breed;
        button.classList.add("btn", "btn-outline-secondary", "me-2", "mb-2");
        button.addEventListener("click", function() {
          alert(`You clicked on breed: ${breed}`);
          // Additional actions can be added here
        });
        breedsContainer.appendChild(button);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('Failed to fetch dog breeds.');
    });
}

// Event listener for the "Show All Breeds" button
document.getElementById("showAllBreedsButton").addEventListener("click", function() {
  fetchAndDisplayBreeds();
});
