const getCategories = async () => {
  const { data } = await axios.get(
    "https://dummyjson.com/products/category-list"
  );
  return data;
};

const displayCategories = async () => {
  const loader = document.querySelector(".loader-container");
  loader.classList.add("active");
  try {
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
  } catch (error) {
    document.querySelector(
      ".categories .row"
    ).innerHTML = `<p>error loading</p>`;
  } finally {
    loader.classList.remove("active");
  }
};

const getProducts = async (page) => {
  const skip = (page - 1) * 30;
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=30&skip=${skip}`
  );
  return data;
};

const displayProducts = async (page = 1) => {
  const data = await getProducts(page);
  console.log(data);

  let numberofPages = Math.ceil(data.total / 30);
  console.log(numberofPages);
  console.log(`page is ${page}`);
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
  let pagenationLinke = ``;
  if (page == 1) {
    pagenationLinke += `<li class="page-item"><button class="page-link" >&laquo;</button></li>`;
  } else
    pagenationLinke += `<li class="page-item"><button onclick=displayProducts(${
      page - 1
    }) class="page-link" >&laquo;</button></li>`;
  for (let i = 1; i <= numberofPages; i++) {
    pagenationLinke += `<li class="page-item ${
      i == page ? "active" : ""
    }"><button class="page-link" onclick="displayProducts(${i})">${i}</button></li>`;
  }

  if (page == numberofPages) {
    pagenationLinke += `<li class="page-item"><button class="page-link" >&raquo;</button></li>`;
  } else {
    pagenationLinke += `<li class="page-item"><button onclick=displayProducts(${
      page + 1
    }) class="page-link" >&raquo;</button></li>`;
  }

  document.querySelector(".pagination").innerHTML = pagenationLinke;
};

window.onscroll = function () {
  let nav = document.querySelector(".header");
  let categories = document.querySelector(".categories");
  if (window.scrollY > categories.offsetTop) {
    nav.classList.add("scrollnavbar");
  } else {
    nav.classList.remove("scrollnavbar");
  }
};
const countdown = () => {
  const countdownDate = new Date("2025-03-02T00:00:00").getTime();
  const now = new Date().getTime();
  const distance = countdownDate - now;
  const days = (distance / 86400000).toFixed();

  document.querySelector("#days").textContent = days;
  const Hourse = ((distance % 86400000) / 3600000).toFixed();
  document.querySelector("#Hourse").textContent = Hourse;
};
setInterval(() => {
  countdown();
}, 1000);

displayCategories();
displayProducts();
