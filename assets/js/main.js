const getCategories = async () => {
  const { data } = await axios.get(
    "https://dummyjson.com/products/category-list"
  );
  return data;
};

const displayCategories = async () => {
  const categories = await getCategories();
  const result = categories
    .map((categort) => {
      return `<div class = "category">
   <h4> ${categort}</h4>
   <a href="categoryDetails.html?category=${categort}">Details<a/>
    </div>`;
    })
    .join("");
  document.querySelector(".categories .row").innerHTML = result;
};

const getProducts = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data;
};

const displayProducts = async () => {
  const data = await getProducts();
  console.log(data);

  const result = data.products
    .map((product) => {
      return `<div class = "product">
      <img src=${product.thumbnail} alt = "${product.description}">
    <h3>${product.title}</h3>
    <span>${product.price}</span>
    </div>`;
    })
    .join("");
  document.querySelector(".Products .row").innerHTML = result;
};

displayCategories();
displayProducts();
