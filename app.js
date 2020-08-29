const cafeList = document.querySelector("#cafe-list");
const cafeForm = document.querySelector("#add-cafe-form");
const renderCafe = (doc) => {
  const data = doc.data();
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.innerHTML = data.name;
  city.innerHTML = data.city;

  li.append(name, city);
  cafeList.append(li);
};

db.collection("cafe-cloud")
  .get()
  .then((res) => {
    res.docs.forEach((doc) => {
      renderCafe(doc);
    });
  });
const postData = (e) => {
  e.preventDefault();
  if (cafeForm.city.value.trim() === "" || cafeForm.cafe.value.trim() === "") {
    alert("No null value allowed ");
    return;
  }
  db.collection("cafe-cloud")
    .add({
      city: cafeForm.city.value,
      name: cafeForm.cafe.value,
    })
    .then((res) => {
        alert('Congo!!! SusseccFull added')
      cafeForm.city.value = "";
      cafeForm.cafe.value = "";
    })
    .catch(()=>alert("Somethings went wrong try again"));
};

cafeForm.addEventListener("submit", postData);
