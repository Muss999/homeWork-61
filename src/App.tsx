import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CountrieItem from "./components/CountrieItem/CountrieItem";
import type { TypeCountrie } from "./helpers/types";
import CountrieDetails from "./components/CountrieDetails/CountrieDetails";
import { BASE_URL, ALL_COUNTRIES } from "./helpers/consts";

// const BASE_URL =
//     "https://restcountries.com/v3.1/all?fields=cca3,name,capital,population,flags,borders";

const App = () => {
    const [countries, setCountries] = useState<TypeCountrie[]>([]);
    const [currentCountrie, SetCurrentCountrie] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(BASE_URL + ALL_COUNTRIES);
            setCountries(data);
        };
        fetchData();
    }, []);

    const changeCurrentCountrie = (cca3: string) => {
        SetCurrentCountrie(cca3);
    };

    return (
        <div className="container">
            <div className="countriesList">
                {countries.map((countrie, index) => {
                    return (
                        <CountrieItem
                            countrie={countrie}
                            key={`${countrie.name}-${index}`}
                            changeCurrentCountrie={changeCurrentCountrie}
                        />
                    );
                })}
            </div>
            <CountrieDetails currentCountrie={currentCountrie} />
        </div>
    );
};

export default App;
