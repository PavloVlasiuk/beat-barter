import { FC, useState } from 'react';
import yt from '../../assets/youtube.png';
import toastErrorHandler from '../../lib/http-client/toast-error-handler';
import youtubeMusicService from '../../services/youtube-music/youtube-music.service';
import { ToastContainer } from 'react-toastify';

const YoutubeForm: FC = () => {
  const [url, setUrl] = useState('');

  const handleLoad = async () => {
    const yootubeUrlRegex = /^https:\/\/music\.youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)&si=[a-zA-Z0-9_-]+$/;

    const isValidUrl = yootubeUrlRegex.exec(url);

    if (!isValidUrl) {
      toastErrorHandler.handle('Your youtube music url is invalid', 'error');
      return;
    }

    const playlistId = isValidUrl[1];

    await youtubeMusicService.getPlaylistName(playlistId);

    await youtubeMusicService.getPlaylistTracks(playlistId);
  }

    return (
        <div className="flex justify-center w-full">
            <div className="max-w-lg w-full px-8 py-8 mb-60 rounded-3xl border border-red-500 bg-white shadow-lg">
                <img src={yt} alt="Youtube Music"/>
                <h3 className="text-3xl font-bold mt-5 text-center">Youtube Music Playlist</h3>
                <input type="text" placeholder="Please copy and paste the URL of the YouTube Music playlist here" className="playlist-url mt-5 p-2 w-full border border-black rounded-lg" onChange={(e) => setUrl(e.target.value)} />
                <button className="mt-5 px-4 py-2 bg-red-500 text-xl text-white font-semibold rounded-lg hover:bg-black focus:outline-none w-full" onClick={handleLoad}>Load</button>
                <div className="invalid-url mt-5 text-red-500 text-center"></div>
            </div>
            <ToastContainer />
        </div>
    );
}

export { YoutubeForm };