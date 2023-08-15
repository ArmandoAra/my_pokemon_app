import { Card, Grid, Text } from '@nextui-org/react'

interface PropsDescription {
    description: string
}

export const PokemonDescription = ({ description }: PropsDescription) => {

    return (
        <Grid xs={12} sm={8}>
            <Card>
                <Card.Header display={'flex'} css={{ 'align-items': 'center', 'justify-content': 'center' }}>
                    <Text h3 >Description</Text>
                </Card.Header>
                <Card.Body>
                    <Text h4>{description}</Text>
                </Card.Body>
            </Card>
        </Grid>
    )
}

