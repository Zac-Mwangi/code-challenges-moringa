// Code here

// See the first beer's details, including its **name, image, description, and reviews**, when the page loads

let rv = [];
let idd = 2;
function getFirstBeer() {
  fetch("http://localhost:3000/beers/2")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      // setting the names
      let beer_name = document.getElementById("beer-name");
      let description = document.getElementById("beer-description");
      let image = document.getElementById("beer-image");
      let reviewss = document.getElementById("review-list");

      beer_name.innerText = data.name;
      description.innerText = data.description;
      image.src = data.image_url;

      reviewss.innerHTML = "";

      for (let i = 0; i < data.reviews.length; i++) {
        rv.push(data.reviews[i]);
        reviewss.innerHTML += "<li>" + data.reviews[i] + "</li>";
      }

      // console.log(rv)
    });
}

getFirstBeer();

// See a menu of all beers in the `<nav>` element on the left side of the page
// when the page loads. You will need to make a GET request to the following
// endpoint to retrieve the beer data:

function getAllBeerName() {
  fetch("http://localhost:3000/beers/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data[1].name);

      // setting the names
      let beer_name = document.getElementById("beer-list");

      beer_name.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        // beer_name.innerHTML += "<li>" + data[i].name + "</li>";
        let l = document.createElement("li");
        document.getElementById("beer-list").appendChild(l);
        l.innerText = data[i].name;

        l.addEventListener("click", () => {
          // alert(data[i].name)

          idd = data[i].id;
          rv = [];

          // start
          let beer_name = document.getElementById("beer-name");
          let description = document.getElementById("beer-description");
          let image = document.getElementById("beer-image");
          let reviewss = document.getElementById("review-list");

          beer_name.innerText = data[i].name;
          description.innerText = data[i].description;
          image.src = data[i].image_url;

          reviewss.innerHTML = "";

          for (let j = 0; j < data[i].reviews.length; j++) {
            rv.push(data[i].reviews[j]);
            reviewss.innerHTML += "<li>" + data[i].reviews[j] + "</li>";
          }
          // end
        });
      }
    });
}

getAllBeerName();

// Add a new review to the page when the review form is submitted. **No
// persistence is needed**.

let form = document.getElementById("review-form");
form.addEventListener("submit", (e) => {
  //  e.preventDefault();
  let review = document.getElementById("review").value;
  if (review === "") {
    alert("Please insert review");
    return;
  }

  let finalRv = [...rv, review];

  postReview(finalRv);
  //console.log(finalRv)
});

function postReview(review) {
  // alert(review)
  fetch("http://localhost:3000/beers/" + idd, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ reviews: review }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[idd - 1].reviews);
      console.log(data[idd]);

      // setting the names
      let beer_name = document.getElementById("beer-list");

      beer_name.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        beer_name.innerHTML += "<li>" + data[idd - 1].reviews[i] + "</li>";
        console.log(data[idd].reviews[i]);
      }
    });
}

// update description

let desForm = document.getElementById("description-form");
desForm.addEventListener("submit", (e) => {
  //  e.preventDefault();
  let description = document.getElementById("description").value;
  if (description === "") {
    alert("Please insert description");
    return;
  }

  updateDescr(description);
  // console.log(description)
});

function updateDescr(description) {
  // alert(description)

  fetch("http://localhost:3000/beers/" + idd, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ description: description }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data[1].name);

      // setting the names
      let P = document.getElementById("beer-description");

      P.innerText = data[idd - 1].description;
    });
}