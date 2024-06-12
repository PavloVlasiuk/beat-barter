import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    toggleSignUp: () => void;
    toggleLogIn: () => void;
    isAuthorized: boolean;
    username?: string;
}

const Header: FC<HeaderProps> = ({ toggleSignUp, toggleLogIn, isAuthorized , username}) => {

    const handleSignUpClick = (event: MouseEvent<HTMLButtonElement>) => {
        toggleSignUp();
    };

    const handleLogInClick = (event: MouseEvent<HTMLButtonElement>) => {
        toggleLogIn();
    };

    return (
        <div className="flex items-center justify-between">
            <Link to="/" style={{ textDecoration: 'none' }} className="text-10xl font-bold hover:text-purple-800 transition duration-300">BeatBarter</Link>
            {
                isAuthorized ?
                    <div
                        className="absolute top-0 right-0 flex space-x-6 mt-20 mr-40 text-5xl tracking-wide leading-7 text-center text-black uppercase"

                    >
                        {username}
                    </div>
                    :
                    <div className="absolute top-0 right-0 flex space-x-6 mt-20 mr-40">
                        <button
                            className="relative justify-center px-11 py-5 text-2xl tracking-wide leading-7 text-center text-white uppercase bg-black hover:bg-purple-800 transition duration-300 rounded-3xl"
                            onClick={handleSignUpClick}
                        >
                            Sign up
                        </button>
                        <button
                            className="relative justify-center px-11 py-5 text-2xl tracking-wide leading-7 text-center text-white uppercase bg-black hover:bg-purple-800 transition duration-300 rounded-3xl"
                            onClick={handleLogInClick}
                        >
                            Log in
                        </button>
                    </div>
            }
        </div>
    );
}

export default Header;