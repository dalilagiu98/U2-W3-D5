// DEFINING VARIABLES

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzg2MjE4N2U1YzAwMTgxNGM1ZmUiLCJpYXQiOjE3MDU2NTQzNzAsImV4cCI6MTcwNjg2Mzk3MH0.7HZwlhGTX4c0itCLXidB061AjSxk0uvTzQQJxOn6Tv4";
const myURL = "https://striveschool-api.herokuapp.com/api/product/";

// FUNCTION TO DISPLAY CARDS:

const generateCards = function (array) {
  array.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("col-6", "col-md-4");
    card.innerHTML = `
        <div class="card bg-white text-dark h-100 ">
            <img src="${product.imageUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.name}- ${product.brand}</h5>
                <p class="card-text">${product.price} <i class="bi bi-currency-bitcoin"></i></p>
                <a href="./details.html?id=${product._id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
        `;
    const row = document.getElementById("products-row");
    row.appendChild(card);
  });
};

// FUNZIONE PER STAMPARE ANNO CORRENTE

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// REQUEST
const getProduct = function () {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "inline";
  fetch(myURL, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Bad request");
        } else if (response.status === 401) {
          throw new Error("401 - Unauthorized");
        } else if (response.status === 404) {
          throw new Error("404 - Not found");
        } else if (response.status === 500) {
          throw new Error("500 - Internal server error");
        } else {
          throw new Error("Another type of error");
        }
      }
    })
    .then((data) => {
      console.log(data);
      generateCards(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingIndicator.style.display = "none";
    });
};

getProduct();
