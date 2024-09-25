const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
export const MAP_STYLE_URL = `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`;

export const INITIAL_VIEWPORT = {
  center: [0, 0] as [number, number],
  zoom: 1,
};

export const ROI_PATH = 'penajam-paser-utara_simplified.geojson';

export const SEARCH_URL = 'https://earth-search.aws.element84.com/v1/search';

const TITILER_HOST =
  process.env.NEXT_PUBLIC_TITILER_HOST || 'http://localhost:8000';

export const TITILER_COG_ENDPOINT = `${TITILER_HOST}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}.png?url=`;

export const SENTINEL_ATTRIBUTION =
  'Sentinel-2 L2A data from <a href="https://earth.esa.int/eogateway" target="_blank">ESA</a>, hosted by <a href="https://registry.opendata.aws/sentinel-2/" target="_blank">AWS</a> and processed by <a href="https://element84.com/" target="_blank">Element 84</a>';
