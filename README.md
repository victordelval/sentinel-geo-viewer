# Sentinel Geo Viewer

This is a frontend application to retrieve and load the latest Sentinel-2 true-color satellite images. It allows to display on the map multiple images at once corresponding to a Region of Interest (ROI) in Borneo, Indonesia

The images belong to the [Sentinel missions](https://sentinels.copernicus.eu/web/sentinel/home) (Sentinel-2 level 2A platform) of the ESA Copernicus Earth Observation Programme. These images are processed by [Element 84](https://element84.com/) and are hosted on the [Registry of Open Data on AWS](https://registry.opendata.aws/sentinel-2/).

The application connects to a [TiTiler](https://developmentseed.org/titiler/) server from [Development Seed](https://developmentseed.org/), which serves Cloud-Optimized GeoTIFF (COG) tiles.

## Description

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) (with its default options, mainly TypeScript and Tailwindcss), and uses [MapLibre GL JS]() as the map rendering engine, together with [MapTiler]() as the base map provider.

[Tailwindcss](https://tailwindcss.com/) is used to implement CSS styles and [HeadlessUI](https://headlessui.com/) as a library of basic components (eg. dropdown).

## Prerequisites

In order to work, it needs to connect to a TiTiler server. To do this, you can start a local Docker container already prepared. For more information visit the [TiTiler page on GitHub](https://github.com/developmentseed/titiler?tab=readme-ov-file#docker)

```bash
# https://github.com/developmentseed/titiler

docker run --name titiler \
    -p 8000:8000 \
    --env PORT=8000 \
    --env WORKERS_PER_CORE=1 \
    --rm -it ghcr.io/developmentseed/titiler:latest
```

## Getting Started

In order to start the application you need to create a `.env.local` file in the root of the project with the following environment variables:

```bash
NEXT_PUBLIC_MAPTILER_API_KEY=
NEXT_PUBLIC_TITILER_HOST= # e.g. http://localhost:8000

# optionally
NEXT_PUBLIC_APP_NAME=
```

After that you can install the dependencies and initialize the development server:

```bash
# install dependencies
npm install

# run the development server
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Enjoy it! :)
