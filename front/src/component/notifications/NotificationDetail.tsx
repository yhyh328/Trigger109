import styled from 'styled-components';
import { ReactNode, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Post } from "./Posts";
import { Notice, getNotificationDetail } from '../../api/notifications';
import './Notifications.css';

const Title = styled.h2`
  font-size: 40px;
  font-family: 'Black Han Sans', sans-serif;
  color: #00FCCE;
  margin: 0;
`;

const PostContainer = styled.div`
  color: white;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #1a1a1d;
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
          image: response.noticeImg ?? '',
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
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt={post.title} />}
      </PostContainer>
    );
  } else {
    content = <p>No post found.</p>;
  }

  return (
    <main>
      {content}
    </main>
  );
}

export default NotificationDetail;
