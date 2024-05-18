import styled from 'styled-components';
import { ReactNode, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Post } from "./Posts";
import { Notice, getNotificationDetail } from '../../api/notifications';
import DefaultIMG from './DefaultNotificationIMG.webp';
import './Notifications.css';

const Title = styled.h2`
  font-size: 40px;
  font-family: 'Black Han Sans', sans-serif;
  color: #00FCCE;
  margin-top: 70px;
  text-align: center; /* 제목을 가운데 정렬 */
`;

const Section = styled.section`
  background-color: #1a1a1d;
  min-height: 100vh;
  width: 100vw; /* 화면의 전체 너비를 차지 */
  display: flex;
  flex-direction: column; /* 추가: 목록으로 링크를 아래에 배치 */
  align-items: center;
  justify-content: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #1a1a1d;
  max-width: 800px; /* 콘텐츠의 최대 너비 설정 */
  width: 90%; /* 부모 컨테이너의 너비 */
  box-sizing: border-box; /* 패딩과 테두리 크기를 포함 */
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Content = styled.p`
  word-wrap: break-word; /* 긴 단어나 문자열이 다음 줄로 넘어가도록 함 */
  white-space: pre-wrap; /* 공백과 줄바꿈을 유지하여 줄바꿈을 허용 */
  overflow-wrap: break-word; /* 긴 단어가 줄바꿈되도록 함 */
  text-align: center; /* 내용 가운데 정렬 */
  max-width: 800px; /* 콘텐츠의 최대 너비 설정 */
  margin-top: 50px;
  width: 100%;
  box-sizing: border-box; /* 패딩과 테두리 크기를 포함 */
`;

const ToList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1d;
  font-weight: bold;
  margin-top: 20px; /* 링크와 콘텐츠 사이의 간격 조정 */
  cursor: pointer;
  width: 100%; /* 부모 컨테이너의 너비 */

  a {
    text-decoration: none;
    color: #00FCCE;
  }
`;

function NotificationDetail() {
  const { noticeId } = useParams<{ noticeId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOnePost() {
      if (!noticeId) {
        setError("No notice ID provided.");
        return;
      }
      setIsFetching(true);
      try {
        const response = await getNotificationDetail(parseInt(noticeId)) as Notice;
        const post: Post = {
          id: response.noticeId,
          title: response.noticeTitle,
          content: response.noticeContent,
          image: response.noticeImg ?? 'DefaultIMG',
          date: response.noticeCreatedAt, // 적절한 날짜 형식으로 변경
        };
        setPost(post);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
      }
      setIsFetching(false);
    }
    fetchOnePost();
  }, [noticeId]);

  let content: ReactNode;

  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>Error: {error}</p>;
  } else if (post) {
    content = (
      <PostContainer>
        <Title>{post.title}</Title>
        {post.image && <Image src={post.image} alt={post.title} />}
        <Content>{post.content}</Content>
      </PostContainer>
    );
  } else {
    content = <p>No post found.</p>;
  }

  return (
    <>
      <Section>
        {content}
        <ToList>
          <a href="/notifications">목록으로</a>
        </ToList>
      </Section>
    </>
  );
}

export default NotificationDetail;
