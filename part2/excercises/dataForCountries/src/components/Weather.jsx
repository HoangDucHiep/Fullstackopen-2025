const Weather = ({place, data }) => {
    return (
        <div>
            <h2>{place}</h2>
            <div>Temperature {data.current.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}></img>
            <div>Wind { data.current.wind_speed} m/s</div>
        </div>
    )
}

export default Weather