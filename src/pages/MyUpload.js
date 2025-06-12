import React, { useState, useEffect } from 'react';
import UploadForm from '../components/UploadForm';
import '../styles/Main.css';
import '../styles/MyUpload.css';

const MyUpload = () => {
    const [userContent, setUserContent] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUserContent = () => {
        try {
            const content = JSON.parse(localStorage.getItem('userContent')) || [];
            setUserContent(content);
        } catch (error) {
            console.error('컨텐츠 업로드 실패:', error);
            setUserContent([]);
        }
    };

    useEffect(() => {
        loadUserContent();
        setLoading(false);
    }, []);

    useEffect(() => {
        const handleUserContentUpdated = () => {
            loadUserContent();
        };

        window.addEventListener('userContentUpdated', handleUserContentUpdated);
        
        return () => {
            window.removeEventListener('userContentUpdated', handleUserContentUpdated);
        };
    }, []);

    const deleteContent = (contentId) => {
        if (window.confirm('이 컨텐츠를 삭제하시겠습니까?')) {
            const updatedContent = userContent.filter(item => item.id !== contentId);
            localStorage.setItem('userContent', JSON.stringify(updatedContent));
            setUserContent(updatedContent);
            alert('컨텐츠가 삭제되었습니다.');
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className="loading">로딩 중...</div>;
    }

    return (
        <div className="main-container">
            <div className="upload-grid-container">
                <div className="keywordList">
                    <div className="keyword">+ Add</div>
                    <div className="keywordText">My Contents</div>
                </div>

                <div className="upload-grid">
                    <UploadForm />

                    <div className="user-content-section">
                        <div className="section-header">
                            <p>Upload ({userContent.length})</p>
                        </div>
                        
                        {userContent.length === 0 ? (
                            <div className="no-content-message">
                                <p class="no-content-big">+</p>
                                <p class="no-content-big">아직 추가한 컨텐츠가 없습니다.</p>
                                <p class="no-content-small">업로드 폼을 이용해 컨텐츠를 추가해보세요!</p>
                            </div>
                        ) : (
                            <div className="user-content-grid">
                                {userContent.map(item => (
                                    <div key={item.id} className="user-content-card">
                                        {item.image && (
                                            <div className="content-image">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="content-info">
                                            <div className="content-header">
                                                <span className="content-type">{item.type}</span>
                                                <button 
                                                    className="delete-button"
                                                    onClick={() => deleteContent(item.id)}
                                                    title="삭제"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            
                                            <h4 className="content-title">{item.title}</h4>
                                            
                                            {item.author && (
                                                <p className="content-author">{item.author}</p>
                                            )}
                                            
                                            {item.content && (
                                                <p className="content-description">
                                                    {item.content.length > 100 
                                                        ? `${item.content.substring(0, 100)}...` 
                                                        : item.content
                                                    }
                                                </p>
                                            )}
                                            
                                            <p className="content-date">
                                                {formatDate(item.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyUpload;