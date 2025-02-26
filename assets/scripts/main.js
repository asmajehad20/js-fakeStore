async function fetchCategories() {

  try {

      const response = await axios.get('https://fakestoreapi.com/products/categories');

      displayCategories(response.data);
  } catch (error) {
      console.error("Failed:", error);
      document.querySelector('.categoriesList').innerHTML = `<p>Error loading categories. Please try again.</p>`;
  } finally {
  }
}

function displayCategories(categories) {
  const categoryContainer = document.querySelector('.categoriesList');
  categoryContainer.innerHTML = categories.map(category => {
    const formattedCategory = category
      .toLowerCase()
      .replace(/'/g, "") 
      .replace(/\s+/g, '-');
    return `<div class="card" onclick="goToPage(&quot;${formattedCategory}&quot;)">${category}</div>`;
  }).join('');
}



fetchCategories();

window.goToPage = function(category) {
  const decodedCategory = decodeURIComponent(category);
  window.location.href = `../${decodedCategory}.html`;
};


