import type { TypeCountrie } from "../../helpers/types";
import "./CountrieItem.css";

interface Props {
    countrie: TypeCountrie;
    changeCurrentCountrie: (cca3: string) => void;
}
const CountrieItem = ({ countrie, changeCurrentCountrie }: Props) => {
    return (
        <div
            className="countrieItem"
            onClick={() => {
                changeCurrentCountrie(countrie.cca3);
            }}
        >
            {countrie.name.common}
        </div>
    );
};

export default CountrieItem;
