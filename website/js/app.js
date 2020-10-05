
// API Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='; //TODO: Modify this if we choose to allow search by city! Only allowing zip code for now.
const keyApi = '77cc87435493c787caeec8dc4e346e9c';

// Other Globals
const locationField = document.querySelector('#locationField');
const feelingField = document.querySelector('#feelingField');

// Testing Variables
const projectData = {
    city: "Ames",
    country: "US",
    date: "10/4/2020",
    time: "7:32 PM",
    temperature: "50",
    conditions: "Clear Sky",
    wind: "5.82mph",
    weatherIconURL: "http://openweathermap.org/img/wn/01n@10x.png",
    mood: "Meh"
}

//On Page Load Activities
    //Get The Current Year for the Footer Copyright
    function currentYear(){
        let year = new Date().getFullYear();
        document.querySelector('#dynamicYear').innerHTML = year;
    };
    currentYear();


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
      console.log(zipcode);
      getForecast(baseUrl, zipcode, keyApi);
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