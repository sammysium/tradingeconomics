import { useEffect, useState } from "react"
import { CountryGDP } from "../../models/CountryGDP"
import { dateTimeStringToYear } from "../../utils/Utils"

interface IProps {
    gdpData: CountryGDP[]
}

const CountriesGDPTableView = ({ gdpData }: IProps) => {
    const [tableData, setTableData] = useState<any[]>([])
    const [countriesList, setCountriesList] = useState<Set<string>>(new Set<string>())

    const prepareDataForChart = (data: CountryGDP[]) => {
        if (data === null) return;
        const positions: any = {}
        const countryNames = new Set<string>()
        const transformedData: any[] = [];
        let counter = 0
        data.forEach((d, i) => {
            const yr = dateTimeStringToYear(d.DateTime)
            if (d.Category !== ''){
                countryNames.add(d.Country)
            }
            
            if (positions[yr] === undefined) {
                positions[yr] = counter;

                transformedData.push(
                    [yr, d.Value]
                )
                counter++
            } else {
                transformedData[positions[yr]].push(d.Value)
            }


        })
        setCountriesList(countryNames)
        setTableData(transformedData)
    }


    useEffect(() => {

        prepareDataForChart(gdpData)

    }, [gdpData])

    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Year
                        </th>
                        {Array.from(countriesList).map((name, index) => {
                            return (<th scope="col" className="px-6 py-3" key={`${name}_header`}>

                                {name}

                            </th>)
                        })}



                    </tr>
                </thead>
                <tbody>
                    {tableData.map((d, index)=>{
                        return (
                            <tr key={`${index.toString()}_row`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {d.map((value: number, idx: number) =>{
                             return (<td className="px-6 py-4" key={`${idx.toString()}_cell_${index.toString()}`}>{value}</td>)
                        }) }
                      
                    </tr>
                        )
                    })}
                 
                </tbody>
            </table>
        </div>


    )
}

export default CountriesGDPTableView;