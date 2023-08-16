import { useState, useEffect } from 'react';

import { CustomLayout } from '../../components/layouts'
import { NoFavorites } from '@/components/ui'
import { FavoritesPokemons } from '../../components/favPokemons/favoritesPokemons';

import { getFavPokemonsInLocalStore } from '../../utils/localFavorites'

export default function Favoritos() {

    const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([])

    useEffect(() => {
        setFavoritesPokemons(getFavPokemonsInLocalStore())
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
