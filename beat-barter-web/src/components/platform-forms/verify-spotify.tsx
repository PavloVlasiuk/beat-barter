import { FC } from 'react';
import spotify from '../../assets/spotify.png';

interface VerifySpotifyFormProps {
    url: string;
}

const VerifySpotifyForm: FC<VerifySpotifyFormProps> = ({ url }: VerifySpotifyFormProps) => {
    const handleVerify = () => {
        window.location.href = url;
    }

    return (
        <div className="flex justify-center w-full">
            <div className="max-w-lg w-full px-8 py-8 mb-60 rounded-3xl border border-red-500 bg-white shadow-lg" style={{marginTop: '1vh'}}>
                <img src={spotify} alt="transfer" className="w-1/2 mx-auto" />
                <h3 className="text-3xl font-bold mt-5 text-center">Verify your spotify account</h3>
                <button className="mt-5 px-4 py-5 bg-black text-white font-semibold text-2xl rounded-lg hover:bg-gray-500 transition duration-300 focus:outline-none w-full" onClick={handleVerify}>Verify</button>
            </div>
        </div>
    );
}

export default VerifySpotifyForm;