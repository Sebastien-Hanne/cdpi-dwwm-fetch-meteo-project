

async function main(){
    console.log("Hello meteo !");
    onPosition();
    positionVille();


}
main();



/**
 * S'execute quand l'utilisateur a accepté la geolocalisation.
 * 
 * @param {*} position_obj 
 */
function onPosition(position_obj){
    navigator.geolocation.getCurrentPosition(async(position_obj) => {
        const lat = position_obj.coords.latitude;
        const long = position_obj.coords.longitude;
        console.log(position_obj)

        const barre = await fetch (`https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude=${long}&current=precipitation,cloud_cover,temperature_2m,apparent_temperature,is_day,weather_code`)
        .then (res => res.json())
        console.log(barre)
        detail(barre);
    }
)}

async function detail(position_obj){
    
    const ville = document.querySelector(".ville");
    const temperature = document.querySelector(".temperature");
    const icone = document.querySelector(".icone"); 

   
    ville.textContent = "Paris";  
    temperature.textContent = barre.current.temperature + "°C";

    document.querySelector(".ville").textContent = await positionVille();
    if (barre.current.weathercode === 0) {  
        icone.src = "fa-solid fa-sun";
    } else if (barre.current.weathercode === 1) {  
        icone.src = "fa-solid fa-cloud";
    } else if (barre.current.weathercode === 2) { 
        icone.src = "fa-solid fa-cloud-rain";
    }
    document.querySelector(".temperature").textContent = barre.current.temperature + "°C";
    if (barre.current.is_day == 1){
        document.querySelector("body").classList.add("jour");
        document.querySelector("body").classList.remove("nuit");
    } else {
        document.querySelector("body").classList.add("nuit");
        document.querySelector("body").classList.remove("jour");
        document.querySelector(".noche");
    }
}

async function positionVille(villeName){
    const posVille = await fetch(`https://geocoding-api.open-meteo.com/v1/searchsearch?name=${villeName}&count=1&language=fr&format=json`)
    .then(res => res.json())
    console.log(posVille)
    return posVille.results[0];
}

const villeName = lat + "," + long;

const formData_obj = new FormData(formPosition_obj);
    console.log(formData_obj);
