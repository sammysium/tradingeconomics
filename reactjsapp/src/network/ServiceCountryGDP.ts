import END_POINTS from "../config/EndPoints";
import { CountryGDP } from "../models/CountryGDP";
import HttpWrapper from "./HttpWrapper";

class ServiceCountryGDP {
    private static instance: ServiceCountryGDP;
    constructor() {
        if (!ServiceCountryGDP.instance) {
            ServiceCountryGDP.instance = this
        }
        return ServiceCountryGDP.instance
    }

    async countriesGDP(country: string): Promise<CountryGDP[]> {
        try {
            return HttpWrapper.get(END_POINTS({"countryName": country}).countries_gdp)
        } catch (error) {
            throw error
        }
    }
}

export default new ServiceCountryGDP()