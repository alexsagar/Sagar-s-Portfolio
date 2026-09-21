import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from '../env';

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId,
      dataset,
    })
  : null;

export const urlForImage = (source: Image | any) => {
  if (!imageBuilder || !source) return null;
  return imageBuilder.image(source).auto('format').fit('max');
};

export const resolveImageUrl = (
  source: any,
  fallback: string = ''
): string => {
  if (!source) return fallback;
  if (typeof source === 'string') return source;

  const directUrl = source.asset?.url;
  const ref = source.asset?._ref || source._ref || source.asset?._id || '';

  // SVG images should not have raster transformations like auto('format')
  if ((directUrl && directUrl.endsWith('.svg')) || ref.endsWith('-svg')) {
    return directUrl || (imageBuilder ? imageBuilder.image(source).url() : fallback);
  }

  if (ref || directUrl) {
    try {
      const url = urlForImage(source)?.url();
      return url || directUrl || fallback;
    } catch {
      return directUrl || fallback;
    }
  }
  return fallback;
};
