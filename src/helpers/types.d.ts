export interface TypeCountrieName {
    common: string;
    official: string;
}
export interface TypeCountrieFlag {
    png: string;
}

export interface TypeCountrie {
    name: TypeCountrieName;
    cca3: string;
}
export interface TypeCountrieDetails {
    capital?: string[];
    flags: TypeCountrieFlag;
    name: TypeCountrieName;
    population: number;
    borders?: string[];
}
