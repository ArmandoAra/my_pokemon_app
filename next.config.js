// @type {import('next').NextConfig}
// configuramos tambien aqui todos los dominios que vamos a permitir que se puedan usar en la aplicacion
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
