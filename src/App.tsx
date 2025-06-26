import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CountrieItem from "./components/CountrieItem/CountrieItem";
import type { TypeCountrie } from "./helpers/types";

const BASE_URL = "https://restcountries.com/v3.1/all?fields=cca3,name,borders";

const App = () => {
    const [countries, setCountries] = useState<TypeCountrie[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(BASE_URL);
            setCountries(data);
        };
        fetchData();
    }, []);
    return (
        <div className="container">
            <div className="countriesList">
                {countries.map((countrie, index) => {
                    return (
                        <CountrieItem
                            countrie={countrie}
                            key={`${countrie.name}-${index}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
