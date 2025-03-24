// index.js

function displayRamens() {
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        const ramenMenu = document.getElementById('ramen-menu');
        ramens.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
          img.dataset.id = ramen.id; // Store ID for later use
          img.addEventListener('click', () => handleClick(ramen));
          ramenMenu.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching ramens:', error));
  }
  
  function handleClick(ramen) {
    const detailDiv = document.getElementById('ramen-detail');
    detailDiv.innerHTML = `
      <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
      <h2 class="name">${ramen.name}</h2>
      <h3 class="restaurant">${ramen.restaurant}</h3>
    `;
    document.getElementById('rating-display').textContent = ramen.rating;
    document.getElementById('comment-display').textContent = ramen.comment;
  }
  
  function addSubmitListener() {
    const form = document.getElementById('new-ramen');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const newRamen = {
        name: form.querySelector('#new-name').value,
        restaurant: form.querySelector('#new-restaurant').value,
        image: form.querySelector('#new-image').value,
        rating: form.querySelector('#new-rating').value,
        comment: form.querySelector('#new-comment').value
      };
  
      const ramenMenu = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = newRamen.image;
      img.alt = newRamen.name;
      img.addEventListener('click', () => handleClick(newRamen));
      ramenMenu.appendChild(img);
  
      form.reset(); // Clear the form after submission
    });
  }
  
  function main() {
    displayRamens();
    addSubmitListener();
  }
  
  // Start the app when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', main);