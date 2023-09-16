import React from 'react'
import './Error.scss';
import { Link } from 'react-router-dom';

class Error extends React.Component {
    componentDidMount() {
        const visual = document.getElementById("visual")
        const events = ['resize', 'load']

        events.forEach(function (e) {
            window.addEventListener(e, function () {
                const width = window.innerWidth
                const height = window.innerHeight
                const ratio = 45 / (width / height)
                visual.style.transform = "translate(-50%, -50%) rotate(-" + ratio + "deg)"
            });
        });
    }
    render() {
        return (
            <>
                <div className="error">
                    <Link to={"/"}>
                        <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
                            <polyline fill="none" stroke="#777777" strokeWidth="0.1" points="0.9,0.1 0.1,0.5 0.9,0.9" />
                        </svg> Home
                    </Link>
                    <div className="background-wrapper">
                        <h1 id="visual">404</h1>
                    </div>
                    <p>The page you're looking for does not exist.</p>
                </div>
            </>
        )
    }
}

export default Error