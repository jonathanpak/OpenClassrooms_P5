function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let root = "http://localhost:3000/api/teddies/";
let id = getUrlParameter("id");
let url = root + id;

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);

    let title = document.querySelector("title");

    let name = document.getElementById("name");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    document.getElementById("imageUrl").src = response.imageUrl;
    let colorList = document.getElementById("color");

    title.innerHTML = response.name + " - Orinoco";
    name.innerHTML = response.name;
    price.innerHTML = response.price / 100;
    description.innerHTML = response.description;

    for (color of response.colors) {
      let option = document.createElement("option");
      option.setAttribute("value", color);
      option.text = color;
      colorList.appendChild(option);
    }

    let addToCart = document.getElementById("addToCart");
    addToCart.onclick = () => {
      let dropdownChoice = document.getElementById("color").value;
      let quantity = document.getElementById("quantity").value;
      let product = {
        id: response._id,
        color: dropdownChoice,
        quantity: quantity,
      };

      //window.localStorage.setItem("product", JSON.stringify(product));
      let products = JSON.parse(window.localStorage.getItem("products"));

      if (products == null) {
        products = { 0: product };
        window.localStorage.setItem("products", JSON.stringify(products));
      } else {
        let productInCart = false;

        for (let i in products) {
          if (
            products[i].color === product.color &&
            products[i].id === product.id
          ) {
            productInCart = true;
          }
          if (productInCart) {
            products[i].quantity =
              Number(products[i].quantity) + Number(product.quantity);
          }
        }

        if (!productInCart) {
          let addOne = Number(Object.keys(products).length);
          addOne++;

          products[addOne] = product;
        }
      }
      window.localStorage.setItem("products", JSON.stringify(products));

      window.location.href = "./panier.html";
    };
  }
};
request.open("GET", url);
request.send();
