
    fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => data.results)
    .then(generateHTML)
    .then(addData)
    .then(addHTML) 
    
/*
    global variables
*/
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const script = document.querySelector('script');

/*
    function to fetch data and update dom with thrown error
*/
function fetchData(url){
        return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch((response) => {
            const pageHeader = document.getElementsByClassName('header-text-container');
            pageHeader[0].children[0].textContent = response;
            pageHeader[0].children[0].style.color = 'red';

        })
    }

/*
    function to update the HTML once data is received. Also adds hidden HTML for modals. returns JSON data
*/

function generateHTML (data){
    const modalDiv = document.createElement('div');
    body.insertBefore(modalDiv, script);

    data.forEach(element => {
        
        const galleryHTML = `<div class="card">
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

    const modalHTML = `
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

/*
    function to add json data for modal html to an arry to later call onclick on the specific card. returns the array of modalHTML
*/

function addData(data) {
    let modalHtmlArray = [];
    
    data.forEach(element => {
        const dobYear = element.dob.date.slice(0, 4);
        const dobMonth = element.dob.date.slice(5,7);
        const dobDay = element.dob.date.slice(8, 10);
        const formattedDob = `${dobMonth}-${dobDay}-${dobYear}`
        
        const modalData = `
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
                <p class="modal-text">Birthday: ${formattedDob}</p>
            </div>
        </div>`

        modalHtmlArray.push(modalData);
    })
    

   return modalHtmlArray
}

/*
    function to add modal HTML on click event. loops through gallery children to add event listener and populate HTML 
*/

function addHTML(data){
    
    const modalDiv = body.children[2];
    
    for (var i = 0, len = gallery.children.length; i < len; i++)
    {
    
        (function(i){
            gallery.children[i].onclick = function(){
                modalDiv.style.display = 'inherit';
                modalDiv.className = "modal-container";
                modalDiv.innerHTML = data[i];
                closeModal()
                
            }    
        })(i);
    
    }
    
   
}

/*
    helper function added to modal to close it when 'x' is clicked
*/
function closeModal(){
    
    const closeButton = document.querySelector('.modal-close-btn');
    closeButton.addEventListener('click', (data) => {
        
        body.children[2].style.display = 'none';
    }
    )
};

/* 
function to handle HTTP errors
*/

function checkStatus(response){
    if (response.ok) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(`${response.status} -- ${response.statusText}`))
    }
}



    

    