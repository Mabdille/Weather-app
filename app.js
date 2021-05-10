window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;



            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=e16d6f5f468ba4096b04c25d6346dbb8`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);



                    const {
                        feels_like
                    } = data.main;

                    const {
                        description
                    } = data.weather[0];

                    const {
                        icon
                    } = data.weather[0];

                    // const icn = `http://openweathermap.org/img/wn//${icon}@2x.png`;

                    //Set DOM elements from the API
                    temperatureDegree.textContent = feels_like;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
                    // locationIcon.textContent = icn;
                });
        });
    }
}); 

