import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CountrieItem from "./components/CountrieItem/CountrieItem";
import type { TypeCountrie } from "./helpers/types";
import CountrieDetails from "./components/CountrieDetails/CountrieDetails";
import { BASE_URL, ALL_COUNTRIES } from "./helpers/consts";
import Preloader from "./components/Preloader/Preloader";

const App = () => {
    const [countries, setCountries] = useState<TypeCountrie[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentCountrie, SetCurrentCountrie] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(BASE_URL + ALL_COUNTRIES);
            const sortedData = data.sort((a: TypeCountrie, b: TypeCountrie) =>
                a.name.common.localeCompare(b.name.common)
            );
            setCountries(sortedData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const changeCurrentCountrie = (cca3: string) => {
        SetCurrentCountrie(cca3);
    };

    return (
        <div className="container">
            <div className="countriesList">
                {loading ? (
                    <Preloader />
                ) : (
                    countries.map((countrie, index) => (
                        <CountrieItem
                            countrie={countrie}
                            key={`${countrie.name.common}-${index}`}
                            changeCurrentCountrie={changeCurrentCountrie}
                        />
                    ))
                )}
            </div>
            <CountrieDetails currentCountrie={currentCountrie} />
        </div>
    );
};

export default App;
