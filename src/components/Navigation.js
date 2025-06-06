import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';
import MetaballLogo from './MetaballLogo';

const Navigation = () => {

    const location = useLocation();
    const { pathname } = location;

    return (
        <nav className="nav">
            <div className='logo'>
                <Link to="/" className="link">
                <MetaballLogo />

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
                <li className={`menuList ${pathname === '/myupload' ? 'active' : ''}`}>
                    <Link to="/myupload" className="link">My Upload</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
