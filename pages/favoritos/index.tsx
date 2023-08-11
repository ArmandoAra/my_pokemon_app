import { useState, useEffect } from 'react';

import { CustomLayout } from '../../components/layouts'
import { NoFavorites } from '@/components/ui'

import { favPokemons } from '../../utils/localFavorites'
import { PokemonCard } from '@/components/pokemon';


import { FavoritesPokemons } from '../../components/favPokemons/favoritesPokemons';

export default function Favoritos() {

    const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([])

    useEffect(() => {
        setFavoritesPokemons(favPokemons())
    }, [])

    return (
        <CustomLayout title='Favoritos' >
            {
                favoritesPokemons.length === 0
                    ? (<NoFavorites />)
                    : (<FavoritesPokemons favoritePokemons={favoritesPokemons} />)
            }
        </CustomLayout>


    )
}
