
//Get The Current Year for the Footer Copyright
function currentYear(){
    let year = new Date().getFullYear();
    document.querySelector('#dynamicYear').innerHTML = year;
};

currentYear();