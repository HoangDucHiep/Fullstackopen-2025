const Country = ({country}) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <div>capital: {country?.capital ? country.capital.join(", ") : "no capital"}</div>
            <div>area: {country.area}</div>
            <br></br>
            <div>languages</div>
            <ul>
                {country?.languages ? Object.values(country?.languages).map(n => {
                    return <li key={n}>{n}</li>
                }) : null}
            </ul>
            <img src={country.flags.png}></img>
        </>
    )
}

export default Country