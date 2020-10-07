// API Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='; //TODO: Modify this if we choose to allow search by city! Only allowing zip code for now.
const keyApi = '77cc87435493c787caeec8dc4e346e9c';

// Other Globals
const locationField = document.querySelector('#zip');
const feelingField = document.querySelector('#feelings');
const fillPrior = async () => {
            const response = await fetch ('/allData');
            try{
            const entry = await response.json();
            fillPriorEntries(entry);
            } catch(error) {
                console.log("error",error)
            };
        };

//On Page Load Activities
    //Get The Current Year for the Footer Copyright
    function currentYear(){
        let year = new Date().getFullYear();
        document.querySelector('#dynamicYear').innerHTML = year;
    };
    currentYear();
    fillPrior();

//PostData Function
const postData = async ( url = '', data = {})=>{
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
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

//Event Handler
  //Handle Entry Submission
  document.getElementById('generate').addEventListener('click',submitData);


// API CALL AND WEB MAGIC
  function submitData(e){
      let date = new Date().toLocaleDateString('en-US',{ month: 'numeric', day: 'numeric', year: 'numeric' });
      let time = new Date().toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric', hour12: true });
      let zipcode = locationField.value;
      fillPrior();
      if (zipcode !== ''){  
      getForecast(baseUrl, zipcode, keyApi)
        .then((data)=>{ //handle data
            console.log(data.name);
            console.log(data.sys.country);
            console.log(`https://www.google.com/maps/@${data.coord.lat},${data.coord.lon},13.5z`);
            console.log(date);
            console.log(time);
            console.log(data.main.temp);
            console.log(`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
            console.log(feelingField.value);
            let condition = toProperCase(data.weather[0].description);
            console.log(condition);
            

            postData('/addEntry',{
                city: data.name,
                country: data.sys.country,
                mapURL: `https://www.google.com/maps/@${data.coord.lat},${data.coord.lon},13.5z`,
                date: date,
                time: time,
                temperature: data.main.temp,
                conditions: condition,
                wind: data.wind.speed,
                weatherIconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
                mood: feelingField.value
            });

        })
        .then(fillEntry);
      } else {
          alert('Please enter a zipcode.'); //TODO: Can replace this w/ more pleasant onscreen message
      }
    }

  const getForecast = async (baseURL, zipcode, key) => {
      const res = await fetch(`${baseURL}${zipcode}&units=imperial&appid=${key}`);
      try {
        const data = await res.json();
        console.log(data);
        return data;
      } catch(error){
          console.log(error);
      }
  }

    //Fill the contents of the latest entry
    const fillEntry = async () => {
        const response = await fetch ('/all');
        try{
        const entry = await response.json();
        document.querySelector('#cityCountry').innerHTML = `<h3 class="card-heading"><a class="nostyle" href="${entry.mapURL}">${entry.city}, ${entry.country}</a></h3>`;
        document.querySelector('#date').innerHTML = `<h4 class="card-subheading">${entry.date} ${entry.time}</h4>`;
        document.querySelector('#temp').innerHTML = `${entry.temperature} °F`;
        document.querySelector('#conditions').innerHTML = `${entry.conditions}`;
        document.querySelector('#wind').innerHTML = `${entry.wind} mph`;
        document.querySelector('#content').innerHTML = `${entry.mood}`;
        showEntry();
        } catch(error) {
            console.log("error",error)
        };
    };

// UI Updates
    //Display the entry when user submits (div is hidden by default)
    function showEntry(){
        document.querySelector('#latestEntry').classList.remove('hidden');
    }

    //BUILD THE PRIOR DATA ENTRIES
    function fillPriorEntries(array){
        let html = ''
        array.forEach(function (arrayItem) {
            html =  
            `<div class="col-lg-6">
                <div class="card rounded-50 gallery-card">
                    <h4 class="card-heading"><a class="nostyle" href="${arrayItem.mapURL}">${arrayItem.city}, ${arrayItem.country}</a></h4>
                    <h5 class="card-subheading">${arrayItem.date} ${arrayItem.time}</h5>
                    <div class = "row align-items-center">
                        <div class="col-4 align-self-center">
                            <img class="journalIcon" src="${arrayItem.weatherIconURL}">
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
            </div>` + html;
        });
        document.querySelector('#priorEntries').innerHTML = html;
    };

// HELPER FUNCTIONS
    //PROPER CASING- FROM https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    function toProperCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }