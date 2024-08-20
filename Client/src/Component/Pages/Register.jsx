import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
        name: '',
        mobile: '',
    });
    const [error, setError] = useState({ email: '', password: '', name: '', mobile: '' });

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let emailerror = '';
        let passworderror = '';
        let nameerror = '';
        let mobileerror = '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.username.trim() === '') {
            emailerror = 'Email field should be filled';
        } else if (!emailRegex.test(data.username)) {
            emailerror = 'Enter a valid Email';
        }

        if (data.password.trim() === '') {
            passworderror = 'Password field should be filled';
        } else if (data.password.length < 5) {
            passworderror = 'Password length should be at least 5 characters';
        }

        if (data.name.trim() === '') {
            nameerror = 'Name field should be filled';
        }

        if (data.mobile.trim() === '') {
            mobileerror = 'Mobile field should be filled';
        } else if (data.mobile.length !== 10) {
            mobileerror = 'Mobile number should be exactly 10 digits';
        }

        setError({ email: emailerror, password: passworderror, name: nameerror, mobile: mobileerror });

        if (emailerror === '' && passworderror === '' && nameerror === '' && mobileerror === '') {
            fetch('https://cipherschoolassignment-0jto.onrender.com/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((info) => info.json())
                .then((data) => {
                    alert(data.message);
                    setData({ username: '', password: '', name: '', mobile: '' });
                    navigate('/');
                })
                .catch((error) => {
                    alert(error.message);
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
            <h2 style={{ textAlign: 'center', color: '#FFD700' }}>Register Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#FFD700' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="username"
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
                        value={data.username}
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

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', color: '#FFD700' }}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#2C2C2C',
                            color: '#E0E0E0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                        value={data.name}
                        onChange={handleData}
                    />
                    <p style={{ color: 'red', marginTop: '5px' }}>{error.name}</p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="mobile" style={{ display: 'block', marginBottom: '5px', color: '#FFD700' }}>Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#2C2C2C',
                            color: '#E0E0E0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                        value={data.mobile}
                        onChange={handleData}
                    />
                    <p style={{ color: 'red', marginTop: '5px' }}>{error.mobile}</p>
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
                        Register
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ color: '#E0E0E0' }}>
                        Already have an account? <Link to="/" style={{ color: '#FFD700' }}>Login here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
