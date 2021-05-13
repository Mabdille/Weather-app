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



            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);


                    // const { temperature, summary } = data.currently;

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
                    locationIcon.textContent = icn;
                });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        Skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}); 

