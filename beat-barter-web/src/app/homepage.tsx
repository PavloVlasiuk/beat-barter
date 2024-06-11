import * as React from 'react';
import {useEffect, useState} from 'react';

import { SignUp } from '../components/auth-form/sign-up';
import { LogIn } from '../components/auth-form/log-in';
import { Header } from '../components/header';

import authService from "../services/auth/auth.service";

import background from './background.png';

interface User {
    id: string;
    username: string;
    email: string;
}

const Homepage = () => {
    const [showSignUp, setShowSignUp] = useState<boolean>(false);
    const [showLogIn, setShowLogIn] = useState<boolean>(false);

    const [user, setUser] = useState<User | null>(null);

    const getProfile = async () => {
        const user = await authService.getProfile();
        setUser(user as any)
    }

    useEffect(() => {
        getProfile()
    }, [])

    const toggleSignUp = (): void => {
        setShowSignUp(!showSignUp);
    };

    const toggleLogIn = (): void => {
        setShowLogIn(!showLogIn);
    };

    return (
        <div
            className="flex overflow-hidden relative flex-col items-start px-20 py-20 w-full min-h-[850px] max-md:px-5 max-md:max-w-full"
            style={{ backgroundImage: `url(${background})`, backgroundSize: '100% 100%', backgroundPosition: 'center', height: '100vh', fontFamily: "'Outfit', sans-serif" }}
        >
            <div className="flex-auto text-8xl leading-7 max-md:max-w-full max-md:text-2xl mt-5">
                <Header toggleSignUp={toggleSignUp} toggleLogIn={toggleLogIn} isAuthorized={!!user} username={user?.username}/>
            </div>
            <div className="max-w-[1300px] mt-2">
                <div className="relative pr-52 ml-2.5 text-5xl tracking-widest leading-[54px] max-md:mt-5 max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
                    Welcome to our online service for converting playlists between online streaming services!
                </div>
                <div className="relative mt-20 ml-3 text-3xl leading-8 text-black text-opacity-60 max-md:mt-10 max-md:max-w-full">
                    Our playlist mover offers an easy and convenient way to transfer your beloved music.
                    Support Spotify and YouTube Music services.
                </div>
            </div>
            {showSignUp && <SignUp toggle={toggleSignUp} />}
            {showLogIn && <LogIn toggle={toggleLogIn} />}
                <button className="relative justify-center px-11 py-9 mt-16 mb-20 ml-3 text-2xl tracking-wide leading-7 text-center text-white uppercase bg-black hover:bg-purple-800 transition duration-300 rounded-3xl max-md:px-5 max-md:my-10 max-md:ml-2.5">
                    Start Converting
                </button>
        </div>
    );
}

export { Homepage };

