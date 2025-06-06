import React, { useState, useRef, useEffect } from 'react';
import '../styles/Main.css';

const Main = () => {

    const alternativeWords = [
        "Love",
        "Eternity",
        "Hyper",
        "Summer",
        "People"
    ];


    const [currentWord, setCurrentWord] = useState("Word");
    

    const titleRef = useRef(null);
    

    const handleGridItemHover = (index) => {

        setCurrentWord(alternativeWords[index]);
        

        if (titleRef.current) {

            titleRef.current.style.backgroundSize = "100% 100%";
        }
    };


    const handleGridItemLeave = () => {
        setCurrentWord("Word");
        

        if (titleRef.current) {
            titleRef.current.style.backgroundSize = "0% 100%";
        }
    };

    useEffect(() => {
        const titleElement = titleRef.current;
        
        if (titleElement) {
            const handleTitleMouseEnter = () => {
                titleElement.style.backgroundSize = "100% 100%";
            };
            
            const handleTitleMouseLeave = () => {
                titleElement.style.backgroundSize = "0% 100%";
            };
            

            titleElement.addEventListener('mouseenter', handleTitleMouseEnter);
            titleElement.addEventListener('mouseleave', handleTitleMouseLeave);
            

            return () => {
                titleElement.removeEventListener('mouseenter', handleTitleMouseEnter);
                titleElement.removeEventListener('mouseleave', handleTitleMouseLeave);
            };
        }
    }, []); 

    return (
        <div className="main-container">
            <main>
                <div className="main">
                    
                    <p className='titleP' ref={titleRef}>World Of {currentWord}</p>
                </div>

                <div className='circle'></div>

                <p className='contentP'>
                    © 2025 <br></br>
                    Archive WOW (World of Word) 는 다양한 콘텐츠 속 언어 표현들을 의미있게 보관할 수 있게 합니다.<br></br>
                    단어와 문장 사이 감정과 의미를 담은 콘텐츠로 담은 웹사이트로
                    서로의 단어를 나누고 언어 세계를 만들어갈 수 있기를 바랍니다.
                </p>
            </main>

            <div className="grid-container">
                <div className="grid-box grid1"></div>
                <div className="grid-box grid2"></div>
                <div className="grid-box grid3"></div>
                <div className="grid-box grid4"></div>
                <div className="grid-box grid5"></div>
                <div className="grid-box grid6"></div>
                <div className="grid-box grid7"></div>
                <div className="grid-box grid8"></div>
                <div className="grid-box grid9"></div>
                <div className="grid-box grid10"></div>
                <div className="grid-box grid11"></div>
                <div className="grid-box grid12"></div>
                <div className="grid-box grid13"></div>
                <div className="grid-box grid14"></div>
                <div className="grid-box grid15"></div>
                <div className="grid-box grid16"></div>
                <div className="grid-box grid17"></div>
                <div className="grid-box grid18"></div>
                <div className="grid-box grid19"></div>
                <div className="grid-box grid20"></div>
                <div className="grid-box grid21"></div>
                <div className="grid-box grid22"></div>
                <div className="grid-box grid23"></div>
                <div className="grid-box grid24"></div>
            </div>
        </div>
    );
};

export default Main;