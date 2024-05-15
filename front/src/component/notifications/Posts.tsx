import defaultIMG from './DefaultNotificationIMG.webp';

export type Post = {
  id: number;
  title: string;
  image: string | null | undefined;
  content: string;
  date: string;
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <div id="posts">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            {post.image ? <img src={post.image} alt={post.title} /> : <img src={defaultIMG} alt={post.title} />}
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
