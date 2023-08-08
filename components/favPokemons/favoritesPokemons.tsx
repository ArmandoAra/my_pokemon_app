import { Card, Grid } from '@nextui-org/react';

import { FavoriteCardPokemon } from '../favCardPokemon/FavoriteCardPokemon';

interface favoritesPokemonsProps {
    favoritePokemons: number[]
}

export const FavoritesPokemons = ({ favoritePokemons }: favoritesPokemonsProps) => {
    return (
        <Grid.Container justify='flex-start' gap={2} direction='row' >
            {
                favoritePokemons.map((pokemonId) => (
                    <FavoriteCardPokemon pokemonId={pokemonId} key={pokemonId} />
                ))
            }
        </Grid.Container>
    )
}
