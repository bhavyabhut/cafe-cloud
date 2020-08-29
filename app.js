const cafeList = document.querySelector('#cafe-list')

const renderCafe = (doc)=>{
    const data = doc.data()
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')

    li.setAttribute('data-id',doc.id)
    name.innerHTML = data.name;
    city.innerHTML = data.city;

    li.append(name,city);
    cafeList.append(li)

}

db.collection('cafe-cloud').get().then(res=>{
    res.docs.forEach(doc=>{
        renderCafe(doc)
    })
})

