const API_KEY = "0da1557d96272517f0314195a48178d9";


const makeIconUrl = (iconId) => {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  };

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  // console.log(data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconUrl: makeIconUrl(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    speed,
    country,
    name,
  };
};

export { getFormattedWeatherData };
