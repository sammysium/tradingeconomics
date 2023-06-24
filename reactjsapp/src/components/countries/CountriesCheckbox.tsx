import { useEffect, useState } from "react";
import { Country } from "../../models/Country";
import ServiceCountriesList from "../../network/ServiceCountriesList";

interface IProps {
    receiveCheckedCountries: (checkedCountries: string[]) => void
}

const CountriesCheckbox = ({receiveCheckedCountries}: IProps) => {
    const [countries, setCountries] = useState<Country[]>([])
    const [checkedCountries, setCheckedCountries] = useState<string[]>([])

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const countryName = event.target.value;
        const isChecked = event.target.checked;
        let updateCheckedCountriesList : string[] = []
        if (isChecked) {
             updateCheckedCountriesList = [...checkedCountries, countryName]
        } else {
             updateCheckedCountriesList = checkedCountries.filter(country => country!== countryName)
          }
          receiveCheckedCountries(updateCheckedCountriesList); 
          setCheckedCountries(updateCheckedCountriesList); 
      };

    useEffect(() => {
        ServiceCountriesList.get().then(list => {
            setCountries(list)
        }).catch(e => {
            setCountries([])
        })
    }, [])

    return (<div className="flex flex-row space-x-4">
        {countries.map((ctry, index) => {
            return(<div className="flex items-center mb-4" key={ctry.Name}>
                <input id="default-checkbox" type="checkbox" value={ctry.Name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleCheckbox} />
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-black dark:text-black">{ctry.Name.toUpperCase()}</label>
            </div>)
        })}
    </div>)

}

export default CountriesCheckbox;