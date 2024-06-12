import { FC, useEffect, useState } from "react";
import background from '../assets/background.png'
import Header from "../components/header";
import TransferForm from "../components/platform-forms/transfer";
import { User } from "../types/user";
import authService from "../services/auth/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import spotifyService from "../services/spotify/spotify.service";
import storageService from "../lib/storage/storage.service";

const Transfer: FC = () => {
  const [user , setUser] = useState<User | null>(null);
  const [searchParamps] = useSearchParams();
  const navigate = useNavigate();

    const getProfile = async () => {
        const user = await authService.getProfile();
        setUser(user)
    }

    const loginSpotify = async () => {
      const code = searchParamps.get('code');
      storageService.setSpotifyCode(code!);

      try {
        await spotifyService.login(code!);
      } catch (e) {
        alert('Spotify account is not verified. Please, try again');
        navigate('/verify-spotify')
      }
    }

    useEffect(() => {
        getProfile()

        const code = searchParamps.get('code');

        const storedCode = storageService.getSpotifyCode();
  
        if (storedCode !== code) {
          loginSpotify();
        }
    }, [])
    
    return (
        <div
            className="flex overflow-hidden relative flex-col items-start px-20 py-20 w-full min-h-[850px] max-md:px-5 max-md:max-w-full"
            style={{ backgroundImage: `url(${background})`, backgroundSize: '100% 100%', backgroundPosition: 'center', height: '100vh', fontFamily: "'Outfit', sans-serif" }}
        >
            <div className="flex-auto text-8xl leading-7 max-md:max-w-full max-md:text-2xl mt-5">
              <Header isAuthorized={!!user} username={user?.username} />
            </div>
            <TransferForm />
            <ToastContainer />
        </div>
    );
}

export default Transfer;

