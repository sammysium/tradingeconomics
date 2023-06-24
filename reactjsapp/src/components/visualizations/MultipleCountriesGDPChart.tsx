import { useEffect, useState } from "react"
import { CountryGDP } from "../../models/CountryGDP"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { dateTimeStringToYear } from "../../utils/Utils"
import { ReactNode } from "react"
import { Colors } from "../../shared/Colors"

interface IChartData {
    name: string,
    value : number,
    year: number,
   
}

interface IProps {
  gdpData: CountryGDP[]
}

const MultipleCountriesGDPChart = ({gdpData}: IProps) => {
    const [chartData, setChartData] = useState<IChartData[]>([])
    const [linearGradientList, setLinearGradientList] = useState<ReactNode[]>([])
    const [areaMapList, setAreaMapsList] = useState<ReactNode[]>([])

    const prepareDataForChart = (data: CountryGDP[]) => {
      if (data === null) return;
        const countryNames = new Set<string>();  

        const result = data.reduce((acc : any[], curr: CountryGDP) => {
            const yearIndex = acc.findIndex(item => item.year === dateTimeStringToYear(curr.DateTime));
            
            if (curr.Category !== ''){
              countryNames.add(curr.Country)
            }

            if (yearIndex > -1) {
              acc[yearIndex][curr.Country] = curr.Value;
            } else {
              acc.push({
                [curr.Country]: curr.Value,
                year: dateTimeStringToYear(curr.DateTime)
              });
            }
            return acc;
          }, []);

          const linearGradients: ReactNode[] = []
          const areaMaps : ReactNode[] = []

          Array.from(countryNames).map((name, index) => {
            linearGradients.push(
                <linearGradient id={name} x1="0" y1="0" x2="0" y2="1" key={`${name}_${index.toString()}_lineaer`}>
                <stop offset="5%" stopColor={Colors[index]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={Colors[index]} stopOpacity={0}/>
              </linearGradient>
            )
            areaMaps.push(
                <Area type="monotone" dataKey={name} stroke={Colors[index]} fillOpacity={1}  fill={`url(#${name})`} key={`${name}_${index.toString()}_area`}/>
            )
          })
        
          setLinearGradientList(linearGradients)
          setAreaMapsList(areaMaps)
        setChartData(result)
    }

  
    useEffect(()=>{
        prepareDataForChart(gdpData)
     
    }, [gdpData])

    return (      
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart width={1000} height={250} data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {linearGradientList}
        </defs>
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {areaMapList}
      </AreaChart>

      </ResponsiveContainer>

      )
}

export default MultipleCountriesGDPChart;