import { YOUTUBE_URL_REGEX } from "../constants/youtube-music"

export const validateYoutubeUrl = (url: string) => {
  return YOUTUBE_URL_REGEX.exec(url);
}