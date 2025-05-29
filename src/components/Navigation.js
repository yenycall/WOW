import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';
import MetaballLogo from './MetaballLogo';

const Navigation = () => {
    // useLocation 훅을 사용하여 현재 경로 가져오기
    const location = useLocation();
    const { pathname } = location;

    return (
        <nav className="nav">
            <div className='logo'>
                <Link to="/" className="link">
                <MetaballLogo />
                    {/* <div className='circle circle1'></div>
                    <div className='circle circle2'></div>
                    <div className='circle'></div>
                    <div className='circle circle1'></div>
                    <div className='circle circle2'></div> */}

                </Link>
            </div>
            <ul className="menu">
                <li className={`menuList ${pathname === '/playlist' ? 'active' : ''}`}>
                    <Link to="/playlist" className="link">
                        Playlist
                    </Link>
                </li>
                <li className={`menuList ${pathname === '/movie' ? 'active' : ''}`}>
                    <Link to="/movie" className="link">Movie</Link>
                </li>
                <li className={`menuList ${pathname === '/book' ? 'active' : ''}`}>
                    <Link to="/book" className="link">Book</Link>
                </li>
                <li className={`menuList ${pathname === '/quote' ? 'active' : ''}`}>
                    <Link to="/quote" className="link">Quote</Link>
                </li>
                <li className={`menuList ${pathname === '/myarchive' ? 'active' : ''}`}>
                    <Link to="/myarchive" className="link">My Archive</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
