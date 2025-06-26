import "./CountrieDetails.css";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL, COUNTRIE_DETAIL } from "../../helpers/consts";
import axios from "axios";
import type { TypeCountrieDetails } from "../../helpers/types";
import Preloader from "../Preloader/Preloader";

interface Props {
    currentCountrie: string | null;
}

const CountrieDetails = ({ currentCountrie }: Props) => {
    const [countrie, setCountrie] = useState<TypeCountrieDetails>();
    const [borders, setBorders] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentCountrie !== null) {
            const fetchCountrie = async () => {
                setLoading(true);
                setBorders([]);
                const { data } = await axios.get(
                    BASE_URL + COUNTRIE_DETAIL + `/${currentCountrie}`
                );
                setCountrie(data[0]);
                setLoading(false);
            };
            fetchCountrie();
        }
    }, [currentCountrie]);

    const fetchBorders = useCallback(async () => {
        if (!countrie?.borders || countrie.borders.length === 0) return;

        const promises = countrie.borders.map(async (code) => {
            const { data } = await axios.get(
                BASE_URL + COUNTRIE_DETAIL + `/${code}`
            );
            return data[0].name.common;
        });
        const names = await Promise.all(promises);
        setBorders(names);
    }, [countrie]);

    useEffect(() => {
        if (countrie) {
            void fetchBorders();
        }
    }, [countrie, fetchBorders]);

    if (!currentCountrie) {
        return (
            <div className="countrieName">
                <h2>Choose the country</h2>
            </div>
        );
    }

    if (loading || !countrie) {
        return <Preloader />;
    }

    const capitalText =
        countrie.capital && countrie.capital.length > 0
            ? `Capital: ${countrie.capital[0]}`
            : null;

    return (
        <div className="countrieName">
            <div className="countrieName__firstBlock">
                <div className="countrieName__firstBlock_column">
                    <h2>{countrie.name.common}</h2>
                    <p>{capitalText}</p>
                    <p>Population: {countrie.population} people</p>
                </div>
                <img
                    src={countrie.flags.png}
                    alt={countrie.name.common}
                    className="countrieName__firstBlock_img"
                />
            </div>

            {countrie.borders && countrie.borders.length > 0 ? (
                <ul className="countrieName__secondBlock">
                    <span>Borders with:</span>
                    {borders.map((name, index) => (
                        <li key={`${name}-${index}`}>{name}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default CountrieDetails;
