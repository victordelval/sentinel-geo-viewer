export type DataDTO = {
  features: FeatureImage[];
};

export type FeatureImage = {
  id: string;
  assets: {
    visual: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
  properties: {
    datetime: string;
    'eo:cloud_cover': number;
  };
};
