import React, { useState } from 'react';
import '../styles/UploadForm.css';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    type: 'Music',
    content: '',
    image: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentTypes = ['Music', 'Movie', 'Book', 'Quote', 'ETC'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const existingContent = JSON.parse(localStorage.getItem('userContent')) || [];
      
      const newContent = {
        id: `user_${Date.now()}`, 
        title: formData.title.trim(),
        author: formData.author.trim() || 'undefined',
        type: formData.type,
        content: formData.content.trim(),
        image: formData.image.trim(),
        createdAt: new Date().toISOString(),
        isUserContent: true 
      };

      const updatedContent = [...existingContent, newContent];
      
      localStorage.setItem('userContent', JSON.stringify(updatedContent));

      alert('컨텐츠가 성공적으로 추가되었습니다!');
      
      setFormData({
        title: '',
        author: '',
        type: 'Music',
        content: '',
        image: ''
      });

      window.dispatchEvent(new Event('userContentUpdated'));

    } catch (error) {
      console.error('컨텐츠 저장 실패:', error);
      alert('컨텐츠 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      type: 'Music',
      content: '',
      image: ''
    });
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title 제목 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="컨텐츠 제목을 입력하세요"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">Creator 저작자</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="작가, 아티스트, 감독 등 저작자를 입력하세요"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type" className="form-label">Genre 장르</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-select"
          >
            {contentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">Content 내용</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="가사, 명언, 줄거리, 감상평 등 자신의 언어를 적어주세요"
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Image URL 이미지 링크</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="form-input"
          />
          
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? '+ ...' : 'Upload'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default UploadForm;