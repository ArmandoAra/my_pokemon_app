import { FC } from 'react'
import { useRouter } from 'next/router'

import { Grid, Card, Row, Text } from '@nextui-org/react'

import { PokemonData } from '../../interfaces'

export const PokemonCard: FC<PokemonData> = (props) => {
    const { id, name, image } = props

    const router = useRouter()

    // Aqui mandamos a la pagina de cada pokemon
    const handleClick = () => {
        router.push(`/name/${name}`)
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card
                isHoverable
                isPressable
                onClick={handleClick}
            >

                <Card.Body >
                    <Card.Image
                        width={100}
                        height={100}
                        src={image}
                        alt={name}
                    />
                </Card.Body>

                <Card.Footer >
                    <Row css={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        <Text
                            h4
                            css={{
                                margin: "0 5px ",
                            }}
                            color="success">No.{id}</Text>
                        <Text
                            h3
                            transform="capitalize"
                            css={{
                                margin: "0 5px ",
                            }}
                            color="primary">{name}</Text>
                    </Row>
                </Card.Footer>

            </Card>
        </Grid>
    )
}
