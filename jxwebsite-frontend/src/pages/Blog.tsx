import React, { useState } from 'react';
import BlogNavbar from '../Blog/BlogNavbar';
import '../Blog/Blog.css'; // 確保引入 CSS 檔案
import sanitizeHtml from 'sanitize-html';


const Blog: React.FC = () => {
  const [currentContent, setCurrentContent] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [currentCreatetime, setCurrentCreatetime] = useState<string | null>(null);  
  const [currentUpdatetime, setCurrentUpdatetime] = useState<string | null>(null);  


  const handleItemClick = (subject : string , content: string, createtime : string , updatetime : string) => {
    setCurrentContent(content);
    setCurrentSubject(subject);
    setCurrentCreatetime( createtime)
    setCurrentUpdatetime( updatetime)
  };

  const sanitizedContent = currentContent 
    ? sanitizeHtml(currentContent, {
        allowedTags: [
          'p', 'br', 'b', 'i', 'strong', 'em', 
          'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'span'
        ],
        allowedAttributes: {
          // 如果需要保留某些屬性
          'span': ['style']
        }
      }) 
    : '';

  return (
    <div className="blog-container">
      <BlogNavbar onItemClick={handleItemClick} />
      <div className="blog-content">
        {currentContent ? (
          <>
          <span style={{fontSize:'xx-large' , textDecoration:'underline' ,color :'wheat'}}>{currentSubject}</span>&emsp;	&emsp;
          <span style={{ fontSize: '0.9rem', color: 'white', textDecoration : 'underline'}}>
          {currentCreatetime ? `發佈時間：${new Date(currentCreatetime).toLocaleString()}` : '無日期'}
          </span>&emsp;	&emsp;
          <span style={{ fontSize: '0.9rem', color: 'white', textDecoration : 'underline'}}>
          {currentUpdatetime ? `更新時間：${new Date(currentUpdatetime).toLocaleString()}` : ''}
          </span>
          <div 
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
          className="blog-content-html" 
          />
          </>
        ) : (
          <p>選擇一個項目以顯示內容</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
