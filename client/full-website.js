const url = "http://localhost:8000/api/cars";
var isNewCar = false;

async function prepareToEdit(id) {
  sessionStorage.setItem("car", id);
  await getById(id);
  // window.location.href = "edit.html";
}

async function enterData() {
  if (isNewCar) await addCar();
  else {
    const id = sessionStorage.getItem("car");
    await updateCar(id);
  }
  cancel();
  await getAll();
}

function cancel() {
  document.querySelector("#editModalWrapper").style = "display:none";
  document.body.style = "overflow:auto";
}

// Get All Cars.
const getAll = async () => {
  if (sessionStorage.getItem("isLogin") === "false") {
    logout();
  }
  document.querySelector(
    "#userInfo span"
  ).innerHTML = `Hello &nbsp;&nbsp;&nbsp;<i><b>${sessionStorage.getItem(
    "user"
  )}</b></i>`;

  const response = await fetch(url);

  if (response.ok) {
    const cars = await response.json();
    const table = document.querySelector("#tab").querySelector("tbody");
    table.innerHTML = "";

    cars.forEach((car) => {
      const elTr = document.createElement("tr");
      elTr.innerHTML = `
                        <td>${car.model}</td>
                        <td style='color: ${car.color};'>${car.color}</td>
                        <td>${car.numOfWheels}</td>
                        <td><div onclick="prepareToEdit('${car._id}')">Edit</div></td>
                        <td><div class="danger" onclick="deleteCar('${car._id}')">Delete</div></td>

                    `;
      table.append(elTr);
    });
  }
};

// Get By Id.
const getById = async (id) => {
  const response = await fetch(`${url}/${id}`);

  if (response.ok) {
    document
      .querySelector("#editModalWrapper")
      .querySelector("header").innerText = "Edit";
    document.querySelector("#editModalWrapper").style = "display:flex";
    document.body.style = "overflow:hidden";

    const car = await response.json();

    document.getElementById("model").value = car.model;
    document.getElementById("color").value = car.color;
    document.getElementById("numOfWheels").value = car.numOfWheels;
    console.log(car.model);
  }
};

// Add A new Car
const addCar = async () => {
  const newCar = {
    model: document.getElementById("model").value,
    color: document.getElementById("color").value,
    numOfWheels: document.getElementById("numOfWheels").value,
  };

  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar),
  });

  if (response.ok) console.log("Added successfully");
  else    console.log("Error");

  isNewCar = false;
};

// Update a Car
const updateCar = async (id) => {
  const updatedCar = {
    model: document.getElementById("model").value,
    color: document.getElementById("color").value,
    numOfWheels: +document.getElementById("numOfWheels").value,
  };

  const response = await fetch(`${url}/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCar),
  });
  console.log(updatedCar);

  if (response.ok) console.log("Updeted successfully");   
  else    console.log("Error");
};

// Delete an Existing car
const deleteCar = async (id) => {
  console.log(id);
  const response = await fetch(`${url}/${id}`, {
    method: "delete",
  });

  if (response.ok) {
    alert("You deleted the Car");
    console.log("Deleted successfully");
    await getAll();
  }
  else    console.log("Error");
};

function addData() {
  isNewCar = true;
  document
    .querySelector("#editModalWrapper")
    .querySelector("header").innerText = "Add New Car";
  document.querySelector("#editModalWrapper").style = "display:flex";
  document.body.style = "overflow:hidden";

  document.querySelectorAll("input").forEach((val) => {
    val.value = "";
  });
}

const logout = () => {
  sessionStorage.setItem("isLogin", false);
  window.location.replace("login.html");
};
