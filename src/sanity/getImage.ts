import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { client } from './client';

const { projectId, dataset } = client.config();

export const getImage = (
  image: SanityImageSource,
  width: number,
  height: number,
) => {
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  return (
    urlFor(image)?.width(width).height(height).url() ||
    `https://via.placeholder.com/${width}x${height}`
  );
};
