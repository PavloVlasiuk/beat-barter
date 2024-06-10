import { registerAs } from '@nestjs/config';

export default registerAs(
  'platform',
  (): Record<string, any> => ({
    spotify: {
      baseAuthUrl: process.env.SPOTIFY_BASE_AUTH_URL,
      apiUrl: process.env.SPOTIFY_API_URL,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
      scopes: [
        'user-read-private',
        'user-read-email',
        'playlist-modify-public',
        'playlist-modify-private',
      ],
    },
    youtubeMusic: {
      apiUrl: process.env.YOUTUBE_MUSIC_API_URL,
      apiKey: process.env.YOUTUBE_MUSIC_API_KEY,
      playlistMaxResults: 50,
    },
  }),
);
