import { Text } from '@nextui-org/react'
import { Grid, Card } from '@nextui-org/react'

import { Stats } from '@/components/statsComponent/stats'
import { PokemonDetails } from '@/interfaces'

interface PokeProps {
  statsDetails: PokemonDetails,
}

//styles
const cardBody = {
  'align-items': 'center',
}

export const PokemonStats = ({ statsDetails }: PokeProps) => {

  return (
    <Grid xs={12} sm={4}>
      <Card>
        <Card.Body direction='column' display='flex' gap={0} css={cardBody}>
          <Text size={30}>Stats</Text>
          <Stats pokemons={statsDetails} />
        </Card.Body>
      </Card>
    </Grid>
  )
}
