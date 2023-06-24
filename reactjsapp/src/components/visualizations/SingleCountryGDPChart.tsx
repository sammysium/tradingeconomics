import { useEffect, useState } from "react"
import { CountryGDP } from "../../models/CountryGDP"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { dateTimeStringToYear } from "../../utils/Utils"

interface IChartData {
  value: number,
  year: number
}

interface IProps {
  gdpData: CountryGDP[]
}

const SingleCountryGDPChart = ({ gdpData }: IProps) => {
  const [chartData, setChartData] = useState<IChartData[]>([])

  const prepareDataForChart = (data: CountryGDP[]) => {
    if (data === null) return;
    const result: IChartData[] = [];
    data.forEach(d => {

      result.push(
        {
          value: d.Value,
          year: dateTimeStringToYear(d.DateTime)
        }
      )
    })
    setChartData(result)
  }


  useEffect(() => {

    prepareDataForChart(gdpData)

  }, [gdpData])

  return (
    <ResponsiveContainer width="100%" height={350}>
    <BarChart width={1000} height={450} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
    </ResponsiveContainer>
  )
}

export default SingleCountryGDPChart;