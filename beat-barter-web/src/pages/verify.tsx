import background from '../assets/background.png';
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../services/auth/auth.service";

const Verify = () => {
    const {token} = useParams();

    const navigate = useNavigate();
    const handleButtonClick = async () => {
        await authService.verify(token!);
        navigate("/")
    }

    return (
        <div className="flex overflow-hidden relative flex-col items-start px-20 py-20 w-full min-h-[850px] max-md:px-5 max-md:max-w-full"
            style={{ backgroundImage: `url(${background})`, backgroundSize: '100% 100%', backgroundPosition: 'center', height: '100vh', fontFamily: "'Outfit', sans-serif" }}
        >
            <div className="flex-auto text-8xl leading-7 max-md:max-w-full max-md:text-2xl mt-5">
                <Link to="/" style={{ textDecoration: 'none' }} className="text-10xl font-bold hover:text-purple-800 transition duration-300">BeatBarter</Link>
            </div>
                <button
                    className="flex justify-center px-11 py-9 mt-36 mb-36 ml-36 text-5xl tracking-wide leading-7 text-center text-white uppercase bg-black hover:bg-purple-800 transition duration-300 rounded-3xl max-md:px-5 max-md:my-10 max-md:ml-2.5" onClick={handleButtonClick}>
                Verify
                </button>
        </div>
    )
}

export default Verify;