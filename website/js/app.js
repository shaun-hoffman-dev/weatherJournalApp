
// API Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='; //TODO: Modify this if we choose to allow search by city! Only allowing zip code for now.
const keyApi = '77cc87435493c787caeec8dc4e346e9c';

// Other Globals
const locationField = document.querySelector('#locationField');
const feelingField = document.querySelector('#feelingField');
let entry = {};
let journal = [];

// Testing Variables
entry = {
    city: "Ames",
    country: "US",
    mapURL: "https://www.google.com/maps/@42.04,-93.6,13.5z",
    date: "10/4/2020",
    time: "7:32 PM",
    temperature: "50",
    conditions: "Clear Sky",
    wind: "5.82",
    weatherIconURL: "http://openweathermap.org/img/wn/01n@4x.png",
    mood: "Meh"
};

journal = [
    {
        city: "Ames",
        country: "US",
        mapURL: "https://www.google.com/maps/@42.04,-93.6,13.5z",
        date: "10/4/2020",
        time: "7:32 PM",
        temperature: "50",
        conditions: "Clear Sky",
        wind: "8.82",
        weatherIconURL: "http://openweathermap.org/img/wn/01n@2x.png",
        mood: "Cool"
    },
    {
        city: "Osage",
        country: "US",
        mapURL: "https://www.google.com/maps/@42.04,-93.6,13.5z",
        date: "10/3/2020",
        time: "7:30 PM",
        temperature: "51",
        conditions: "Windy",
        wind: "7.82",
        weatherIconURL: "http://openweathermap.org/img/wn/01n@2x.png",
        mood: "Clever"
    },
    {
        city: "Little Cedar",
        country: "US",
        mapURL: "https://www.google.com/maps/@42.04,-93.6,13.5z",
        date: "10/2/2020",
        time: "7:32 PM",
        temperature: "50",
        conditions: "Rain",
        wind: "6.82",
        weatherIconURL: "http://openweathermap.org/img/wn/01n@2x.png",
        mood: "Sad"
    },
    {
        city: "Rockton",
        country: "US",
        mapURL: "https://www.google.com/maps/@42.04,-93.6,13.5z",
        date: "10/1/2020",
        time: "7:32 PM",
        temperature: "49",
        conditions: "Snow",
        wind: "5.82",
        weatherIconURL: "http://openweathermap.org/img/wn/01n@2x.png",
        mood: "Able Bodied"
    }
];

//On Page Load Activities
    //Get The Current Year for the Footer Copyright
    function currentYear(){
        let year = new Date().getFullYear();
        document.querySelector('#dynamicYear').innerHTML = year;
    };
    currentYear();
    fillPriorEntries();


//PostData Function
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

//Event Handlers
  //Handle Entry Submission
  document.getElementById('submit-btn').addEventListener('click',submitData);


// API Call For OpenWeather
  function submitData(e){
      let zipcode = locationField.value;
      if (zipcode !== ''){  
      console.log(zipcode);
      getForecast(baseUrl, zipcode, keyApi);
      fillEntry();
      showEntry();
      fillPriorEntries();
      } else {
          alert('Please enter a zipcode.'); //TODO: Can replace this w/ more pleasant onscreen message
      }
    }

  const getForecast = async (baseURL, zipcode, key) => {
      const res = await fetch(`${baseURL}${zipcode}&units=imperial&appid=${key}`);
      try {
        const data = await res.json();
        console.log(data);
      } catch(error){
          console.log(error);
      }
  }

  // UI Updates
    //Display the entry when user submits (div is hidden by default)
    function showEntry(){
        document.querySelector('#latestEntry').classList.remove('hidden');
    }

    //Fill the contents of the latest entry
    function fillEntry(){
        let date = new Date().toLocaleDateString('en-US',{ month: 'numeric', day: 'numeric', year: 'numeric' });
        let time = new Date().toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric', hour12: true });
        document.querySelector('#cityCountry').innerHTML = `<a class="nostyle" href="${entry.mapURL}">${entry.city}, ${entry.country}</a>`;
        document.querySelector('#dateTime').innerHTML = `${date}      ${time}`;
        document.querySelector('#temperature').innerHTML = `${entry.temperature} °F`;
        document.querySelector('#conditions').innerHTML = `${entry.conditions}`;
        document.querySelector('#wind').innerHTML = `${entry.wind} mph`;
        document.querySelector('#mood').innerHTML = `${entry.mood}`;
    }


    //BUILD THE PRIOR DATA ENTRIES
    function fillPriorEntries(){
        let html = ''
        journal.forEach(function (arrayItem) {
            html = html + 
            `<div class="col-lg-6">
                <div class="card rounded-50 gallery-card">
                    <h4 class="card-heading"><a class="nostyle" href="${arrayItem.mapURL}">${arrayItem.city}, ${arrayItem.country}</a></h4>
                    <h5 class="card-subheading">${arrayItem.date} ${arrayItem.time}</h5>
                    <div class = "row align-items-center">
                        <div class="col-4 align-self-center">
                            <img src="${arrayItem.weatherIconURL}">
                        </div>
                        <div class="col-8">
                            <table class="gallery-card-table">
                                <tr>
                                    <td><b>Temperature</b></td>
                                    <td>${arrayItem.temperature} °F</td>
                                </tr>
                                <tr>
                                    <td><b>Conditions</b></td>
                                    <td>${arrayItem.conditions}</td>
                                </tr>
                                <tr>
                                    <td><b>Wind Speed</b></td>
                                    <td>${arrayItem.wind}mph</td>
                                </tr>
                                <tr>
                                    <td><b>Mood</b></td>
                                    <td>${arrayItem.mood}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        document.querySelector('#priorEntries').innerHTML = html;
    };