import React, { useEffect } from 'react';
import './Error.scss';
import { Link, useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const visual = document.getElementById("visual");
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const ratio = 45 / (width / height);
            if (visual) {
                visual.style.transform = `translate(-50%, -50%) rotate(-${ratio}deg)`;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);

        // Run once on mount
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, []);

    return (
        <div className="error">
            <Link className="back-button" onClick={() => navigate(-1)}>
                <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
                    <polyline fill="none" stroke="#777777" strokeWidth="0.1" points="0.9,0.1 0.1,0.5 0.9,0.9" />
                </svg> Go Back
            </Link>
            <div className="background-wrapper">
                <h1 id="visual">404</h1>
            </div>
            <p>The page you're looking for does not exist.</p>
        </div>
    );
};

export default Error;
