import { NextPage } from "next"
import { GetStaticProps } from "next/types";

import { Grid, } from '@nextui-org/react'

import { CustomLayout } from '../components/layouts'
import { GenButton } from '../components/genButton'

import { Results } from "../interfaces";
import { getReg } from '../utils'





interface GenProps {
  genList: Results[],
}


// Title: Listado de Pokemones
const HomePage: NextPage<GenProps> = ({ genList }) => {

  const generations = genList

  return (
    <CustomLayout title="Listado de Pokemones" >

      <section className="pokemon_gen_section" style={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
        <h2 > My Pokemon Web</h2>
        <Grid.Container justify='center' css={{
          "display": "flex",
          "flex-direction": "column",
          "gap": "13px",
          "width": "80vw",
        }} >
          {
            generations.map(({ name, url }, index) => {
              return (
                <GenButton key={index} name={name} url={url} />
              )
            })
          }
          <GenButton name='All' url='/pokemons' />
        </Grid.Container>
      </section>
    </CustomLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const genListNumber = await getReg() || []


  const genList = genListNumber.map((pokemon, index) => {

    return {
      name: pokemon.name,
      url: pokemon.url,
    }
  })

  return {
    props: {
      genList,
    }
  }
}

export default HomePage;

