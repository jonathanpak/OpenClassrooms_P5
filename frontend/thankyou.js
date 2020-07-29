let getFirstname = window.sessionStorage.getItem("firstname");
let getOrderId = window.sessionStorage.getItem("orderId");
let getTotal = window.sessionStorage.getItem("total");

let firstname = document.getElementById("firstname");
let orderId = document.getElementById("orderId");
let total = document.getElementById("total");

firstname.innerHTML = getFirstname;
orderId.innerHTML = getOrderId;
total.innerHTML = getTotal;

const emptyCart = () => {
  if (getFirstname && getOrderId && getTotal) {
    localStorage.clear();
    sessionStorage.clear();
  }
};

emptyCart();
