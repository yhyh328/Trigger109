import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Notice, getNotificationDetail } from '../../api/notifications';
import ErrorMessage from "./ErrorMessage";
import defaultIMG from './DefaultNotificationIMG.webp';
import './Notifications.css';

const Title = styled.h2`
  font-size: 40px; // Adjusted for detail view
  font-family: 'Black Han Sans', sans-serif;
  color: #00FCCE;
  margin: 0;
`;

const PostContainer = styled.div`
  background: #1a1a1a;
  color: white;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
`;

function NotificationDetail() {
  const { noticeId } = useParams<{ noticeId: string }>(); // Extracting the noticeId from route parameters
  const [post, setPost] = useState<Notice | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchOnePost() {
      if (!noticeId) {
        setError("No notice ID provided.");
        return;
      }
      
      setIsFetching(true);
      try {
        const data = await getNotificationDetail(parseInt(noticeId)); // Fetching the notification detail
        setPost(data);
        console.log(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
      setIsFetching(false);
    }
    fetchOnePost();
  }, [noticeId]);

  let content;

  if (error) {
    content = <ErrorMessage text={error} />;
  } else if (isFetching) {
    content = <p>Loading...</p>;
  } else if (post) {
    content = (
      <PostContainer>
        <Title>{post.noticeTitle}</Title>
        <img src={post.noticeImg ?? defaultIMG} alt="Notice" />
        <p>{post.noticeContent}</p>
      </PostContainer>
    );
  } else {
    content = <p>No details available.</p>;
  }

  return (
    <main>
      {content}
    </main>
  );
}

export default NotificationDetail;
