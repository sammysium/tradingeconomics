import { Country } from "../models/Country";

const SAMPLE_COUNTRIES: Country[] = [
    {
        Name: "mexico"
    },
    {
        Name: "sweden"
    },
    {
        Name: "thailand"
    },
    {
        Name: "new zealand"
    }
]

class ServiceCountriesList {
    private static instance: ServiceCountriesList;
    constructor() {
        if (!ServiceCountriesList.instance) {
            ServiceCountriesList.instance = this
        }
        return ServiceCountriesList.instance
    }

    async get(): Promise<Country[]> {
        try {
            return SAMPLE_COUNTRIES
        } catch (error) {
            throw error
        }
    }
}

export default new ServiceCountriesList()