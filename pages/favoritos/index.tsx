import { useState, useEffect } from 'react';

import { CustomLayout } from '../../components/layouts'
import { NoFavorites } from '@/components/ui'

import { favPokemons } from '../../utils/localFavorites'
import { PokemonCard } from '@/components/pokemon';


import { FavoritesPokemons } from '../../components/favPokemons/favoritesPokemons';






export default function Favoritos() {

    //Creamos un estado para guardar los favoritos
    const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([])


    // Necesito leer el arreglo de pokemons favoritos del localstorage
    // para eso necesito usar el useEffect que se ejecuta cuando el componente se monta
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
