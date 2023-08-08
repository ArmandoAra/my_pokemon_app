import type { AppProps } from 'next/app'

import { NextUIProvider } from '@nextui-org/react';
import  { darkTheme }  from '../themes'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // En caso que se quiera cambiar el tema de la aplicacion podemos hacerlo aqui de forma dinamica
  <NextUIProvider theme={ darkTheme }>
    <Component {...pageProps} />
  </NextUIProvider>
  )
}
