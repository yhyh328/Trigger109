// Assuming getNotificationDetail now correctly returns Promise<Notice[]>
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
`;

function NotificationDetail() {
  const { noticeId } = useParams<{ noticeId: string }>();
  const [post, setPost] = useState<Post>();
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
        const response = await getNotificationDetail(parseInt(noticeId));
        if (Array.isArray(response) && response.length > 0) {
          const data = response[0]; 
          const post: Post = {
            id: data.noticeId,
            title: data.noticeTitle,
            content: data.noticeContent,
            image: data.noticeImg,
            date: '',
          };
          setPost(post);
        } else {
          setError("No data returned from the API");
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
      }
      setIsFetching(false);
    }
    fetchOnePost();
  }, [noticeId]);

  let content: ReactNode;

  return (
    <main>
      {content}
    </main>
  );
}

export default NotificationDetail;
