import React from 'react'

interface SpriteProps {
    children: React.ReactNode
}

export const PokemonSpritesContainer = ({ children }: SpriteProps) => {
    return (
        <div>{children}</div>
    )
}
