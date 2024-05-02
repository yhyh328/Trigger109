import styled from 'styled-components';
import { ReactNode, useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./BlogPosts";
import { get } from "./http"
// import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from "./ErrorMessage";
import './Notifications.css';

const Title = styled.h2`
  font-size: 100px;
  font-family: 'Black Han Sans', sans-serif;
  color: #00FCCE;
  margin: 0;
`;

type RawDataBlogPost = {
  id: number;
  userId: number;
  image: string | null;
  title: string;
  body: string;
}

function Notifications() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try{
        const data = (await get(
          'https://jsonplaceholder.typicode.com/posts' 
        )) as RawDataBlogPost[];
        const blogPosts: BlogPost[] = data.map(rawPost => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            image: rawPost.image ?? undefined,
            text: rawPost.body
          }
        });
        setFetchedPosts(blogPosts);
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
    content = <ErrorMessage text={error} />
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  }

  return <main>
    <br/>
    <br/>
    <Title>공지 사항</Title>
    {/* <img 
      src={fetchingImg} 
      alt="An abstract image depicting a data fetching process." 
    /> */}
    {content}
  </main>;
}

export default Notifications;
