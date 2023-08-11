

import { NextPage } from "next"
import { GetStaticProps } from "next/types";

import { Grid } from '@nextui-org/react'

import { CustomLayout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon'
import { pokeApi } from "../api";
import { PokemonResponse, PokemonData } from "../interfaces";
import { CSSProperties } from "@nextui-org/react/types/theme";



// styles

const title: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  margin: '40px 0px',
}

interface PokeProps {
  pokemonList: PokemonData[],
}

// Title: Listado de Pokemones
const HomePage: NextPage<PokeProps> = ({ pokemonList }) => {



  return (
    <CustomLayout title="Listado de Pokemones" >

      <div>
        <h1 style={title} >My Pokedex</h1>
        <Grid.Container gap={2} justify='flex-start' >
          {/* Mapeamos los datos y mostramos en el cliente */}
          {
            pokemonList.map(({ id, name, image }) => {
              return (
                <PokemonCard
                  key={id} id={id}
                  name={name}
                  image={image}
                />
              )
            })
          }
        </Grid.Container>
      </div>
    </CustomLayout>
  )
}

// Esto es para que la pagina se renderice en el servidor antes de que se cargue en el navegador, y se usa si yo se de antemano que es lo que va a mostrar la pagina
// Es usado para cargar las paginas estaticas y aumentar la velocidad de carga
// Se ejeucta en el servidor y en el buidtime.... solo llega al cliente las props del return
// los props del return son los que van a pasar al componente
// Solo se puede usar en las pages, no en los componentes
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=151')


  // Mapeamos los datos que nos interesan
  const pokemonList = data.results.map((pokemon, index) => {

    // Separamos el id del url del pokemon
    const id = index + 1

    // retornamos los datos que nos interesan
    return {
      id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` // Images mas grandes
    }
  })


  return {
    props: {
      pokemonList
    }
  }
}

export default HomePage;