import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import { NextPage } from "next"
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next/types'
import { Image, Button, Grid, Card, Text, Container } from '@nextui-org/react'

import confetti from 'canvas-confetti'

import { CustomLayout } from '@/components/layouts'
import { pokeApi } from '../../api'
import { PokemonDetails } from '@/interfaces'
import { getPokemonInfo, inFavorites, toggleFavorite } from '../../utils'




interface PokeProps {
  pokemon: PokemonDetails,
}

const PokemonPage: NextPage<PokeProps> = ({ pokemon }) => {
  const { name, sprites } = pokemon

  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(inFavorites(pokemon.id));
  }, [pokemon.id]);

  const onToggleFavorite = () => {
    setIsInFavorites(!isInFavorites);
    toggleFavorite(pokemon.id);

    if (!isInFavorites) {
      confetti({
        zIndex: 10000,
        particleCount: 100,
        spread: 170,
        angle: 270,
        origin: { x: 0.5, y: 0.02 },
      });
    }
  };


  return (
    <CustomLayout title={name} >
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4} >
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>

              <Button
                color="gradient"
                onPress={onToggleFavorite}
                ghost={isInFavorites}
              >
                {isInFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

              </Container>


            </Card.Body>


          </Card>
        </Grid>

      </Grid.Container>
    </CustomLayout>
  )
}

// getStaticPaths es para generar las rutas estaticas, los paths que se escriben en el navegador
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  // hacemos un array con numeros del 1 al 151 en string
  const pokemonList = [...Array(151)].map((value, index) => `${index + 1}`)

  // const paths = data.results.map((pokemon) => ({
  return {
    paths: pokemonList.map(id => ({
      params: { id }
      // false or "blocking"
    })),
    fallback: false,
  }
}


// En el getSaticProps despues que se ejecuta el getStaticPaths recibimos los parametros de los paths
// Necesitamos los argumentos de la url para hacer la peticion a la api,que viene en el ctx(conexto)
// Es importante enviar la data que vamos a usar y no mas, para que la pagina se renderice mas rapido
export const getStaticProps: GetStaticProps = async (ctx) => {
  //Podiamos tambien desestructurar el ctx y sacar el id ({ params })

  //indicamos que el id es un string
  const { id } = ctx.params as { id: string }

  //retornamos los props que necesitamos enviandola a la pagina
  return {
    props: {
      pokemon: await getPokemonInfo(id)
    }
  }
}

export default PokemonPage