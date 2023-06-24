import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CountriesCheckbox from "../components/countries/CountriesCheckbox";
import ServiceCountryGDP from "../network/ServiceCountryGDP";
import { CountryGDP } from "../models/CountryGDP";
import SingleCountryGDPChart from "../components/visualizations/SingleCountryGDPChart";
import MultipleCountriesGDPChart from "../components/visualizations/MultipleCountriesGDPChart";
import CountriesGDPTableView from "../components/visualizations/CountriesGDPTableView";
import Loader from "../components/Loader/Loader";

interface IChartData {
    value: number,
    year: number
}

const GDPPage = () => {
    const [selectedCountries, setSelectedCountries] = useState<string[]>([])
    const [countryGDP, setCountryGDP] = useState<CountryGDP[]>([])
    const [visualToShow, setVisualToShow] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkedCountriesHandler = (countries: string[]) => {
        setSelectedCountries(countries)

    }

    const generateChart = () => {
        setVisualToShow('')
        if (selectedCountries.length === 0) {
            alert("Select at least one country")
            return;
        }
        setVisualToShow('chart')



    }

    useEffect(() => {
        if (selectedCountries.length > 0 ){
            setIsLoading(true)
            ServiceCountryGDP.countriesGDP(selectedCountries.join(",")).then(data=>{
                setCountryGDP(data)
                setIsLoading(false)
            }).catch(e=>{
                setCountryGDP([])
                setIsLoading(false)
            })
    
        }else{
            setIsLoading(false)
        }
       
    }, [selectedCountries])

    const generateTable = () => {
        setVisualToShow('')
        if (selectedCountries.length === 0) {
            alert("Select at least one country")
            return;
        }
        setVisualToShow('table')


    }


    return (
        <Layout>
            <CountriesCheckbox receiveCheckedCountries={checkedCountriesHandler} />

            <div className="inline-flex rounded-md shadow-sm my-10" role="group">
                <button onClick={generateChart} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg aria-hidden="true" className="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M21 18v2H3a1 1 0 01-1-1V5H1V3h2V2a1 1 0 011-1h16a1 1 0 011 1v16h-2zM5 10v7h3v-4h4v4h7v-7h-3v4h-4v-4H5z" />
                    </svg>
                    Generate Chart View
                </button>
                <button type="button" onClick={generateTable} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg aria-hidden="true" className="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 4v16H4V4h16zm2-2H2v20h20V2z" />
                        <path d="M6 6h12v2H6zm0 4h12v2H6zm0 4h12v2H6zm0 4h12v2H6z" />
                    </svg>
                    Generate Tabular View
                </button>
            </div>


            {selectedCountries.length === 1 && visualToShow == "chart" &&

                (<SingleCountryGDPChart gdpData={countryGDP} />)

            }

            {selectedCountries.length > 1 && visualToShow == "chart" &&

                (<MultipleCountriesGDPChart gdpData={countryGDP} />)

            }

            {visualToShow == "table" &&

                (<CountriesGDPTableView gdpData={countryGDP} />)

            }

{isLoading && <Loader/>}


        </Layout>
    )

}

export default GDPPage;