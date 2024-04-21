import { SectorState, CountryState } from "../interface/form-field";



export const getSector = async () => {
    try {

        const response = await fetch("api/sectors");
        const Sector: SectorState[] = await response.json();

        return Sector
    } catch (error) {

        console.error("Error reading Sector:", error);

    }
};

export const getCountries = async () => {

    try {

        const response = await fetch("api/countries");
        const Country: CountryState[] = await response.json();

        return Country
    } catch (error) {

        console.error("Error reading country:", error);

    }
};