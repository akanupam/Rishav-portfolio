import { Clip } from '@/lib/store';

export const CLIPS: Clip[] = [
  {
    id: 'clip-1',
    title: 'Concert Highlight Reel',
    duration: 18,
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27300%27%3E%3Crect fill=%27%2312151C%27 width=%27300%27 height=%27300%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-size=%2724%27 fill=%27%23E6E8EB%27 text-anchor=%27middle%27 dominant-baseline=%27central%27%3EConcert Reel%3C/text%3E%3C/svg%3E',
    embedType: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DP1Msk3k5oP/',
    category: ['Reel', 'Concert', 'Music'],
    description: 'Concert footage cut to hit with the beat—quick transitions, crowd energy, and synced drops to keep the hype real.',
  },
  {
    id: 'clip-2',
    title: 'Cinematic Travel Reel',
    duration: 20,
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27300%27%3E%3Cdefs%3E%3ClinearGradient id=%27g%27 x1=%270%27 y1=%270%27 x2=%271%27 y2=%271%27%3E%3Cstop offset=%270%25%27 stop-color=%27%237C7CFF%27/%3E%3Cstop offset=%27100%25%27 stop-color=%27%2312151C%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%27url(%23g)%27 width=%27300%27 height=%27300%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-size=%2724%27 fill=%27white%27 text-anchor=%27middle%27 dominant-baseline=%27central%27%3ECinematic Travel%3C/text%3E%3C/svg%3E',
    embedType: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DRhNZSFE7gP/',
    category: ['Reel', 'Travel', 'Cinematic'],
    description: 'A travel-style reel stitched together with smooth transitions and chill pacing. Focused more on vibe and flow than heavy effects.',
  },
  {
    id: 'clip-3',
    title: 'Aesthetic Lifestyle Edit',
    duration: 15,
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27300%27%3E%3Crect fill=%27%234FD1C5%27 width=%27300%27 height=%27300%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-size=%2724%27 fill=%27%230B0D10%27 text-anchor=%27middle%27 dominant-baseline=%27central%27%3ELifestyle Edit%3C/text%3E%3C/svg%3E',
    embedType: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DPykKVLk3ya/',
    category: ['Reel', 'Lifestyle', 'Aesthetic'],
    description: 'A simple lifestyle reel with clean cuts and relaxed timing. Kept minimal so the visuals do most of the talking.',
  },
  {
    id: 'clip-4',
    title: 'Summer Vibes Reel',
    duration: 15,
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27300%27%3E%3Crect fill=%27%237C7CFF%27 width=%27300%27 height=%27300%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-size=%2724%27 fill=%27white%27 text-anchor=%27middle%27 dominant-baseline=%27central%27%3ESummer Vibes%3C/text%3E%3C/svg%3E',
    embedType: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DObYELak1qk/',
    category: ['Reel', 'Concert', 'Creative'],
    description: 'A longer concert edit with creative transitions and dramatic moments, focused on capturing the mood and live energy.'
  },
  {
    id: 'clip-5',
    title: 'Creative Concert Edit',
    duration: 30,
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27300%27%3E%3Cdefs%3E%3CradialGradient id=%27g%27 cx=%2750%25%27 cy=%2750%25%27 r=%2750%25%27%3E%3Cstop offset=%270%25%27 stop-color=%27%237C7CFF%27/%3E%3Cstop offset=%27100%25%27 stop-color=%27%230B0D10%27/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill=%27url(%23g)%27 width=%27300%27 height=%27300%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-size=%2724%27 fill=%27white%27 text-anchor=%27middle%27 dominant-baseline=%27central%27%3ECreative Edit%3C/text%3E%3C/svg%3E',
    embedType: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/C6POq5jya8O/',
    category: ['Reel', 'Nature', 'Creative'],
    description: 'A longer moon night shoot, edited with creative transitions and dramatic moments, focused on capturing the mood and live energy.',
  },
];
