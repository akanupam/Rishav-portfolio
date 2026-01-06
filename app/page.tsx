import { Gallery } from '@/components/Gallery';
import { HomeClient } from '@/components/HomeClient';

export default async function Home() {
  return <HomeClient gallerySection={<Gallery />} />;
}
