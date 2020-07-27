var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);

    let content = document.getElementById("content");

    for (let i in response) {
      console.log(response[i]._id);
      content.innerHTML += `
      <div class="col-lg-4 col-sm-6 mb-4">
          <div class="card h-100">
            <a href="./produit.html?id=${response[i]._id}"
              ><img
                class="card-img-top"
                src="${response[i].imageUrl}"
                alt=""
            /></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="./produit.html?id=${response[i]._id}">${response[i].name}</a>
              </h4>
              <p class="card-text">
              ${response[i].description}
              </p>
            </div>
          </div>
        </div>`;
    }
  }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
