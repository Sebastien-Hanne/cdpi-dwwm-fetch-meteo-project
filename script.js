async function main() {
  console.log("Hello meteo !");
  //   onPosition();
  navigator.geolocation.getCurrentPosition(onPosition);
    positionVille();
}
main();

/**
 * S'execute quand l'utilisateur a accepté la geolocalisation.
 *
 * @param {*} position_obj
 */
async function onPosition(position_obj) {
  const lat = position_obj.coords.latitude;
  const long = position_obj.coords.longitude;
  console.log(position_obj);

  await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=precipitation,cloud_cover,temperature_2m,apparent_temperature,is_day,weather_code`)
    .then((res) => res.json())
    .then((meteo_obj) => {
      console.log(meteo_obj);

      detail(meteo_obj);
    });
}

async function detail(meteo_obj) {
  
  const temperature = document.querySelector(".degre");
  const icone = document.querySelector(".logo");
  console.log(meteo_obj);
  temperature.textContent = meteo_obj.current.temperature_2m;
  console.log(temperature);

  
//   if (meteo_obj.current.weathercode === 0) {
//     console.log(meteo_obj.current.weathercode);
//     icone.src = "fa-solid fa-sun";
//   } else if (meteo_obj.current.weathercode === 1) {
//     icone.src = "fa-solid fa-cloud";
//   } else if (meteo_obj.current.weathercode === 2) {
//     icone.src = "fa-solid fa-cloud-rain";
//   }
//   document.querySelector(".degre").temperature;
//   if (meteo_obj.current.is_day == 1) {
//     document.querySelector("body").classList.add("jour");
//     document.querySelector("body").classList.remove("nuit");
//   } else {
//     document.querySelector("body").classList.add("nuit");
//     document.querySelector("body").classList.remove("jour");
//     lement.classList.toggle("noche");
//   }
}

async function positionVille(villeName) {
    const lat = position_obj.coords.latitude;
    const long = position_obj.coords.longitude;
    const names = lat + "," + long;
    console.log(villeName)
  const posVille = await fetch(
        `https://geocoding-api.open-meteo.com/v1/searchsearch?name=${villeName}&latitude=${lat}&longitude=${long}&count=1&language=fr&format=json`

  )
    .then(res => res.json())
    .then((villeName) => {
        const ville = document.querySelector(".ville");
        console.log(posVille)
        ville.textContent = names.name;
        
        console.log(villeName)
});
//   return posVille.results[0];
}

/**
    * const villeName = lat + "," + long;
    const formData_obj = new FormData(formPosition_obj);
    console.log(formData_obj);
    **/
