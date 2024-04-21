import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setFilterAction } from "@/lib/actions/JopAction";
import { Cities, Country, FilterSideBar } from "@/shared/interface/form-field";
import { getSector, getCountries } from "@/shared/services/filterService";


export interface SideBarProps {
  onMobileMenuClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onMobileMenuClose }) => {

  const dispatch = useDispatch<any>()

  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [sectors, setSectors] = useState<any[] | null>(null);
  const [selectedCountry, setSelectedCountry] =useState<Country | null>(null);
  const [activeCities, setActiveCities] = useState<Cities | null| any>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterSideBar>({
    sector: '',
    country: '',
    city: '',
  })

  useEffect(() => {
    const loadSideBar = async () => {
      try {
        const sectors: any = await getSector();
        setSectors(sectors);
        const countries: any = await getCountries();
        setCountriesData(countries);
      } catch (error) {
        console.error("Error loading sidebar:", error);
      }
    };
    loadSideBar();
  }, []);


  useEffect(() => {
    dispatch(setFilterAction(selectedFilter))
  }, [selectedFilter]);


  const updateCountryHandler = (id: string) => {
    const Country = countriesData.find((country: Country) => country.label === id) as Country | undefined;
    if (Country) {
      setActiveCities(Country.cities);
      setSelectedCountry(Country);
    } else {
      setActiveCities(null); 
      setSelectedCountry(null);
    }
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, name: string) => {
    const { id } = e.target;
    if (name == "country") {
      updateCountryHandler(id)
    }
    setSelectedFilter((prevState: FilterSideBar) => {
      if (prevState[name] === id) {
        return {
          ...prevState,
          [name]: ''
        };
      } else {
        return {
          ...prevState,
          [name]: id
        };
      }
    })
  };


  return (
    <div className="sideBar">
      <div className="sideBar-close" onClick={onMobileMenuClose} >
        <span className="icon-Vector" role="button" tabIndex={0}></span>
      </div>
      <div className="sideBar-filter">
        <ul title="List Title">
          <h6>Sector</h6>
          {sectors?.map((sector) => {
            return (
              <li key={sector.id}>
                <input type="checkbox" id={sector.label}
                  checked={selectedFilter?.sector === sector.label}
                  onChange={(e) => handleChange(e, 'sector')} />
                <label htmlFor={sector.label}>{sector.value}</label>
              </li>);

          })}
        </ul>
        <ul title="List Title">
          <h6>Countries</h6>
          {countriesData?.map((Country) => {
            return (
              <li key={Country.id}>
                <input type="checkbox"
                  id={Country.label}
                  onChange={(e) => handleChange(e, 'country')}
                  checked={selectedFilter?.country === Country.label}
                />
                <label htmlFor={Country.label}>{Country.value} </label>
              </li>);
          })}
        </ul>
        {activeCities &&
          <ul title="List Title">
            <h6>City</h6>
            {activeCities?.map((city: Cities) => {
              return (
                <li key={city.id}>
                  <input type="checkbox"
                    id={city.label}
                    onChange={(e) => handleChange(e, 'city')}
                    checked={selectedFilter?.city === city.label}
                  />
                  <label htmlFor={city.label}>{city.value} </label>
                </li>);
            })}
          </ul>
        }
      </div>
    </div>
  );
}
function setCountry(countries: any) {
  throw new Error("Function not implemented.");
}


export default SideBar
