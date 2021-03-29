const form = document.querySelector('.search-container');
const cardContainer = document.querySelector('.card-container');
const input = document.querySelector('input');
const message = document.querySelector('.message');
const apiKey = '856d2e9fb4821f934d7f4f931d8b9973';
let cards = [];


function buildCards(city, country, temp, weather, icon) {
    const newCard = document.createElement('li');
    newCard.classList.add('location');

    const htmlCode = `
        <h2 class="city">${city}</h2>
        <span class="country">${country}</span>
        <p>${Math.round(temp)}C°</p>
        <i class="fas fa-times"></i>
        <img src="${icon}" alt="${weather[0]["description"]}">
    `
    newCard.innerHTML = htmlCode;
    cardContainer.appendChild(newCard);
    newCard.querySelector('.fa-times').addEventListener('click', () => deleteCard(city));
}


function getWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

            buildCards(name, sys.country, main.temp, weather, icon);
            
            cards.push(data);
            localStorage.setItem('cards', JSON.stringify(cards));
        })
        .catch((error) => {
            message.textContent = 'Please search for a valid city~ :(';
        });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.textContent = '';
    let inputVal = input.value;

    const locationList = [...cardContainer.querySelectorAll('.card-container .location')];
    // decide whether there are repeated searches
    if (locationList.length > 0) {
        const filteredList = locationList.filter(el => {
          let content = "";
          if (inputVal.includes(",")) {
            if (inputVal.split(",")[1].length > 2) {
                inputVal = inputVal.split(",")[0];
                content = el.querySelector(".city").textContent.toLowerCase();
            } else {
              content = el.querySelector(".city").dataset.name.toLowerCase();
            };
          } else {
            content = el.querySelector(".city").textContent.toLowerCase();
          }
          return content == inputVal.toLowerCase();
        });


        if(filteredList.length > 0) {
            message.textContent = `You already know the weather for ${filteredList[0].querySelector(".city").textContent}...please try another one~`;
            form.reset();
            input.autofocus;
            return;
        }
    };

    // AJAX
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    getWeather(url);

    form.reset();
    input.focus();
});

function fetchCards() {
    cardContainer.textContent = '';
    if(localStorage.getItem('cards')) {
        cards = JSON.parse(localStorage.getItem('cards'));
        cards.forEach((card) => {
            const { main, name, sys, weather } = card;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            buildCards(name, sys.country, main.temp, weather, icon);
        })
    };
    
}


function deleteCard(city) {
    cards.forEach((card, i) => {
        if (card.name == city) {
          cards.splice(i, 1);
        };
    });

    localStorage.setItem('cards', JSON.stringify(cards));
    fetchCards();
}




fetchCards();

