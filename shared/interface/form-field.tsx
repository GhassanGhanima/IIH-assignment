export interface InputProps {
  label: string;
  value: string;
  placeholder: string
  onChange: (value: string) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface Job {
  id: string;
  title: string;
  city: string;
  country: string;
  description: string;
  sector: string;
}

export interface JobsState {
  totalRecord: number;
  jobs: {
    filter(arg0: (job: any) => boolean): unknown;
    jobs: Job[],
    totalRecord: number,
    map(arg0: (jop: Job) => import("react").JSX.Element): import("react").ReactNode;

  }
  currentPage: number;
  filter: FilterSideBar;
  search: string

}

export interface FilterSideBar {
  sector: string,
  country: string,
  city: string,
  [key: string]: string,
}

export interface Sector {
  id: string
  label: string;
  value: string;
}

export interface SectorState {
  map(arg0: (sector: Sector) => import("react").JSX.Element): import("react").ReactNode;
  sector: Sector[] | void;
}

export interface Cities {
  map(arg0: (city: Cities) => import("react").JSX.Element): import("react").ReactNode;
  id: string
  label: string;
  value: string;
}

export interface CitiesState {
  map(arg0: (city: Cities) => import("react").JSX.Element): import("react").ReactNode;
  cities: Cities[] | void;
}

export interface Country {
  map(arg0: (country: Country) => import("react").JSX.Element): import("react").ReactNode;
  id: string
  label: string;
  value: string;
  cities: Cities[] | void
}

export interface CountryState {
  map(arg0: (country: Country) => import("react").JSX.Element): import("react").ReactNode;

  countries: Country[] | void;
}

export interface JobFormProps {
  onSubmit: (formData: FormData) => void;
  onClose: () => void;

}

export interface FormData {
  title: string;
  sector: string;
  country: string;
  city: string;
  description: string;
}
