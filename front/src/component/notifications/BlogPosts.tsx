import defaultIMG from './DefaultNotificationIMG.webp';

export type BlogPost = {
  id: number;
  title: string;
  image: string | null | undefined;
  text: string;
};

type BlogPostsProps = {
  posts: BlogPost[];
};

export default function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div id="blog-posts">
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
