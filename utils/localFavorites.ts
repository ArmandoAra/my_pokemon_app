
export const toggleFavorite = (id: number) => {

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    if (favorites.includes(id)) {
        favorites = favorites.filter((favo) => favo !== id)
    } else {

        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))

}

export const inFavorites = (id: number): boolean => {
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');;
    return favorites.includes(id);
}

export const favPokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');;
}



