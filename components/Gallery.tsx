import { getVideosFromDirectory } from '@/lib/videos';
import { GalleryClient } from './Gallery/GalleryClient';

export async function Gallery() {
  const videos = await getVideosFromDirectory();

  return <GalleryClient videos={videos} />;
}
