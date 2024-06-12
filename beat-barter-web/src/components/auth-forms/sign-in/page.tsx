import { FC, useState, ChangeEvent, FormEvent } from 'react';
import {ILoginUser} from "../../../services/auth/interfaces/login-user.interface";
import authService from "../../../services/auth/auth.service";
import './sign-in.css'

interface SignInProps {
    toggle: () => void;
}

const SignIn: FC<SignInProps> = (props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: ILoginUser = {
            username,
            password,
        };
        await authService.login(user)
        props.toggle();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </label>
                    <div className="button-group">
                        <button type="submit">Log in</button>
                        <button type="button" onClick={props.toggle}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;