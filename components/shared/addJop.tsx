import React, { useEffect, useState } from 'react';

import { JobFormProps, FormData, Country, Sector, CitiesState, } from "@/shared/interface/form-field";
import { getCountries, getSector } from '@/shared/services/filterService';


const AddJobForm: React.FC<JobFormProps> = ({ onSubmit ,onClose}) => {
    const [countriesData, setCountriesData] = useState<Country[]>([]);
    const [sectors, setSectors] = useState<Sector[] | null>(null);
    const [activeCity, setActiveCity] = useState<CitiesState | null>(null); 

    const [formData, setFormData] = useState<FormData>({
        title: '',
        sector: '',
        country: '',
        city: '',
        description: '',
    });


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



    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form validation
        const newErrors: Partial<FormData> = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.sector.trim()) {
            newErrors.sector = 'Sector is required';
        }
        if (!formData.country.trim()) {
            newErrors.country = 'Country is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit the form
        onSubmit(formData);
    };

    const selectCountryHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
    
        const Country: Country | null = countriesData.find((country: Country) => country.value === value)
        if (Country) {
          setActiveCity(Country?.cities)
        }
        handleChange(event)

      }


    return (

        <form id='addJopForm' onSubmit={handleSubmit}>
            <div className='form-group'>
                <input type="text" id="title" name="title" placeholder='Jop Title' value={formData.title} onChange={handleChange} />
                {errors.title && <small className='error'>{errors.title}</small>}
            </div>

            <div className='form-group'>
                <select id="sector" name="sector" value={formData.sector} onChange={handleChange}>
                    <option value=""> Sector</option>
                    {sectors?.map((sector) => {
                        return (
                            <option value={sector.value} key={sector.id}> {sector.label}</option>
                        )
                    })}
                </select>
                {errors.sector && <small className='error'>{errors.sector}</small>}
            </div>

            <div className='form-group'>
                <select id="country" name="country" value={formData.country} onChange={selectCountryHandler}>
                    <option value=""> Country</option>
                    {countriesData?.map((Country) => {
                        return (
                            <option value={Country.value} key={Country.id}> {Country.label}</option>
                        )
                    })}

                </select>
                {errors.country && <small className='error'>{errors.country}</small>}
            </div>

            <div className='form-group'>
                <select id="city" name="city" value={formData.city} onChange={handleChange} disabled={formData.country==''}>
                    <option value=""> City</option>
                    {activeCity?.map((city) => {
                        return (
                            <option value={city.value} key={city.id}> {city.label}</option>
                        )
                    })}
                </select>
                {errors.city && <small className='error'>{errors.city}</small>}
            </div>

            <div className='form-group form-desc'>
                <textarea id="description" name="description" placeholder='Description' rows={5} value={formData.description} onChange={handleChange} />
                {errors.description && <small className='error'>{errors.description}</small>}
            </div>

            <div className='modal-actions'>
                <button className='btn btn-secondary' title="close"  type='button' onClick={onClose}>close</button>
                <button className='btn btn-primary' type="submit" title="Submit">Submit</button>
            </div>
        </form>
    );
};

export default AddJobForm;
