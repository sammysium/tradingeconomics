const BASE_URL = process.env.REACT_APP_BASE_URL
const API_KEY = process.env.REACT_APP_API_KEY

const END_POINTS_2 = {
    "news": `${BASE_URL}news/?c=${API_KEY}`,
    "countries_gdp": `${BASE_URL}historical/country/mexico,sweden/indicator/gdp?c=${API_KEY}&f=json`,
}

interface Parameters {
    [key:string]: string
}

const END_POINTS = (values: Parameters = {}) => {
    return {
        "news": `${BASE_URL}news/?c=${API_KEY}`,
        "countries_gdp": `${BASE_URL}historical/country/${values['countryName']}/indicator/gdp?c=${API_KEY}`,
    }
}

export default END_POINTS