import React from 'react'

import Head from 'next/head'
import { Navbar } from '../ui'

interface MainLayoutProps {
  children: React.ReactNode,
  title?: string
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const CustomLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="description" content="Pokemon App" />
        <meta name="author" content="Armando" />
        <meta name="keywords" content="Pokemon" />

        <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
        <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
        {/* usamos el origin para la ruta que vamos a poner en el contenido y la imagen que mostraremos en el enlace cuando enviemos el link aparezca */}
        <meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
      </Head>
      {/* Navbar */}
      <Navbar />


      <main>
        {/* Aqui va el contenido de la pagina */}
        {children}
      </main>
    </>
  )
}
