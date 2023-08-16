import { useState, useEffect } from 'react'
import { Image, Button, Grid, Card, Text, Container } from '@nextui-org/react'

import { NextPage } from "next"
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next/types'

import confetti from 'canvas-confetti'

import { CustomLayout } from '@/components/layouts'
import { PokemonStats } from '@/containers/stats/pokemonStatsContainer'
import { PokemonDescription } from '../../components/description/pokemonDescription'
import { PokemonSpritesContainer } from '@/containers/sprites/pokemonSpritesContainer'

import { PokemonDetails } from '@/interfaces'
import { getPokemonInfo, inFavorites, toggleFavorite } from '../../utils'
import { PokemonImage } from '@/components/pokemonImage/image'

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

        <PokemonImage name={name} sprites={sprites} />

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize' >{name}</Text>

              <Button
                ghost={!isInFavorites}
                color="primary"
                onPress={onToggleFavorite}
              >
                {isInFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </Button>

            </Card.Header>

            <PokemonSpritesContainer pokemon={pokemon} />

          </Card>
        </Grid>

        <Container direction='row' display='flex' gap={0}>

          {/* Pokemon stats */}
          <PokemonStats statsDetails={pokemon} />

          {/* Pokemon description */}
          <PokemonDescription description={pokemon.description} />

        </Container>

      </Grid.Container>
    </CustomLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemonList = [...Array(151)].map((value, index) => `${index + 1}`)

  return {
    paths: pokemonList.map(id => ({
      params: { id }
    })),

    fallback: 'blocking',
  }
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  const { id } = ctx.params as { id: string }

  const pokemon = await getPokemonInfo(id)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }


  return {
    props: {
      pokemon
    },
    revalidate: 86400,
  }
}

export default PokemonPage