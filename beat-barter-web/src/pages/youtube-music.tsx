import React, { useEffect, useState } from 'react';

import Header from '../components/header';
import { YoutubeForm } from '../components/platform-forms/youtube';

import background from '../assets/background.png';
import { User } from '../types/user';
import authService from '../services/auth/auth.service';
import { ToastContainer } from 'react-toastify';

const YoutubeMusic: React.FC = () => {
    const [user , setUser] = useState<User | null>(null);

    const getProfile = async () => {
        const user = await authService.getProfile();
        setUser(user)
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div 
            className="flex overflow-hidden relative flex-col items-start px-20 py-20 w-full min-h-[850px] max-md:px-5 max-md:max-w-full"
            style={{ backgroundImage: `url(${background})`, backgroundSize: '100% 100%', backgroundPosition: 'center', height: '100vh', fontFamily: "'Outfit', sans-serif" }}
        >
            <div className="flex-auto text-8xl leading-7 max-md:max-w-full max-md:text-2xl mt-5">
                <Header isAuthorized={!!user} username={user?.username} />
            </div>
            <YoutubeForm />
            <ToastContainer />
        </div>
    );

}

export default YoutubeMusic;