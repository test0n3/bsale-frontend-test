const categorySpace = document.getElementById("categories");
const productSpace = document.getElementById("products");
const mainURL = `https://bsale-backend-test1.herokuapp.com`;

const fetchCategories = () => {
  const promises = [];
  const url = mainURL + `/categories`;
  promises.push(fetch(url).then((res) => res.json()));

  Promise.all(promises).then((results) => {
    const categories = results[0].map((category) => ({
      id: category.id,
      name: category.name,
    }));
    displayCategories(categories);
  });
};

const fetchProducts = (newUrl) => {
  const promises = [];
  let url = mainURL + `/products`;
  if (newUrl != null) url = url + newUrl;
  promises.push(fetch(url).then((res) => res.json()));

  Promise.all(promises).then((results) => {
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
  categories.unshift({ id: 0, name: "todos" });
  const categoriesHTMLString = categories
    .map(
      (category) =>
        `<li class='category' id='category${category.id}'>
        <a href=''>${
          category.name[0].toUpperCase() + category.name.slice(1)
        }</a>
        </li>`
    )
    .join("");
  categorySpace.innerHTML = categoriesHTMLString;
};

const displayProducts = (products) => {
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
      <p class='product-category'>${product.category}</p>
      <ul class='product-details'>
      <li><span>Precio:</span> S/ ${product.price}</li>
      <li><span>Descuento:</span> S/ ${product.discount}</li>
      </ul>
      </li>
      </article>`;
    })
    .join("");
  productSpace.innerHTML = productsHTMLString;
  categoryListener();
};

const categoryListener = () => {
  const allCategories = document
    .getElementById("categories")
    .querySelectorAll("li");
  allCategories.forEach((category) => {
    category.addEventListener("click", (event) => {
      event.preventDefault();
      let categoryId = category.id.replace("category", "");
      if (categoryId == "0") fetchProducts();
      else fetchProducts(`?product_filter[category]=${categoryId}`);
    });
  });
};

const orderingListener = () => {
  const orderingSpace = document.getElementById("productFilterOrdering");
  orderingSpace.addEventListener("change", (event) => {
    event.preventDefault();
    fetchProducts(`?product_filter[ordering]=${event.target.value}`);
  });
};

const searchListener = () => {
  const productFilterTerms = document.getElementById("productFilterTerms");
  productFilterTerms.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      console.log("productFilterTerms:", productFilterTerms.value);
      fetchProducts(`?product_filter[terms]=${productFilterTerms.value}`);
      productFilterTerms.value = "";
    }
  });
};

const App = () => {
  fetchCategories();
  fetchProducts();
  orderingListener();
  searchListener();
};

App();
