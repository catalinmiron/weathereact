import React, { useEffect, useState } from 'react'

const Covid = ({ country }) => {

    const [cases, setCases] = useState({})

    const getCovidData = () => {
        if(country !== undefined) {
          const date = new Date()
          const API_URL = `${process.env.REACT_APP_COVID_URL}${country}?from=${date}&to=${date}`
    
          fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            const covid = {}
            covid['active'] = data[data.length - 1].Active
            covid['confirmed'] = data[data.length - 1].Confirmed
            covid['deaths'] = data[data.length - 1].Deaths
            covid['recovered'] = data[data.length - 1].Recovered
    
            setCases(covid)
          })
          .catch(err => console.log(err))
        }
    }
    useEffect(getCovidData, [country])

    return(
        <div className="covid">
            <h1>Country: {country}</h1>
            <p>Confirmed: {cases.confirmed}</p>
            <p>Active: {cases.active}</p>
            <p>Recovered: {cases.recovered}</p>
            <p>Deaths: {cases.deaths}</p>
        </div>
    )
}

export default Covid