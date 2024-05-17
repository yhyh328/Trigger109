import AWS from 'aws-sdk';
import { useState, useEffect } from 'react';

export type Post = {
  id: number;
  title: string;
  image: string;
  content: string;
  date: string;
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  const [images, setImages] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    fetchImages();
  }, [posts]);

  const fetchImages = () => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
      region: process.env.REACT_APP_AWS_BUCKET_REGION
    });

    posts.forEach(post => {
      if (post.image) {
        const params = {
          Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
          Key: post.image,
          Expires: 60 // Time in seconds before the signed URL expires
        };

        s3.getSignedUrl('getObject', params, (err, url) => {
          if (err) {
            console.error('Error fetching signed URL:', err);
            return;
          }
          setImages(prev => new Map(prev.set(post.id, url)));
        });
      }
    });
  };

  return (
    <div id="posts">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <img src={images.get(post.id) || 'path/to/placeholder.jpg'} alt={post.title} />
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
