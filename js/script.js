let jsonData

function fetchData(url){
    return fetch(url)
    .then(response => response.json())
    
}

function generateHTML (data){
    data.forEach(element => {
        let personFirstName = element.name.first
        let personLastName = element.name.last
        let personEmail = element.email
        let personCity = element.location.city
        let personImage = element.picture.thumbnail 

        console.log(personFirstName, personLastName, personEmail, personCity, personImage);
    });

}

fetchData('https://randomuser.me/api/?results=12')
    .then(data => data.results)
    .then(generateHTML);

    //console.log(jsonData);