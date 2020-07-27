let products = JSON.parse(window.localStorage.getItem("products"));
let totalAmount = 0;
let integerPrice = 0;

const getProductsInCart = () => {
  let productsArray = [];

  for (let i in products) {
    productsArray.push(products[i].id);
  }
  return productsArray;
};

for (let i in products) {
  let root = "http://localhost:3000/api/teddies/";
  let id = products[i].id;
  let url = root + id;

  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      const response = JSON.parse(this.responseText);

      let cart = document.getElementById("cart");

      cart.innerHTML += `
      <tr>
                      <th scope="row" class="border-0">
                        <div class="p-2">
                          <img
                            src="${response.imageUrl}"
                            alt=""
                            width="70"
                            class="img-fluid rounded shadow-sm"
                          />
                          <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0">
                              ${response.name}
                            </h5>
                                          </div>
                        </div>
                      </th>
                      <td class="border-0 align-middle">
                        <strong>${response.price / 100} €</strong>
                      </td>
                      <td class="border-0 align-middle"><strong>${
                        products[i].color
                      }</strong></td>
                      <td class="border-0 align-middle">
                      <strong>${products[i].quantity}</strong>
                    </td>
                      
                    </tr>
      `;

      let total = document.getElementById("total");
      let amount = response.price * products[i].quantity;
      totalAmount += amount;
      integerPrice = totalAmount / 100;
      total.textContent = integerPrice;
    }
  };
  request.open("GET", url);
  request.send();
}

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let address = document.getElementById("address");
let email = document.getElementById("email");
let order = document.getElementById("order");

function validate(field) {
  const regName = /^[a-z ,.'-]+$/i;

  if (regName.test(field)) {
    return true;
  } else {
    return false;
  }
}

function validateAddress(address) {
  // Shoud check if address is correct
  return true;
}

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

let productsArray = [];
const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    const response = JSON.parse(this.responseText);
    getAllProducts(response);
  }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

const getAllProducts = (response) => {
  for (let i in response) {
    productsArray.push(response[i]._id);
  }
  return productsArray;
};

function checkProducts() {
  let productsInCart = getProductsInCart();
  let productsInDatabase = getAllProducts();

  let productsCheckedArray = [];

  3;
  for (product of productsInCart) {
    productsCheckedArray.push(productsInDatabase.includes(product));
  }
  return productsCheckedArray.every((bool) => {
    return (bool = true);
  });
}

function checkUserData() {
  let firstnameChecked;
  let lastnameChecked;
  let addressChecked;
  let cityChecked;
  let emailChecked;

  if (firstname.value && validate(firstname.value)) {
    firstnameChecked = true;
  } else {
    firstnameChecked = false;
  }

  if (lastname.value && validate(lastname.value)) {
    lastnameChecked = true;
  } else {
    lastnameChecked = false;
  }

  if (address.value && validateAddress(address.value)) {
    addressChecked = true;
  } else {
    addressChecked = false;
  }

  if (city.value && validate(city.value)) {
    cityChecked = true;
  } else {
    cityChecked = false;
  }

  if (email.value && validateEmail(email.value)) {
    emailChecked = true;
  } else {
    emailChecked = false;
  }

  if (
    firstnameChecked &&
    lastnameChecked &&
    addressChecked &&
    cityChecked &&
    emailChecked
  ) {
    return true;
  } else {
    return false;
  }
}

function checkUserInput() {
  if (checkProducts() && checkUserData()) {
    return true;
  } else {
    return false;
  }
}

order.addEventListener("click", function (event) {
  event.preventDefault();
  if (checkUserInput()) {
    let order = {
      contact: {
        firstName: firstname.value,
        lastName: lastname.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: getProductsInCart(),
    };

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        const response = JSON.parse(this.responseText);
        sessionStorage.setItem("firstname", response.contact.firstName);
        sessionStorage.setItem("orderId", response.orderId);
        sessionStorage.setItem("total", integerPrice);

        window.location.href = "./merci.html";
      }
    };

    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(order));
  }
});
