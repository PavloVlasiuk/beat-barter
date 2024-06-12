import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import {IRegisterUser} from "../../services/auth/interfaces/register-user.interface";
import authService from "../../services/auth/auth.service";

interface SignUpProps {
    toggle: () => void;
}

const SignUp: FC<SignUpProps> = (props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        const user: IRegisterUser = {
            username,
            password,
            email
        };
        await authService.register(user)
        props.toggle();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Create account</h2>
                <form onSubmit={handleSignUp}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </label>
                    <div className="button-group">
                        <button type="submit">Sign up</button>
                        <button type="button" onClick={props.toggle}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { SignUp };