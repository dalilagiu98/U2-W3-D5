// DEFINING VARIABLES

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzg2MjE4N2U1YzAwMTgxNGM1ZmUiLCJpYXQiOjE3MDU2NTQzNzAsImV4cCI6MTcwNjg2Mzk3MH0.7HZwlhGTX4c0itCLXidB061AjSxk0uvTzQQJxOn6Tv4";
const myURL = "https://striveschool-api.herokuapp.com/api/product/";

// GETTING ID
const cardId = new URLSearchParams(window.location.search).get("id");
console.log("cardid", cardId);
// GENERATE CARD

const generateDetails = function () {
  fetch(myURL + "/" + cardId, {
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(myURL + "/" + cardId);
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
      const row = document.getElementById("row");
      const card = document.createElement("div");
      card.classList.add("col-10");
      card.innerHTML = `
        <div class="card mb-3 mt-3 bg-white text-dark">
        <img src="${data.imageUrl}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title">${data.name}</h3>
            <h4>${data.brand}</h4>
            <p class="card-text">${data.description}</p>
            <h4 class="card-title">${data.price} <i class="bi bi-currency-bitcoin"></i></h4>
            <a href="./backoffice.html?id=${data._id}" class="btn btn-primary">Modify Product</a>
        </div>
    </div>
        `;
      row.appendChild(card);
    })
    .catch((err) => {
      console.log(err);
    });
};

generateDetails();
