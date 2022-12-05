// Your code here

// get

let idd;
let currentVotes = 0;
let newVote = 0;

function getNames() {
  fetch("http://localhost:3000/characters/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //  console.log(data[1].name);

      for (let i = 0; i < data.length; i++) {
        let sp = document.createElement("span");
        sp.innerHTML = data[i].name;
        let p = document.createElement("p");
        p.appendChild(sp);
        document.getElementById("character-bar").appendChild(p);

        p.addEventListener("click", () => {
          console.log(data[i].name + " Votes - " + data[i].votes);

          let img = document.getElementById("image");
          let char_name = document.getElementById("name");
          img.src = data[i].image;
          idd = data[i].id;
          currentVotes = data[i].votes;

          let voteD = document.getElementById("vote-count");
          voteD.innerText = data[i].votes;
          char_name.innerText = data[i].name;
        });

        // update votes
      }
    });
}

let btn = document.getElementById("votes-form");
btn.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.getElementById("votes").value;

  newVote = parseInt(currentVotes) + parseInt(input);

  updateVote(input, newVote);
  //alert(currentVotes);
});

// reset
let btnReset = document.getElementById("reset-btn");
btnReset.addEventListener("click", () => {
  updateVote(0, 0);
  //   alert("currentVotes");
});

function updateVote(input, newVote) {
  //console.log(newVote);
  // alert(review)
  fetch("http://localhost:3000/characters/" + idd, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ votes: newVote }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let voteD = document.getElementById("vote-count");
      voteD.innerText = newVote;

      currentVotes = newVote;
    });
}

getNames();

// adding new character
fmm = document.getElementById("character-form");
fmm.addEventListener("submit", (e) => {
//   e.preventDefault();
  let img = document.getElementById("image-url").value;
  let name = document.querySelector('#character-form').querySelector('#name').value

  if(img === "" || name === ""){
      alert('Fill all the fields')
      return
  }
  addCharacter(img, name);
    // alert(name+" img - "+img)
});

function addCharacter(img, name) {
  fetch("http://localhost:3000/characters/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ 
        name: name,
        votes : 0,
        image : img 
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            let sp = document.createElement("span");
            sp.innerHTML = data[i].name;
            let p = document.createElement("p");
            p.appendChild(sp);
            document.getElementById("character-bar").appendChild(p);
        }
    });
}
