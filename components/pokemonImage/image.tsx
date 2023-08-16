import { Card, Grid } from "@nextui-org/react";

import { Sprites } from "@/interfaces";

interface ImageProps {
    name: string;
    sprites: Sprites;
}

export const PokemonImage = ({ name, sprites }: ImageProps) => {

    return (
        <Grid xs={12} sm={4} >
            <Card isHoverable={false} css={{ padding: '30px' }}>
                <Card.Body>
                    <Card.Image
                        src={sprites.other?.['official-artwork'].front_default || []}
                        alt={name}
                        width="100%"
                        height={200}
                    />
                </Card.Body>
            </Card>
        </Grid>

    )
}
