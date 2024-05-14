import styled from 'styled-components';
import { ReactNode, useEffect, useState } from "react";
import Posts, { Post } from "./Posts";
import { Notice, Notices, getNotificationList } from '../../api/notifications';
import ErrorMessage from "./ErrorMessage";
import defaultIMG from './DefaultNotificationIMG.webp';
import './Notifications.css';

const Title = styled.h2`
  font-size: 100px;
  font-family: 'Black Han Sans', sans-serif;
  color: #00FCCE;
  margin: 0;
`;

function Notifications() {
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = await getNotificationList() as Notices;
        const posts: Post[] = data.map((notice: Notice) => ({  
          id: notice.noticeId, 
          title: notice.noticeTitle,
          text: notice.noticeContent,
          // image: notice.noticeImg ?? defaultIMG,
          image: notice.noticeImg
        }));
        setFetchedPosts(posts); // Set fetched posts directly
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  } else if (isFetching) {
    content = <p id="loading-fallback">Loading...</p>;
  } else if (fetchedPosts.length > 0) {
    content = <Posts posts={fetchedPosts} />;
  } else {
    content = <p>공지 사항이 없습니다.</p>;
  }

  return (
    <main>
      <br />
      <Title>공지사항</Title>
      {content}
    </main>
  );
}

export default Notifications;
