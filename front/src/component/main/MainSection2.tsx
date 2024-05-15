import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Notice, Notices, getNotificationList } from '../../api/notifications';
import { Post } from '../notifications/Posts';
// import defaultIMG from './DefaultNotificationIMG.webp';

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
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 10px;
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
  title: string;
  date: string;
  image: string;
  summary: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, date, image, summary }) => (
  <NewsCard>
    <NewsImage src={image} alt="news image" />
    <NewsContent>
      <NewsTitle>{title}</NewsTitle>
      <NewsDate>{date}</NewsDate>
      <NewsSummary>{summary}</NewsSummary>
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
          content: notice.noticeContent,
          image: notice.noticeImg,
          date: new Date(notice.createdAt).toLocaleDateString(), // Convert Date to string
        }));
        const threeNews = posts.slice(-3);
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
            title={news.title}
            date={news.date}
            summary={news.content}
            image={news.image ?? 'defaultIMG'}
          />
        ))}
      </NewsItemsContainer>
    </NewsSectionContainer>
  );
};

export default MainSection2;
