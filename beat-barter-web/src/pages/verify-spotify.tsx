import { FC, useEffect, useState } from 'react';
import Header from '../components/header';
import VerifySpotifyForm from '../components/platform-forms/verify-spotify';
import background from '../assets/background.png';
import authService from '../services/auth/auth.service';
import { User } from '../types/user';
import spotifyService from '../services/spotify/spotify.service';

const VerifySpotify: FC = () => {
  const [user , setUser] = useState<User | null>(null);
  const [url, setUrl] = useState('');

    const getProfile = async () => {
        const userProfile = await authService.getProfile();
        setUser(userProfile);
    }

    const getAuthUrl = async () => {
        const spotifyAuthUrl = await spotifyService.getAuthUrl();
        setUrl(spotifyAuthUrl);
    }

    useEffect(() => {
        getProfile()

        getAuthUrl()
    }, [])

    return (
        <div
            className="flex overflow-hidden relative flex-col items-start px-20 py-20 w-full min-h-[850px] max-md:px-5 max-md:max-w-full"
            style={{ backgroundImage: `url(${background})`, backgroundSize: '100% 100%', backgroundPosition: 'center', height: '100vh', fontFamily: "'Outfit', sans-serif" }}
        >
            <div className="flex-auto text-8xl leading-7 max-md:max-w-full max-md:text-2xl mt-5">
                <Header isAuthorized={!!user} username={user?.username}/>
            </div>
            <VerifySpotifyForm url={url}/>
        </div>
    );
}

export default VerifySpotify;