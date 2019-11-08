
function fetchData(url){
    return fetch(url)
    .then(response => response.json())
}

function generateHTML (data){
    const gallery = document.getElementById('gallery');
    data.forEach(element => {

        let HTML = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${element.picture.thumbnail} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${element.name.first} ${element.name.last}</h3>
            <p class="card-text">${element.email}</p>
            <p class="card-text cap">${element.location.city}, ${element.location.state}</p>
        </div>
    </div>`

    gallery.innerHTML += HTML;
        
    });
   
}

fetchData('https://randomuser.me/api/?results=12')
    .then(data => data.results)
    .then(generateHTML);

    