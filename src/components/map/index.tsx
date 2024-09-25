'use client';

import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { bbox } from '@turf/bbox';
import { polygon } from '@turf/helpers';

import Dropdown from '@/components/dropdown';

import {
  INITIAL_VIEWPORT,
  MAP_STYLE_URL,
  ROI_PATH,
  SEARCH_URL,
  SENTINEL_ATTRIBUTION,
  TITILER_COG_ENDPOINT,
} from './constants';

import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';
import { FeatureImage, DataDTO } from './types';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [images, setImages] = useState<FeatureImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<FeatureImage[]>([]);

  useEffect(() => {
    if (!map || map.current !== null) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current || '',
      style: MAP_STYLE_URL,
      ...INITIAL_VIEWPORT,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-left');

    map.current.on('load', () => {
      map.current?.addSource('roi-source', {
        type: 'geojson',
        data: ROI_PATH,
      });

      map.current?.addLayer({
        id: 'roi-layer',
        type: 'line',
        source: 'roi-source',
        paint: {
          'line-color': '#E30B5C',
          'line-width': 10,
        },
      });

      map.current
        ?.getSource('roi-source')
        ?.getData()
        .then((data) => {
          const roiCoordinates = data.geometry.coordinates;
          const roiBbox = bbox(polygon(roiCoordinates));

          map.current?.fitBounds(
            [
              [roiBbox[0], roiBbox[1]],
              [roiBbox[2], roiBbox[3]],
            ],
            {
              padding: 50,
            }
          );

          fetch(SEARCH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bbox: roiBbox,
              limit: 10,
              collections: ['sentinel-2-l2a'],
              sortby: [{ field: 'properties.datetime', direction: 'desc' }],
            }),
          })
            .then((response) => response.json())
            .then(({ features }: DataDTO) => {
              features.forEach((image) => {
                const assetPath = image.assets.visual.href;
                map.current?.addSource(`titiler-source-${image.id}`, {
                  type: 'raster',
                  tiles: [TITILER_COG_ENDPOINT + assetPath],
                  tileSize: 256,
                  attribution: SENTINEL_ATTRIBUTION,
                });
              });

              map.current?.addLayer(
                {
                  id: `titiler-layer-${features[0].id}`,
                  type: 'raster',
                  source: `titiler-source-${features[0].id}`,
                },
                'roi-layer'
              );

              setLoading(false);
              setImages(features);
              setSelectedImages([features[0]]);
            });
        });
    });
  }, []);

  function handleSelectedImage(imageId: string) {
    const clickedImage = images.find((image) => image.id === imageId);
    if (!clickedImage) return;

    const alreadySelected = selectedImages.some(
      (image) => image.id === imageId
    );

    if (alreadySelected) {
      setSelectedImages(selectedImages.filter((image) => image.id !== imageId));
      map.current?.removeLayer(`titiler-layer-${imageId}`);
    } else {
      setSelectedImages([...selectedImages, clickedImage]);
      map.current?.addLayer(
        {
          id: `titiler-layer-${imageId}`,
          type: 'raster',
          source: `titiler-source-${imageId}`,
        },
        'roi-layer'
      );
    }
  }

  const dropdownOptions = images.map((image) => {
    const date = new Date(image.properties['datetime']).toLocaleString();
    const cloud = image.properties['eo:cloud_cover'];
    return {
      value: image.id,
      label: `${date} (${cloud.toFixed(1)}%)`,
      thumbnail: image.assets.thumbnail.href,
    };
  });

  return (
    <div className="map-wrap">
      <div className="dropdown-wrap">
        <Dropdown
          loading={loading}
          options={dropdownOptions}
          selected={selectedImages.map((image) => image.id)}
          onClick={handleSelectedImage}
        />
      </div>
      <div ref={mapContainer} className="map" />
    </div>
  );
}
