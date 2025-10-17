async function main() {
  console.log("Hello meteo !");
  navigator.geolocation.getCurrentPosition(onPosition);

  const formVille = document.querySelector(".search form");
  formVille.addEventListener("submit", function (event) {
    event.preventDefault();
    const villeName = formVille.querySelector("input").value;
    if (villeName) {
      positionVille(villeName);
    }
  });
}
main();

async function onPosition(position_obj) {
  const lat = position_obj.coords.latitude;
  const long = position_obj.coords.longitude;

  await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=precipitation,cloud_cover,temperature_2m,apparent_temperature,is_day,weather_code`
  )
    .then((res) => res.json())
    .then((meteo_obj) => {
      console.log(meteo_obj);
      detail(meteo_obj);
    });
}

async function detail(meteo_obj) {
  const temperature = document.querySelector(".degre");
  const icone = document.querySelector(".logo");
  const ville = document.querySelector(".ville");

  const temp = meteo_obj.current.temperature_2m;
  temperature.textContent = `${temp}`;

  if (meteo_obj.current.weather_code === 0) {
    icone.className = "logo fa-solid fa-sun";
  } else if (meteo_obj.current.weather_code === 1) {
    icone.className = "logo fa-solid fa-cloud";
  } else if (meteo_obj.current.weather_code === 2) {
    icone.className = "logo fa-solid fa-cloud-rain";
  }
}

// positionVille("Paris");

async function positionVille(villeName) {
  console.log(villeName);
  const posVille = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${villeName}&count=1&language=fr&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.results || data.results.length <= 0) throw "Ville non trouvée";

      const latitude = data.results[0].latitude;
      const longitude = data.results[0].longitude;
      console.log(`${villeName},${latitude},${longitude}`);

      const ville = document.querySelector(".ville");
      ville.textContent = `${villeName}`;

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=precipitation,cloud_cover,temperature_2m,apparent_temperature,is_day,weather_code`
      )
        .then((res) => res.json())
        .then((meteo_obj) => {
          detail(meteo_obj);
        });
    });
}
