export type Post = {
  id: number;
  title: string;
  image?: File | string;
  text: string;
  date: string;
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  // Helper function to convert image to URL if it's a File
  const getImageSrc = (image: string | File): string => {
    if (typeof image === 'string') {
      return image;
    } else {
      // Create a URL for the File object
      return URL.createObjectURL(image);
    }
  };

  return (
    <div id="posts">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            {post.image && (
              <img src={getImageSrc(post.image)} alt={post.title} />
            )}
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
