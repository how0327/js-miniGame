
function loadProucts() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.products);
}

function displayProducts(products) {
  const container = document.querySelector('.products');
  container.innerHTML = products.map(products => createHTMLString(products)).join('');
}

function createHTMLString(products) {
  return `
  <li class="product">
      <img src="${products.image}" alt="${products.type}" class="product_img">
      <span class="product_info">${products.gender}, ${products.size}</span>
    </li>
  `;
}

function onButtonClick(event, products) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if ( key == null || value == null) {
      return;
    }

    const filtered = products.filter(product => product[key] === value);
    displayProducts(filtered);
  
}

function setEventListeners(products) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.nav');
  logo.addEventListener('click', () => displayProducts(products));
  buttons.addEventListener('click', event => onButtonClick(event, products));
}

// main
loadProucts() 
  .then(products => {
    displayProducts(products);
    setEventListeners(products);
  })
  .catch(console.log);