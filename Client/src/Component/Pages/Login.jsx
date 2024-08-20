import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const [error, setError] = useState({ email: '', password: '' });

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let emailerror = '';
        let passworderror = '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email.trim() === '') {
            emailerror = 'Email field should be filled';
        } else if (!emailRegex.test(data.email)) {
            emailerror = 'Enter a valid Email';
        }

        if (data.password.trim() === '') {
            passworderror = 'Password field should be filled';
        } else if (data.password.length < 5) {
            passworderror = 'Password length should be at least 5 characters';
        }

        setError({ email: emailerror, password: passworderror });

        if (emailerror === '' && passworderror === '') {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    if (data.status) {
                        dispatch({
                            type: 'data',
                            payload: { token: data.token, name: data.data.name, email: data.data.username },
                        });
                        navigate('/home');
                    }
                })
                .catch((err) => {
                    alert(err.error);
                });
        }
    };

    return (
        <div style={{
            backgroundColor: '#1E1E1E',
            color: '#E0E0E0',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            width: '50%',
            margin: 'auto',
            marginTop: '50px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', color: '#FFD700' }}>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#FFD700' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#2C2C2C',
                            color: '#E0E0E0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                        value={data.email}
                        onChange={handleData}
                    />
                    <p style={{ color: 'red', marginTop: '5px' }}>{error.email}</p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="pass" style={{ display: 'block', marginBottom: '5px', color: '#FFD700' }}>Password:</label>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        placeholder="Enter Password"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#2C2C2C',
                            color: '#E0E0E0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                        value={data.password}
                        onChange={handleData}
                    />
                    <p style={{ color: 'red', marginTop: '5px' }}>{error.password}</p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button type="submit" style={{
                        padding: '10px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#FFD700',
                        color: '#000',
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        transition: 'background-color 0.3s ease'
                    }}>
                        Login
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ color: '#E0E0E0' }}>
                        Don't have an account? <Link to="/register" style={{ color: '#FFD700' }}>Register here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
