const cafeList = document.querySelector("#cafe-list");
const cafeForm = document.querySelector("#add-cafe-form");

const deleteData  = (e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id')
    db.collection('cafe-cloud').doc(id).delete();
}
const renderCafe = (doc) => {
  const data = doc.data();
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement('div');

  li.setAttribute("data-id", doc.id);
  name.innerHTML = data.name;
  city.innerHTML = data.city;
  cross.textContent = 'x';
  cross.addEventListener('click',deleteData)

  li.append(name, city,cross);
  cafeList.append(li);
};

// db.collection("cafe-cloud")
//     .where('city','==','Rajkot')
//   .get()
//   .then((res) => {
//     res.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });


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
      cafeForm.city.value = "";
      cafeForm.cafe.value = "";
    })
    .catch(()=>alert("Somethings went wrong try again"));
};

cafeForm.addEventListener("submit", postData);

//real time update
db.collection("cafe-cloud")
    .orderBy('city')
  .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges()
      changes.forEach(change =>{
          if(change.type === 'added'){
              renderCafe(change.doc)
          }
          else if (change.type ==='removed' ){
              let li = cafeList.querySelector(`[data-id=${change.doc.id}]`)
                li.remove();
          }
      })
  })
