import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';

export interface VideoMetadata {
  id: string;
  videoUrl: string;
  title: string;
  filename: string;
}

export async function getVideosFromDirectory(): Promise<VideoMetadata[]> {
  const videosDirectory = path.join(process.cwd(), 'public', 'videos');
  
  try {
    const files = await fs.readdir(videosDirectory);
    
    // Filter only video files
    const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.MP4', '.MOV'];
    const videoFiles = files.filter((file) =>
      videoExtensions.some((ext) => file.endsWith(ext))
    );

    // Generate metadata for each video
    const videos: VideoMetadata[] = videoFiles.map((filename, index) => ({
      id: `video-${index + 1}`,
      videoUrl: `/videos/${filename}`,
      title: formatTitle(filename),
      filename,
    }));

    return videos;
  } catch (error) {
    console.error('Error reading videos directory:', error);
    return [];
  }
}

// Convert filename to readable title
function formatTitle(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Replace underscores and hyphens with spaces
  const formatted = nameWithoutExt.replace(/[_-]/g, ' ');
  
  // Capitalize first letter of each word
  return formatted
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
