import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Notice, Notices, getNotificationList } from '../../api/notifications';
import { Post } from '../notifications/Posts';

const NewsSectionContainer = styled.section`
  background-color: #1a1a1d;
  padding: 20px 30px;
`;

const NewsCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  margin-right: 20px;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 75%; /* Aspect ratio of 4:3 */
  position: relative;
`;

const NewsImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NewsContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NewsTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const NewsDate = styled.div`
  font-size: 14px;
  opacity: 0.7;
`;

const NewsSummary = styled.p`
  font-size: 15px;
`;

const NewsHeader = styled.div`
  font-weight: bold;
  font-size: 50px;
  color: #00FCCE;
  text-align: left;
  padding-bottom: 20px;
  padding-top: 50px;
  padding-left: 40px;
`;

const NewsItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  gap: 20px;
  padding: 20px;
`;

const NewsTitleContainer = styled.div`
  display: flex;
`;

interface NewsItemProps {
  id: number;
  title: string;
  date: string;
  image: string;
  summary: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const getImageUrl = (image: string | File | undefined): string => {
  if (typeof image === 'string') {
    return image;
  } else if (image instanceof File) {
    return URL.createObjectURL(image);
  } else {
    // Provide a default placeholder if there's no image
    return '/path/to/default/image.png'; // Replace this with your actual default image path
  }
};

const NewsItem: React.FC<NewsItemProps> = ({ id, title, date, image, summary }) => (
  <NewsCard>
    <ImageContainer>
      <Link to={`/notifications/${id}`}
            onClick={() => window.scrollTo(0, 0)}>
      <NewsImage src={image} alt="news image" />
      </Link>
    </ImageContainer>
    <NewsContent>
      <NewsTitle>{truncateText(title, 15)}</NewsTitle>
      <NewsDate>{date}</NewsDate>
      <NewsSummary>{truncateText(summary, 15)}</NewsSummary>
    </NewsContent>
  </NewsCard>
);

const GoToNewsPageLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  font-weight: bold;
  margin-left: auto;
  padding-right: 60px;
  padding-top: 3%;
  cursor: pointer;
  a {
    text-decoration: none;
    color: #00FCCE;
  }
`;

const MainSection2 = () => {
  const [fetchedThree, setFetchedThree] = useState<Post[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const getThree = async () => {
      setIsFetching(true);
      try {
        const newsData = await getNotificationList() as Notices;
        const posts: Post[] = newsData.map((notice: Notice) => ({
          id: notice.noticeId,
          title: notice.noticeTitle,
          text: notice.noticeContent,
          image: notice.noticeImg,
          date: notice.noticeCreatedAt, // Convert Date to string
        }));
        const threeNews = posts.slice(-3).reverse(); // Get the last 3 items and reverse the order
        setFetchedThree(threeNews);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    };
    getThree();
  }, []);

  return (
    <NewsSectionContainer>
      <NewsTitleContainer>
        <NewsHeader>최신소식</NewsHeader>
        <GoToNewsPageLink>
          <a href="/notifications">소식 페이지 바로가기</a>
        </GoToNewsPageLink>
      </NewsTitleContainer>
      <NewsItemsContainer>
        {isFetching && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!isFetching && !error && fetchedThree.map((news) => (
          <NewsItem
            key={news.id}
            id={news.id} 
            title={news.title}
            date={news.date}
            summary={news.text}
            image={getImageUrl(news.image)}
          />
        ))}
      </NewsItemsContainer>
    </NewsSectionContainer>
  );
};

export default MainSection2;
