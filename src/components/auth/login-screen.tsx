'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth.provider';
import CustomButton from '@/components/custom/misc/button/custom-button';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const VALID_USER = { email: 'test@example.com', password: '123456' };

        if (email === VALID_USER.email && password === VALID_USER.password) {
            login();
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}

        >
            <style>{`
                .input-container {
                    margin-top: 12px;
                }
            
                .login-input {
                    border: 1.5px solid #1E2B19;
                    padding: 8px 8px 8px 16px;
                    width: 100%;
                    border-radius: 12px;
                }
                .button-group {
                    display: flex;
                    gap: 12px;
                    margin-top: 10px;
                }
                .bordered-button {
                    border: 1.5px solid #1E2B19;
                    background-color: transparent;
                    color: #1E2B19;
                    padding: 8px 16px;
                    font-size: 12px;
                    font-weight: bolder;
                    width: 50%;
                    border-radius: 12px;
                }
                .filled-button {
                    background-color: #1E2B19;
                    color: white;
                    padding: 8px 16px;
                    border: none;
                    width: 100%;
                    font-size: 12px;
                    font-weight: bolder;
                    border-radius: 12px;
                }
                .error-message {
                    color: red;
                    font-size: 12px;
                    margin-top: 10px;
                }
            `}</style>

            <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Login</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="input-container">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="login-input"
                    />
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <CustomButton filled type="submit">
                    Login
                </CustomButton>
            </form>
        </div>
    );
}
