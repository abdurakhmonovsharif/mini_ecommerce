import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotPage = () => {
    const navigate = useNavigate()
    return (
        <div className='notPage'>
            <h1>404</h1>
            <button onClick={() => navigate('/')}>go to back</button>
        </div>
    );
}

export default NotPage;
