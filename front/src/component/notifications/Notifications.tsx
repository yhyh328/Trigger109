import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Notice, Notices, getNotificationList } from '../../api/notifications';
import { Post } from '../notifications/Posts';
import defaultIMG from './DefaultNotificationIMG.webp';

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

const NewsTitleContainer = styled.div`
  display: flex;
`;

const NewsItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns */
  gap: 20px;
  padding: 20px;
`;

interface NewsItemProps {
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

const NewsItem: React.FC<NewsItemProps> = ({ title, date, image, summary }) => (
  <NewsCard>
    <ImageContainer>
      <NewsImage src={image} alt="news image" />
    </ImageContainer>
    <NewsContent>
      <NewsTitle>{truncateText(title, 15)}</NewsTitle>
      <NewsDate>{date}</NewsDate>
      <NewsSummary>{summary}</NewsSummary>
    </NewsContent>
  </NewsCard>
);

const Notifications = () => {
  const [fetchedNotifications, setFetchedNotifications] = useState<Post[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const getWholeNotifications = async () => {
      setIsFetching(true);
      try {
        const newsData = await getNotificationList() as Notices;
        const posts: Post[] = newsData.map((notice: Notice) => ({
          id: notice.noticeId,
          title: notice.noticeTitle,
          content: notice.noticeContent,
          image: notice.noticeImg,
          date: new Date(notice.createdAt).toLocaleDateString(), // Convert Date to string
        }));
        setFetchedNotifications(posts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    };
    getWholeNotifications();
  }, []);

  return (
    <>
      <br></br>
      <NewsSectionContainer>
        <NewsTitleContainer>
          <NewsHeader>공지사항</NewsHeader>
        </NewsTitleContainer>
        <NewsItemsContainer>
          {isFetching && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!isFetching && !error && fetchedNotifications.map((news) => (
            <NewsItem
              key={news.id}
              title={news.title}
              date={news.date}
              summary={news.content}
              image={news.image ?? defaultIMG} // Correct usage of defaultIMG
            />
          ))}
        </NewsItemsContainer>
      </NewsSectionContainer>
    </>
  );
};

export default Notifications;