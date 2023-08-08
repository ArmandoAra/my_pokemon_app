
//Si no existe lo inserto y si existe lo borro, esto va a ser un boton que guarda en favoritos o elimina
export const toggleFavorite = (id: number) => {


    //Voy a parsear un ojeto que se encuentra en el localStorage y si no lo encuentra , va a devorver un string, esto es un arreglo de lo que allamos guardado alli
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    //Si existe en el arreglo el id que le paso por parametro, devuelve otro arreglo sin el id que le paso por parametro
    if (favorites.includes(id)) {
        favorites = favorites.filter((favo) => favo !== id)
    } else {
        //Si no existe en el arreglo el id que le paso por parametro, entonces lo agrego al arreglo
        favorites.push(id)
    }

    //Guardo en el localStorage el arreglo de favoritos convertido en string con JSON.stringify
    localStorage.setItem('favorites', JSON.stringify(favorites))

}


export const inFavorites = (id: number): boolean => {

    //Voy a parsear un ojeto que se encuentra en el localStorage y si no lo encuentra , va a devorver un string, esto es un arreglo de lo que allamos guardado alli
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');;

    //Si existe en el arreglo el id que le paso por parametro, devuelve true
    return favorites.includes(id);

}

export const favPokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');;
}



