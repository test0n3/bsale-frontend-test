const categorySpace = document.getElementById("categories");
const productSpace = document.getElementById("products");
const mainURL = `https://bsale-backend-test1.herokuapp.com`;

const fetchCategories = () => {
  const promises = [];
  const url = mainURL + `/categories`;
  promises.push(fetch(url).then((res) => res.json()));

  Promise.all(promises).then((results) => {
    // console.log("results:", results);
    const categories = results[0].map((category) => ({
      id: category.id,
      name: category.name,
    }));
    displayCategories(categories);
  });
};

const fetchProducts = () => {
  const promises = [];
  const url = mainURL + `/products`;
  promises.push(fetch(url).then((res) => res.json()));

  Promise.all(promises).then((results) => {
    // console.log("results:", results);
    const products = results[0].map((product) => ({
      id: product.id,
      name: product.name,
      url_image: product.url_image,
      price: product.price,
      discount: product.discount,
      category: product.category.name,
    }));
    displayProducts(products);
  });
};

const displayCategories = (categories) => {
  console.log("displayCategories:", categories);
  const categoriesHTMLString = categories
    .map(
      (category) =>
        `<li class='category' id='${category.id}'>
        <a href="${mainURL}/products?product_filter[category]=${category.id}">${category.name}</a>
        </li>`
    )
    .join("");
  categorySpace.innerHTML = categoriesHTMLString;
};

const displayProducts = (products) => {
  console.log("displayProducts:", products);
  const productsHTMLString = products
    .map((product) => {
      const productImage =
        product.url_image == null || product.url_image.length == 0
          ? `<div class="placeholder"></div>`
          : `<img src="${product.url_image}" />`;
      return `<li class='product' id='${product.id}'>
        ${productImage}
      <article>
      <p class='product-title'>${product.name.toUpperCase()}</p>
      <ul class='product-details'>
      <li><span>Precio:</span> S/ ${product.price}</li>
      <li><span>Descuento:</span> S/ ${product.discount}</li>
      </ul>
      </li>
      </article>`;
    })
    .join("");
  productSpace.innerHTML = productsHTMLString;
};

const App = () => {
  fetchCategories();
  fetchProducts();
};

App();
