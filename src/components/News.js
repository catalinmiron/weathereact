import React, { useState, useEffect } from 'react'

const News = ({ countryCode }) => {
    const [articles, setArticles] = useState([])

    const getNews = () => {
        if(countryCode !== undefined) {
            const API_URL = `${process.env.REACT_APP_NEWS_URL}country=${countryCode}&category=health&apiKey=${process.env.REACT_APP_NEWS_KEY}`
            console.log(API_URL)
            fetch(API_URL) 
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setArticles(data.articles.slice(0, 10))
            })
            .catch(err => console.log(err))
        }
    }    

    useEffect(getNews, [countryCode])
    
    return (
        <div className="news">
            <h1>News Headlines</h1>
            <ul>{articles.map((item, idx) => 
                <li key={idx}>
                    <a href={item.url}>
                        {item.title}
                    </a>
                </li>
            )}
            </ul>
        </div>
    )
}

export default News;