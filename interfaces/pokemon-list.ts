export interface PokemonResponse {
    count: number;
    next?: string;
    previous?: string;
    results: PokemonData[];
}

export interface PokemonData {
    name: string;
    id: string;
    image: string;
    url?: string;
}

