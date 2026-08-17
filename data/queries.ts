import { useQuery } from '@tanstack/react-query';
import { getGalleryData, getImage, getSiteNav } from './contentful';

export const useSiteNavQuery = () =>
  useQuery({ queryKey: ['siteNav'], queryFn: getSiteNav });

export const useGalleryQuery = (gallerySlug: string | string[] | undefined) => {
  const { data: navData } = useSiteNavQuery();
  return useQuery({
    queryKey: ['gallery', gallerySlug],
    queryFn: () => getGalleryData(gallerySlug, navData),
    enabled: !!navData && !!gallerySlug && typeof gallerySlug === 'string',
  });
};

export const useImageQuery = (
  imageSlug: string | string[] | undefined,
  gallerySlug: string | string[] | undefined,
) => {
  const { data: galleryData } = useGalleryQuery(gallerySlug);
  return useQuery({
    queryKey: ['image', imageSlug],
    queryFn: () => getImage(imageSlug, galleryData),
    enabled: !!galleryData && !!imageSlug && typeof imageSlug === 'string',
  });
};
