import React, { useState } from 'react';


const Footer = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <footer style={styles.footer}>
            <p>© 2025 <span style={styles.span}>WOW : World Of Word</span> ALL RIGHTS RESERVED</p>
            <p><span style={styles.span}>CONTACT YENYCALL</span> for more information |&nbsp;
                <a
                    href="mailto:yenycall817@gmail.com"
                    style={isHovered ? { ...styles.link, ...styles.linkHover } : styles.link}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    yenycall817@gmail.com</a></p>
        </footer>
    );
};

const styles = {
    footer: {
        borderTop: 'solid 0.1vw #000',
        paddingTop: '1vw',
        margin: '3vw 0',
        fontSize: '1vw',
        fontWeight: '500',
        lineHeight: '1vw',
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        color: '#000',
        textDecoration: 'none',
        transition: 'color 0.3s'
    },
    span: {
        fontWeight: '550'
    },
    linkHover: {
        backgroundColor: '#FFEF5F'
    }
};

export default Footer;