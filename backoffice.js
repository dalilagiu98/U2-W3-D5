// DOM REFERENCES
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const inputBrand = document.getElementById("input-brand");
const inputImage = document.getElementById("input-image");
const inputPrice = document.getElementById("input-price");
const form = document.getElementById("form");

// MY VARIABLES
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzg2MjE4N2U1YzAwMTgxNGM1ZmUiLCJpYXQiOjE3MDU2NTQzNzAsImV4cCI6MTcwNjg2Mzk3MH0.7HZwlhGTX4c0itCLXidB061AjSxk0uvTzQQJxOn6Tv4";
const myURL = "https://striveschool-api.herokuapp.com/api/product/";

// TO DISPLAY MODIFY SECTION
const myId = new URLSearchParams(window.location.search).get("id");
// CONFIRM TO DELETE
const confirmDelete = function () {
  if (confirm("Are you sure to delete?")) {
    console.log("cancellazione eseguita");
    // EVENT LISTENER ON DELETE
    document
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", function () {
        fetch(myURL + "/" + myId, {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("deleted!");
              location.assign("./homepage.html"); //riporta utente alla home
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
          .catch((err) => {
            alert(err);
            console.log(err);
          });
      });
  } else {
    console.log("cancellazione annullata");
  }
};

if (myId) {
  document.getElementById("form-title").innerText =
    "Modify your own product below";
  const deleteButton = document.createElement("button");
  deleteButton.onclick = confirmDelete;
  const btnGroup = document.getElementById("btn-group");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.innerText = "Delete";
  btnGroup.appendChild(deleteButton);

  // FETCH FOR PUPULATING INPUT

  fetch(myURL + "/" + myId, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Error in loading form informations!");
      }
    })
    .then((data) => {
      inputName.value = data.name;
      inputBrand.value = data.brand;
      inputDescription.value = data.description;
      inputImage.value = data.imageUrl;
      inputPrice.value = data.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

// EVENT LISTENER ON SUBMIT (TO POST) FORM

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: inputName.value,
    description: inputDescription.value,
    brand: inputBrand.value,
    imageUrl: inputImage.value,
    price: inputPrice.value,
  };

  let urlToUse;
  let methodToUse;

  if (myId) {
    methodToUse = "PUT";
    urlToUse = myURL + "/" + myId;
  } else {
    methodToUse = "POST";
    urlToUse = myURL;
  }

  console.log("prodotto", newProduct);

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct), // il body in una fetch può essere SOLAMENTE una stringa
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Product saved!");
        // svuoto il form
        inputName.value = "";
        inputDescription.value = "";
        inputBrand.value = "";
        inputImage.value = "";
        inputPrice.value = "";
      } else {
        alert("Something went wrong...");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// FUNZIONE PER STAMPARE ANNO CORRENTE

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;
// ADD EVENT LISTENER ON RESET BUTTON

// Funzione per confermare il reset
function confirmReset() {
  if (confirm("Sei sicuro di voler eseguire il reset?")) {
    // Se l'utente conferma, esegui l'operazione di reset del form
    const backofficeForm = document.getElementById("form");
    backofficeForm.reset();
    console.log("Reset eseguito");
  } else {
    // Se l'utente annulla, non fare nulla o esegui azioni aggiuntive
    console.log("Reset annullato");
  }
}
