import { NextPage } from "next"
import { GetStaticProps } from "next/types";

import { Grid, Text, } from '@nextui-org/react'

import { CustomLayout } from '../components/layouts'
import { GenButton } from '../components/genButton'

import { Results } from "../interfaces";
import { getReg } from '../utils'

interface GenProps { genList: Results[], }

// styles
const gridContainer = {
  "display": "flex",
  "flex-direction": "column",
  "align-items": "center",
}

const grid = {
  "display": "flex",
  "flex-direction": "column",
  "gap": "13px",
  "width": "80vw",
  "margin-bottom": "20px",
}

const text = {
  "margin": "50px 0px",
}

const HomePage: NextPage<GenProps> = ({ genList }) => {

  const generations = genList

  return (
    <CustomLayout title="Listado de Pokemones" >

      <Grid.Container css={gridContainer}>
        <Text h2 css={text}> My Pokemon Web</Text>
        <Grid
          justify='center'
          css={grid} >

          {
            generations.map(({ name, url }, index) => {
              return (
                <GenButton
                  key={index}
                  name={name}
                  url={url}
                />
              )
            })
          }

          <GenButton
            name='All'
            url='/pokemons'
          />

        </Grid>
      </Grid.Container>
    </CustomLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const genListNumber = await getReg() || []

  const genList = genListNumber.map((generation) => {
    return {
      name: generation.name,
      url: generation.url,
    }
  })

  return {
    props: {
      genList,
    }
  }
}

export default HomePage;

