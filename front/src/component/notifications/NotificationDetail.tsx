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
  margin: 0;
`;

const Section = styled.section`
  background-color: #1a1a1d;
  min-height: 100vh;
  width: 100vw; /* 화면의 전체 너비를 차지 */
  display: flex;
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
  width: 100%;
`;

const ToList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1d;
  font-weight: bold;
  margin-left: auto;
  padding-top: 3%;
  cursor: pointer;

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
          image: response.noticeImg ?? DefaultIMG,
          date: new Date(response.createdAt).toLocaleDateString(), // 적절한 날짜 형식으로 변경
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
        <br />
        {post.image && <img src={post.image} alt={post.title} />}
        <br />
        <br />
        <p>{post.content}</p>
      </PostContainer>
    );
  } else {
    content = <p>No post found.</p>;
  }

  return (
    <>
      <Section>
        {content}
      </Section>
      <ToList>
        <a href="/notifications">목록으로</a>
      </ToList>
    </>
  );
}

export default NotificationDetail;
