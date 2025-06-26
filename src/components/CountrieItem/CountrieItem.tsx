import type { TypeCountrie } from "../../helpers/types";
import "./CountrieItem.css";

interface Props {
    countrie: TypeCountrie;
}
const CountrieItem = ({ countrie }: Props) => {
    return <div className="countrieItem">{countrie.name.common}</div>;
};

export default CountrieItem;
