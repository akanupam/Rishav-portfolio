import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Generate video thumbnail by extracting frame at 1 second
 * Uses ffmpeg to create a lightweight JPEG thumbnail
 */
export async function generateVideoThumbnail(
  videoPath: string,
  thumbnailPath: string
): Promise<boolean> {
  try {
    // Check if thumbnail already exists
    try {
      await fs.access(thumbnailPath);
      return true; // Thumbnail already exists
    } catch {
      // Thumbnail doesn't exist, proceed to generate
    }

    // Ensure thumbnail directory exists
    const thumbnailDir = path.dirname(thumbnailPath);
    await fs.mkdir(thumbnailDir, { recursive: true });

    // Extract thumbnail using ffmpeg
    // -ss 1: seek to 1 second
    // -vframes 1: extract only 1 frame
    // -vf scale=240:-1: scale width to 240px, maintain aspect ratio
    // -q:v 5: quality (lower is better, 2-5 is good)
    const command = `ffmpeg -i "${videoPath}" -ss 1 -vframes 1 -vf "scale=240:-1" -q:v 5 "${thumbnailPath}" -y 2>/dev/null`;

    execSync(command, { stdio: 'ignore' });

    // Verify thumbnail was created
    try {
      await fs.access(thumbnailPath);
      return true;
    } catch {
      console.warn(`Failed to generate thumbnail for ${videoPath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error generating thumbnail for ${videoPath}:`, error);
    return false;
  }
}

/**
 * Get thumbnail path for a video file
 * Returns both absolute path for generation and relative path for client
 */
export function getThumbnailPaths(videoFilename: string) {
  const thumbnailFilename = videoFilename.replace(/\.[^/.]+$/, '.jpg');
  const absolutePath = path.join(
    process.cwd(),
    'public',
    'videos',
    'thumbnails',
    thumbnailFilename
  );
  const relativePath = `/videos/thumbnails/${thumbnailFilename}`;

  return { absolutePath, relativePath };
}
