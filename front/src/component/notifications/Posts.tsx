import defaultIMG from './DefaultNotificationIMG.webp';

export type Post = {
  id: number;
  title: string;
  image: string | null | undefined;
  text: string;
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
            <img src={post.image || defaultIMG} alt={post.title} />
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
