import React, { FC } from 'react';
import transfer from '../../assets/transer.png';
import spotifyService from '../../services/spotify/spotify.service';
import toastErrorHandler from '../../lib/http-client/toast-error-handler';
import { useNavigate } from 'react-router-dom';

const TransferForm: FC = () => {
    const navigate = useNavigate();

    const handleTransfer = async () => {
        try {
            await spotifyService.transfer();
            alert('Playlist transferred succesfully');
            navigate('/');
        } catch (e) {
            toastErrorHandler.handle('Error transfering playlist', 'error')
        }
    }

    return (
        <div className="flex justify-center w-full">
            <div className="max-w-lg w-full px-8 py-8 mb-60 rounded-3xl border border-green-500 bg-white shadow-lg" style={{margin: '16vh'}}>
                <img src={transfer} alt="Spotify" className="w-2/5 mx-auto"/>
                <h3 className="text-4xl font-bold mt-5 text-center">Transfer Playlist</h3>
                <button className="mt-10 px-4 py-2 bg-green-500 text-xl text-white font-semibold rounded-lg hover:bg-black focus:outline-none w-full" onClick={handleTransfer}>Transfer</button>
            </div>
        </div>
    );
}

export default TransferForm;