import React from 'react';
import styled from 'styled-components';
import GuideButton from './GuideButton';
import { useNavigate } from 'react-router-dom';
import { playGunShot, playGunLoad } from '../../soundEffects';

const NewsSectionContainer = styled.section`
  background-color: #1a1a1d;
  padding: 20px 30px; /* 좌우 패딩을 30px로 조정 */
`;

const NewsCard = styled.div`
  flex: 0 0 auto; /* flex-grow, flex-shrink, flex-basis */
  width: 300px; /* 카드의 너비 */
  margin-right: 20px; /* 카드 간의 간격 */
  color: white; /* 텍스트 색상 */
  border-radius: 10px; /* 카드 모서리 둥글기 */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 그림자 효과 */
  overflow: hidden; /* 내부 이미지가 모서리 둥글기에 영향받도록 */
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px; /* 이미지 높이 */
  object-fit: cover; /* 이미지 비율 유지 */
`;

const NewsContent = styled.div`
  padding: 10px;
`;

const NewsTitle = styled.h3`
  margin: 0;
  font-size: 18px; /* 제목 크기 */
`;

const NewsDate = styled.div`
  font-size: 14px; /* 날짜 크기 */
  opacity: 0.7;
`;

const NewsSummary = styled.p`
  font-size: 15px; /* 요약 텍스트 크기 */
`;

const NewsHeader = styled.div`
  font-weight: bold;
  font-size: 50px;
  color: #00FCCE;
  text-align: left; /* 왼쪽 정렬로 변경 */
  padding-bottom: 20px; /* 최신소식 아래에 패딩 추가 */
  padding-top: 50px;
  padding-left: 40px;
`;

const NewsItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  gap: 20px; /* 카드 간 간격을 gap 속성으로 조정 */
  padding: 20px; /* 상하 패딩만 적용 */
`;

const NewsTitleContainer = styled.div`
  display: flex;
  `;

const NotificationsButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
`;

interface NewsItemProps {
    title: string;
    date: string;
    summary: string;
    image: string;
  }

// 데이터와 구조를 감안하여 컴포넌트를 만듭니다.
const NewsItem: React.FC<NewsItemProps> = ({ title, date, summary, image }) => {
  return (
    <NewsCard>
      <NewsImage src={image} alt="news image" />
      <NewsContent>
        <NewsTitle>{title}</NewsTitle>
        <NewsDate>{date}</NewsDate>
        <NewsSummary>{summary}</NewsSummary>
      </NewsContent>
    </NewsCard>
  );
};

const GoToNewsPageLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: right; // 링크를 중앙 정렬
  font-weight: bold;
  margin-left: auto; // 이전 아이템과의 간격을 유지
  padding-right: 60px;
  padding-top: 100px;
  cursor: pointer;
  a {
    text-decoration: none; // 밑줄 제거
    color: #00FCCE;
  }
`;

// 최신 소식 섹션을 만듭니다.
const MainSection2 = () => {

    const handleNotificationsButtonEnter = () => {
      playGunLoad();
    }

    const navigate = useNavigate();

    const handleNotificationsButtonClick = () => {
      playGunShot();
      navigate('/notifications');
      window.scrollTo(0, 0);
    }

    const newsData = [
        { title: "패치 노트 2.07 출시", date: "2024-04-17", summary: "새로운 패치 노트를 확인하세요. 이번 패치에서는...", image:'valorent.jpg' },
        { title: "신규 이벤트 시작", date: "2024-04-20", summary: "신규 이벤트가 시작됩니다. 참여하여 독특한 보상을 얻으세요!", image:'valorent.jpg' },
        { title: "요원 현황 2024년 4월", date: "2024-04-27", summary: "요원 현황을 확인하세요!", image:'valorent.jpg' },
        // 추가 뉴스 항목...
    ];


    return (
        <NewsSectionContainer>
          <NewsTitleContainer>
            <NewsHeader>최신소식</NewsHeader>
            <GoToNewsPageLink>
            <GuideButton 
            label="더 많은 소식들" 
            onMouseEnter={handleNotificationsButtonEnter} 
            onClick={handleNotificationsButtonClick} 
          />
            </GoToNewsPageLink>
          </NewsTitleContainer>
          <NewsItemsContainer>
            {newsData.map((news, index) => (
              <NewsItem
                key={index}
                title={news.title}
                date={news.date}
                summary={news.summary}
                image={news.image}
              />
            ))}
          </NewsItemsContainer>
        </NewsSectionContainer>
      );
};

export default MainSection2;
