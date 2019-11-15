const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const script = document.querySelector('script');


function fetchData(url){
    return fetch(url)
    .then(response => response.json())
}

function generateHTML (data){
    console.log(data);
    const modalDiv = document.createElement('div');
    body.insertBefore(modalDiv, script);

    data.forEach(element => {

        let galleryHTML = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${element.picture.thumbnail} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${element.name.first} ${element.name.last}</h3>
            <p class="card-text">${element.email}</p>
            <p class="card-text cap">${element.location.city}, ${element.location.state}</p>
        </div>
    </div>`

    gallery.innerHTML += galleryHTML;
        
    });

    let modalHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" alt="profile picture">
                <h3 id="name" class="modal-name cap"></h3>
                <p class="modal-text"></p>
                <p class="modal-text cap"></p>
                <hr>
                <p class="modal-text"></p>
                <p class="modal-text"></p>
                <p class="modal-text">Birthday: </p>
            </div>
        </div>`

    modalDiv.innerHTML = modalHTML;
    modalDiv.style.display = 'none'
   return data
}

function addData(data) {
    let modalHtmlArray = [];
    
    data.forEach(element => {
        let modalData = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${element.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${element.name.first} ${element.name.last}</h3>
                <p class="modal-text">${element.email}</p>
                <p class="modal-text cap">${element.location.city}, ${element.location.state}</p>
                <hr>
                <p class="modal-text">${element.cell}</p>
                <p class="modal-text">${element.location.street.number} ${element.location.street.name} ${element.location.city}, ${element.location.state} ${element.location.postcode}</p>
                <p class="modal-text">Birthday: ${element.dob.date}</p>
            </div>
        </div>`

        modalHtmlArray.push(modalData);
    })
    

   return modalHtmlArray
}

function addHTML(data){
    
    const modalDiv = body.children[2];
    
    for (var i = 0, len = gallery.children.length; i < len; i++)
    {
    
        (function(index){
            gallery.children[i].onclick = function(){
                modalDiv.style.display = 'inherit';
                modalDiv.className = "modal-container";
                modalDiv.innerHTML = data[index];
                closeModal()
                
            }    
        })(i);
    
    }
    return modalDiv;
   
}


function closeModal(){
    
    const closeButton = document.querySelector('.modal-close-btn');
    closeButton.addEventListener('click', (data) => {
        
        body.children[2].style.display = 'none';
    }
    )
};


fetchData('https://randomuser.me/api/?results=12')
    .then(data => data.results)
    .then(generateHTML)
    .then(addData)
    .then(addHTML)
    //.then(closeModal)

    